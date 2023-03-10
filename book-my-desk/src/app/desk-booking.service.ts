import { Injectable } from '@angular/core';
import { DateHandlerService } from './date-handler.service';
import { DeskViewModel } from './types';

@Injectable({
  providedIn: 'root'
})

export class DeskBookingService {

  private bookingList: DeskViewModel[] = [];

  constructor(private dateHandlerService: DateHandlerService) {}

  pushBookedDesk(selectedButtons: DeskViewModel[]) {
    selectedButtons.forEach(element => {
      this.bookingList.push(element);
    });
  }

  deleteCanceledDesk(canceledDesks: DeskViewModel[], deleteAll: boolean, deskId?: number, userId?: number) {
      this.bookingList.forEach(bookedDesk => {
        if(deleteAll) {
          if(bookedDesk.deskId === deskId && bookedDesk.userId === userId) {
            let index = this.bookingList.indexOf(bookedDesk);
            this.bookingList.splice(index);
          }
        }
        else {
          canceledDesks.forEach(canceledDesk => {
            if(canceledDesk.bookedDay.getDate() === bookedDesk.bookedDay.getDate() && canceledDesk.deskId === bookedDesk.deskId 
            && canceledDesk.userId === bookedDesk.userId) {
              let index = this.bookingList.indexOf(bookedDesk);
              this.bookingList.splice(index, 1);
            }
          });
        }
      });
  }

  pullBookingList(deskId: number) {
    return this.bookingList.filter(data => data.deskId === deskId);
  }

  isCurrentDayBooked(deskId: number) {
    let result: boolean = false;
    this.bookingList.forEach(element => {
      if(element.deskId === deskId && element.bookedDay.getDate() === new Date().getDate()) {
        result = true;
      }
    });
    return result;
  }
}