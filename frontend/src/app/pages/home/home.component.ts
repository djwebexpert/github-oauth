import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubAuthService } from 'src/app/services/github-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAuthConnect: boolean = false;
  userInfo = {
    lastSync: '',
    username: '',
    syncType: '',
  };
  loading: boolean = false;
  constructor(
    private githubAuthService: GithubAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.router.navigateByUrl('/');
      this.isAuthConnect = true;
      this.getLoggedUserDetails(userId);
    }

    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params?.code && !userId) {
        this.loginToGithub(params?.code);
      }
    });
  }

  getLoggedUserDetails(userId: string) {
    this.githubAuthService.getUserDetails(userId).subscribe({
      next: (response) => {
        this.userInfo = {
          lastSync: response.createdAt,
          username: response.name,
          syncType: 'full',
        };
      },
      error: () => {},
    });
  }

  redirectToGithub() {
    this.loading = true;
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${environment.githubClientId}&redirect_uri=http://localhost:4200&scope=user,repo,admin:org&allow_signup=true`,
      '_self'
    );
  }

  loginToGithub(code: string): void {
    this.githubAuthService.githubLogin(code).subscribe({
      next: (response) => {
        if (!response) {
          return;
        }
        localStorage.setItem('userId', response.user._id);
        this.loading = false;
        this.isAuthConnect = true;
        this.getLoggedUserDetails(response.user._id);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  logoutFromGithub(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.githubAuthService.githubLogout(userId).subscribe({
        next: (response) => {
          if (!response) {
            return;
          }
          this.isAuthConnect = false;
          localStorage.removeItem('userId');
          this.router.navigateByUrl('/');
        },
        error: () => {},
      });
    }
  }
}
