import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseApiUrl = "https://icherniakov.ru/yt-course/auth/"
  constructor() { }
  login(payload: {username: string, password: string}) {
    return this.http.post(`${this.baseApiUrl}token`, payload)
  }
}
