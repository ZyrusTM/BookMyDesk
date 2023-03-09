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

  deleteCanceledDesk(canceledDesks: DeskViewModel[], deleteAll: boolean) {
    if(!deleteAll) {
      this.bookingList.forEach(bookedDesk => {
        canceledDesks.forEach(canceledDesk => {
          if(canceledDesk === bookedDesk) {
            this.bookingList = this.bookingList.filter( bookedDesk => !canceledDesks.includes(bookedDesk));
          }
        })
      });
      console.log(this.bookingList);
    }
    else {
      this.bookingList = [];
      console.log(this.bookingList);
    }
  }

  pullBookingList(deskId: number) {
    return this.bookingList.filter(data => data.deskId = deskId);
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
