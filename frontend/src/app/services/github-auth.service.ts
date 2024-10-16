import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubAuthService {
  constructor(private http: HttpClient) {}

  githubLogin(payload: string): Observable<any> {
    return this.http.get(`${environment.baseURL}/auth?code=${payload}`);
  }

  githubLogout(payload: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}/user/${payload}`);
  }

  getUserDetails(payload: string): Observable<any> {
    return this.http.get(`${environment.baseURL}/user/${payload}`);
  }
}
