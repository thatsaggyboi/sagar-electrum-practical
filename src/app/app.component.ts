import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtilService } from './shared/common-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username: string;

  constructor(
    public commonUtilService: CommonUtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  // checking authentication
  checkAuthentication(): void {
    if(localStorage.getItem('token')) {
      this.commonUtilService.isAuthenticated = true;
    } else {
      this.commonUtilService.isAuthenticated = false;
      this.router.navigate(['/login']);
    }
  }

  // to logout
  logout(): void {
    localStorage.clear();
    this.commonUtilService.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

}
