import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login.model';
import { CommonUtilService } from '../shared/common-util.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private commonUtilService: CommonUtilService
  ) { }

  // api call for login
  login(login: Login): Observable<{}> {
    return this.http.post(this.commonUtilService.apiUrl + 'login', login);
  }
}
