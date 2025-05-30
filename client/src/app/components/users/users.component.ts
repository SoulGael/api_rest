import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.usersService.getData(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        if(response.success){
          this.users = response.payload.data;
          this.totalPages = response.payload.pagination.totalPages;
        }
      },
      error: () => alert('❌ Usuario o contraseña inválidos')
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  editData(user: any): void {
    console.log('Editar', user);
  }

  deleteData(user: any): void {
    console.log('Eliminar', user);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

}
