import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {

  apiUrl = 'https://reqres.in/api/';
  username: string;
  isAuthenticated = false;
  isShowEntity: any = {};
  isLoadingEntity: any = {};

  constructor() { }

  // toggle anything
  toggle(type: string): void {
    this.isShowEntity[type] = !this.isShowEntity[type];
  }

}
