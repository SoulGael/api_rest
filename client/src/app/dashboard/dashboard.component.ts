import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  parents: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUsers().subscribe(response => {
      this.users = response.data;
    });
    
    this.api.getParents().subscribe(response => {
      this.parents = response.data;
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
