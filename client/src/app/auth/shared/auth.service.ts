import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequest } from '../signup/SignupRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../login/LoginResponse';
import { map, tap } from 'rxjs/operators';
import { LoginRequest } from '../login/LoginRequest';
import { LocalStorageService } from 'ngx-webstorage';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/auth/signup',
      signupRequest,
      { responseType: 'text' }
    );
  }
  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/login',
        loginRequest,
        { responseType: 'json' }
      )
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          return true;
        })
      );
  }
  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName(),
    };
    return this.http
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/refresh/token',
        refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }
}
