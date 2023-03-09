import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager } from '../common/auth.manager';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  
    constructor(private router: Router) { 
    }

    ngOnInit() {
      AuthManager.getInstance().logout();
      setTimeout(() => {
        this.router.navigate(['/welcome-page']);
      }, 1500);
    }
}
