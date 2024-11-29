import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simple',
  template: `
    <div>{{ routeInfo }}</div>
  `,
})
export class SimpleComponent {
  routeInfo: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.routeInfo = url.join('/');
    });
  }
}