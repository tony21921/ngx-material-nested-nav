import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NestedNavListComponent } from '../../../nested-nav-list/src/public-api';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { NavData } from '../../../nested-nav-list/src/lib/nav-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NestedNavListComponent,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dev-app';

  keepSvgIconColor: boolean = false;

  navData: NavData[] = [
    {
      displayName: 'Home',
      iconType: 'font',
      iconName: 'fa-house',
      fontSet: 'fa',
      route: 'home',
    },
    {
      displayName: 'Settings',
      iconName: 'settings',
      children: [
        {
          displayName: 'Profile',
          iconName: 'person',
          route: 'profile',
        },
        {
          displayName: 'Notifications',
          iconName: 'notifications',
          keepQueryParams: true,
          route: 'notifications',
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      displayName: 'Repo',
      iconType: 'svg',
      svgUrl: 'github.svg',
      iconName: 'github',
      url: 'about:blank',
    },
  ];

  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
