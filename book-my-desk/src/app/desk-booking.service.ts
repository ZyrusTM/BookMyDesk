import { Injectable } from '@angular/core';
import { DeskViewModel } from './types';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class DeskBookingService {

  private bookingList: DeskViewModel[] = [];

  constructor(private userService: UserService) {}

  saveDesk(selectedButtons: DeskViewModel[]) {
    selectedButtons.forEach(element => {
      element.bookedDays.forEach(bookedDay => {
        bookedDay.userId = this.userService.getUserID();
      });
      this.bookingList.push(element);
    });
  }

  cancelDesk(canceledDesks: DeskViewModel[], deleteAll: boolean, deskId?: number) {
      this.bookingList.forEach(bookedDesk => {
        bookedDesk.bookedDays.forEach(bookedDay => {
          if(deleteAll) {
            if(bookedDesk.deskId === deskId && bookedDay.userId === this.userService.getUserID()) {
              let index = this.bookingList.indexOf(bookedDesk);
              this.bookingList.splice(index);
            }
          }
          else {
            canceledDesks.forEach(canceledDesk => {
              canceledDesk.bookedDays.forEach(canceledDay => {
                if(canceledDay.bookedDay.getDate() === bookedDay.bookedDay.getDate() && canceledDesk.deskId === bookedDesk.deskId 
                && canceledDay.userId === bookedDay.userId) {
                  let index = this.bookingList.indexOf(bookedDesk);
                  this.bookingList.splice(index, 1);
                }
              });
            });
          }
        });
      });
  }

  pullBookingList(deskId: number) {
    return this.bookingList.filter(data => data.deskId === deskId);
  }

  isCurrentDayBooked(deskId: number) {
    let result: boolean = false;
    this.bookingList.forEach(bookedDesk => {
      bookedDesk.bookedDays.forEach(bookedDay => {
        if(bookedDesk.deskId === deskId && bookedDay.bookedDay.getDate() === new Date().getDate()) {
          result = true;
        }
      });
    });
    return result;
  }
}