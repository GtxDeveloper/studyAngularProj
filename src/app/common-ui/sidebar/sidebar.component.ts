import {Component, inject} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {RouterLink} from '@angular/router';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService);

  me = this.profileService.me;
  subscribers$ = this.profileService.getSubscribersShortList()

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''

    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: '/chats'

    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',

    },
  ]
}
