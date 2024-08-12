import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';

  constructor(private route:Router){

  }

  onSubmit(): void {
    // Lógica de autenticação aqui
    this.route.navigate(['home']);
  }

}
