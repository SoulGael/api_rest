import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsService } from '../../services/parents.service';

@Component({
  selector: 'app-parents',
  imports: [CommonModule],
  templateUrl: './parents.component.html',
  styleUrl: './parents.component.css'
})
export class ParentsComponent {

  parents: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private parentsService: ParentsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.parentsService.getData(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        if(response.success){
          this.parents = response.payload.data;
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

  editData(data: any): void {
    console.log('Editar', data);
  }

  deleteData(data: any): void {
    console.log('Eliminar', data);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

}
