import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../common/api';
import { AuthManager } from '../common/auth.manager';
import { Message } from '../common/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
      await AuthManager.getInstance().login(this.login, this.password);
      this.message.info("Zalogowano pomyślnie!");
      setTimeout(() => {
        this.router.navigate(['/welcome-page']);
      }, 1000);
    } catch (e: any) {
      this.message.error("Wystąpił błąd: " + e.message || e);
    }
  }
}
