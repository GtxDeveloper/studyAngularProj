import {Component, inject, signal} from '@angular/core';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {DndDirective} from '../../../common-ui/directives/dnd.directive';
import {FormsModule} from '@angular/forms';
import {ImgUrlPipe} from '../../../helpers/pipes/img-url.pipe';
import {ProfileService} from '../../../data/services/profile.service';

@Component({
  selector: 'app-avatar-upload',
  imports: [
    SvgIconComponent,
    DndDirective,
    FormsModule,
    ImgUrlPipe
  ],
  standalone: true,
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  ps = inject(ProfileService);
  preview = signal<string>("")
  isFileDropped : boolean = false;
  isHaveAvatar : boolean = false;
  constructor() {
    this.ps.getMe().subscribe(value => {
      if(value.avatarUrl){
        this.preview.set(value.avatarUrl);
        this.isHaveAvatar = true;
      }else{
        this.preview.set('/assets/imgs/favicon.ico');
      }
    })
  }
  avatar: File | null = null

  fileBrowserHandler(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0] ;
    this.proccesFile(file);
  }

  onFileDropped(file : File){
    this.proccesFile(file);
  }

  proccesFile(file : File | null | undefined){
    if(!file || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '') ;
    }

    reader.readAsDataURL(file);
    this.avatar = file
    this.isFileDropped = true;
  }
}
