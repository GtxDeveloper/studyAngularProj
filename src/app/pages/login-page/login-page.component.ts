import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {LoginForm} from '../../data/interfaces/login-form';


@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  form = new FormGroup<LoginForm>({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  })

  onSubmit(event: Event) {
    console.log(this.form.value);


    if(this.form.valid){
      this.authService.login(this.form.value)
    }

  }
}
