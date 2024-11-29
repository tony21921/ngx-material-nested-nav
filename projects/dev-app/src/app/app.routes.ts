import { Routes } from '@angular/router';
import { SimpleComponent } from './simple/simple.component';

export const routes: Routes = [
  { path: 'home', component: SimpleComponent },
  { path: 'profile', component: SimpleComponent },
  { path: 'notifications', component: SimpleComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];