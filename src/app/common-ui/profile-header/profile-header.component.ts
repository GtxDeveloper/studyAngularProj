import {Component, input} from '@angular/core';
import {Profile} from '../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-profile-header',
  imports: [
    ImgUrlPipe,
    SvgIconComponent
  ],
  standalone: true,
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<Profile>()
}
