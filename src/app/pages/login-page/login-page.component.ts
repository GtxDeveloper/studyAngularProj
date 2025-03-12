import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {LoginForm} from '../../data/interfaces/login-form';
import {from, map} from 'rxjs';


@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService);

  isPasswordVisible = signal<boolean>(false);
  loginForm : LoginForm = {
    username: '',
    password: ''
  }

  onSubmit(event: Event) {

      this.authService.login(this.loginForm)
  }
}
