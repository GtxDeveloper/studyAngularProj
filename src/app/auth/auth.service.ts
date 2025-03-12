import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginForm} from '../data/interfaces/login-form';
import {catchError, tap, throwError} from 'rxjs';
import {TokenResponse} from '../data/interfaces/token-response';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  cookieService = inject(CookieService);
  token: string | null = null;
  refreshToken: string | null = null;
  router = inject(Router);
  baseApiUrl = "https://icherniakov.ru/yt-course/auth/"
  constructor() { }
  get isAuth() {
    if(!this.token){
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refreshToken')
    }
    return !!this.token;
  }
  login(loginForm: LoginForm = {username: '', password: ''}) {
    const fd = new FormData()

    fd.append('username', loginForm.username)
    fd.append('password', loginForm.password)

    return  this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd)
      .pipe(
        tap(token => {
          this.token = token.access_token
          this.refreshToken = token.refresh_token

          this.cookieService.set('token', this.token);
          this.cookieService.set('refreshToken', this.refreshToken);
        })
      )
      .subscribe(res => {
      this.router.navigate(['']);
    })
  }

  refreshAuthToken(){
    return  this.http.post<TokenResponse>(`${this.baseApiUrl}refresh`, {
      refresh_token: this.refreshToken
    } ).pipe(
      tap(res => {
        this.token = res.access_token
        this.refreshToken = res.refresh_token

        this.cookieService.set('token', this.token);
        this.cookieService.set('refreshToken', this.refreshToken);
      }),
      catchError(error => {
        this.logout()
        return throwError(error);
      })
    )

  }
  logout(){
    this.cookieService.deleteAll()
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login'])
  }
}
