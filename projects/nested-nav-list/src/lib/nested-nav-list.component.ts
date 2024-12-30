import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavData } from './nav-data';

@Component({
  selector: 'ngx-nested-nav-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatListModule],
  templateUrl: './nested-nav-list.component.html',
  styleUrl: './nested-nav-list.component.scss',
  host: {
    class: 'nested-nav-list',
    '[class.override-svg-icon-color]': '!keepSvgIconColor',
  },
  encapsulation: ViewEncapsulation.None,
})
export class NestedNavListComponent implements OnChanges {
  @Input() navData: NavData[] = [];
  @Input() nestedIndent: number = 16;
  @Input() keepSvgIconColor: boolean = false;
  @Input() highlightActiveItem: boolean = false;
  @Input() isActiveItem: (item: NavData) => boolean = this.defaultIsActiveItem;

  transformedNavData: NavData[] = [];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // navData is updated and not null, call registerSvgIcons
    if (changes['navData']) {
      this.registerSvgIcons(this.navData);
      this.transformedNavData = this.navData || [];
    }
  }

  registerSvgIcons(navData: NavData[]): void {
    navData?.forEach((item) => {
      if (item.children?.length) {
        this.registerSvgIcons(item.children);
      }

      // if iconType is svg, register the svg icon to mat icon registry
      // if iconName not exists, use displayName as iconName
      if (item.iconType === 'svg' && item.svgUrl) {
        item.iconName ||= item.svgUrl;
        this.matIconRegistry.addSvgIcon(
          item.iconName,
          this.sanitizer.bypassSecurityTrustResourceUrl(item.svgUrl),
        );
      }
    });
  }

  onClickNavItem(item: NavData, event: UIEvent): void {
    // stop propagation
    event?.stopPropagation();

    // if item has route, navigate to the route
    // if keepQueryParams is true, keep the query params
    if (item.route) {
      this.router.navigate([item.route], {
        queryParamsHandling: item.keepQueryParams ? 'preserve' : '',
      });
      return;
    }

    // if item has url, navigate to the url in new tab
    if (item.url) {
      window.open(item.url, '_blank');
      return;
    }

    // if item has children, toggle the expanded flag
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  defaultIsActiveItem(item: NavData): boolean {
    const currentUrl = this.router.url.split('?')[0]; // Exclude query parameters
    return item.route !== undefined && currentUrl.endsWith(item.route || '');
  }
}
