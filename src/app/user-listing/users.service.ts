import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonUtilService } from '../shared/common-util.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userName: string;

  constructor(
    private http: HttpClient,
    private commonUtilService: CommonUtilService
  ) { }

  // api call for get user list
  getUsersList(): Observable<{}> {
    return this.http.get(this.commonUtilService.apiUrl + 'users?page==2');
  }

  // api call for create user
  createUser(user: User): Observable<{}> {
    return this.http.post(this.commonUtilService.apiUrl + 'users', user);
  }

  // api call for delete user
  deleteUser(id: number): Observable<{}> {
    return this.http.delete(this.commonUtilService.apiUrl + 'users/id');
  }

}
