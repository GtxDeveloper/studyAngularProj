import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginForm} from '../data/interfaces/login-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseApiUrl = "https://icherniakov.ru/yt-course/auth/"
  constructor() { }
  login(loginForm: LoginForm = {username: '', password: ''}) {
    return this.http.post(`${this.baseApiUrl}token`, loginForm)
  }
}
