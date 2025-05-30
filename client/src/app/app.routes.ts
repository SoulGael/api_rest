import { provideRouter, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./components/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'parents',
        loadComponent: () =>
          import('./components/parents/parents.component').then(m => m.ParentsComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];