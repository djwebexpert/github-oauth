import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubAuthService } from 'src/app/services/github-auth.service';
import { environment } from 'src/environments/environment';
import { ColDef } from '@ag-grid-community/core';

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
    name: '',
    syncType: '',
  };
  loading: boolean = false;
  defaultColDef: any = {
    flex: 1,
    resizable: true,
  };
  gridApi: any;
  selectedGridData: any = null;
  colDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { field: 'link', cellRenderer: this.createHyperLink.bind(this) },
    { field: 'slug' },
    { field: 'included', checkboxSelection: true },
  ];
  rowData = [];
  detailRowData: any = [];
  detailColDefs: ColDef[] = [
    { field: 'userId' },
    { field: 'user' },
    { field: 'commits' },
    { field: 'pullRequests' },
    { field: 'issues' },
  ];

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

  onSelectionChanged(event: any) {
    this.selectedGridData = this.gridApi.getSelectedRows()[0];
    const acccessToken = localStorage.getItem('acccessToken') as string;

    this.githubAuthService
      .getRepoDetail(this.selectedGridData.slug, acccessToken)
      .subscribe({
        next: (response: any) => {
          if (!response) {
            return;
          }
          this.detailRowData = response;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  createHyperLink(params: any): any {
    if (!params.data) {
      return;
    }
    const spanElement = document.createElement('span');
    spanElement.innerHTML = `<a target="_blank" href="${params.value}">Visit Link</a> `;
    return spanElement;
  }

  getLoggedUserDetails(userId: string) {
    this.githubAuthService.getUserDetails(userId).subscribe({
      next: (response) => {
        this.userInfo = {
          lastSync: response.created_at,
          username: response.login,
          name: response.name,
          syncType: 'full',
        };
        this.getOrgsData();
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
        localStorage.setItem('acccessToken', response.user.access_token);
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
          localStorage.removeItem('acccessToken');
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  onGridReady(params: any) {
    if (!this.isAuthConnect) {
      return;
    }
    this.gridApi = params.api;
  }

  async getOrgsData() {
    const acccessToken = localStorage.getItem('acccessToken') as string;

    this.githubAuthService
      .getOrgsData(this.userInfo.username, acccessToken)
      .subscribe({
        next: (response) => {
          if (!response) {
            return;
          }
          this.rowData = response.map((repo: any) => {
            return {
              id: repo.id,
              name: repo.name,
              link: repo.html_url,
              slug: repo.full_name,
            };
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
