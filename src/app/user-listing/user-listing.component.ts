import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from './users.service';
import { CommonUtilService } from '../shared/common-util.service';
import { Login } from '../login/login.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { UserTableHeaders } from '../shared/common.constants';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {

  users: any;
  userTableHeaders = UserTableHeaders;
  isAddingUser = false;
  isDeletingUser: any = {};
  addUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    public commonUtilService: CommonUtilService
  ) { }

  ngOnInit(): void {
    this.initAddUserForm();
    this.setUserName()
    this.getUserslist();
  }

  // set username
  setUserName(): void {
    this.commonUtilService.username = localStorage.getItem('username');
  }

  // for getting login form control
  get auf(): { [key: string]: AbstractControl } {
    return this.addUserForm.controls;
  }

  // For initialize form
  initAddUserForm(): void {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
    });
  }

  // to add the user
  addUser(): void {
    this.isAddingUser = true;
    this.usersService.createUser(this.addUserForm.value).subscribe(
      () => {
        this.isAddingUser = false;
        this.addUserForm.reset();
        this.commonUtilService.isShowEntity['add-user'] = false;
        alert("User Data Added successfully!!");
      }
    );
  }

  // to delete user
  deleteUser(id: number, index: number): void {
    this.deleteEnity(id, index);
  }

  // swipe to delete user
  swipeToDelete(event: CdkDragDrop<any, any>): any {
    this.deleteEnity(event.item.data.id, event.currentIndex);
  }

  // to delete entity
  deleteEnity(id: number, index: number): void {
    this.isDeletingUser[index] = true;
    this.usersService.deleteUser(id).subscribe(
      () => {
        this.isDeletingUser[index] = false;
        this.users.splice(index, 1);
        alert("User Data deleted successfully!!");
      }
    );
  }

  // to get list of users
  getUserslist(): void {
    this.commonUtilService.isLoadingEntity['users'] = true;
    this.usersService.getUsersList().subscribe(
      (userResponse: any) => {
        this.users = userResponse.data;
        this.commonUtilService.isLoadingEntity['users'] = false;
      }
    );
  }


}
