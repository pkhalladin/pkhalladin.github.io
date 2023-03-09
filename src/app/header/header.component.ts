import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager } from '../common/auth.manager';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  auth: AuthManager = AuthManager.getInstance();

  constructor(private router: Router) { 
  }
  
  onHomeClick() {
    this.router.navigateByUrl('/');
  }
}
