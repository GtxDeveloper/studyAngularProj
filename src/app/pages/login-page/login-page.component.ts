import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {LoginForm} from '../../data/interfaces/login-form';


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
  loginForm : LoginForm = {
    username: '',
    password: ''
  }

  onSubmit(event: Event) {

      this.authService.login(this.loginForm)
      console.log(this.loginForm);

  }
}
