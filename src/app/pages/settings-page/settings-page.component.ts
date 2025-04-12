import {Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfileService} from '../../data/services/profile.service';
import {AvatarUploadComponent} from './avatar-upload/avatar-upload.component';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-settings-page',
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent
  ],
  standalone: true,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUploader: AvatarUploadComponent | undefined;

  form = this.fb.group({
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    username : [{value: '', disabled : true}, Validators.required],
    description : [''],
    stack:['']
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack)
      })
    });
  }

  onSave(){
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    console.log('invalid')
    if(this.form.invalid) return;

    if(this.avatarUploader?.avatar){
      this.profileService.uploadAvatar(this.avatarUploader.avatar)
    }
    console.log('valid')

    //@ts-ignore
    this.profileService.patchProfile({
      ...this.form.value,
      //@ts-ignore
       stack: this.splitStack(this.form.value.stack)
    });


    console.log('sent')
  }

  splitStack(stack : string | null | string[] | undefined): '' | string[] {
    if(!stack)return []
    if(Array.isArray(stack))return stack;

    return stack.split(',');
  }

  mergeStack(stack : string[] | null | string | undefined){
    if(!stack) return '';
    if(Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
