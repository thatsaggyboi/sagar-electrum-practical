import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { CommonUtilService } from '../shared/common-util.service';
import { LoginResponse } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  islogging = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public commonUtilService: CommonUtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  // for getting login form control
  get lf(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // For initialize form
  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(49)]],
      password: ['', [Validators.required, Validators.maxLength(249)]],
    });
  }

  // to reset form
  resetForm(): void {
    this.islogging = false;
    this.loginForm.reset();
  }

  // set the user data
  setUserDate(data: LoginResponse): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', this.loginForm.value.email.split("@")[0]);
  }

  // to login
  login(): void {
    this.islogging = true;
    this.loginService.login(this.loginForm.value).subscribe(
      (loginRes: LoginResponse) => {
        this.commonUtilService.isAuthenticated = true;
        this.setUserDate(loginRes);
        this.resetForm();
        this.router.navigate(['/user-listing']);
      },
      (error: any) => {
        alert(error.error.error);
        this.resetForm();
      }
    );
  }

}
