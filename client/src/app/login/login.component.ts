import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        if(!response.success){
          this.message = response.message;
          return;
        }
        this.router.navigate(['/dashboard'])
      },
      error: () => this.message = '❌ Usuario o contraseña inválidos'
    });
  }
}