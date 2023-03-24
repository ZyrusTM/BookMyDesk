import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId: number = 1
  admins: number[] = [1];

  constructor() { }

  getUserId() {
    return 1;
  }

  isUserAdmin() {
    let userIsAdmin: boolean = false;
    this.admins.forEach(admin => {
      if(admin === this.userId) userIsAdmin = true;
    })
    return userIsAdmin;
  }
}
