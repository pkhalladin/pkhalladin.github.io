import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../common/api';
import { Message } from '../common/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  login: string = '';
  password: string = '';
  message: Message = new Message();

  constructor (private router: Router) {
  }

  async onSubmit() {
    if (!this.login || !this.password) {
      return;
    }
    try {
      await Api.getInstance().post('auth/signup', {
        name: this.name,
        login: this.login,
        password: this.password
      });
      this.message.info("Zarejestrowano pomyślnie! Teraz możesz się zalogować.");
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } catch (e: any) {
      this.message.error("Wystąpił błąd: " + e.message || e);
    }
  }
}
