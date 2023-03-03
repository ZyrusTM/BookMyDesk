import { Injectable } from '@angular/core';
import { DateHandlerService } from './date-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BookingDataHandlerService {

  private bookingList: string[] = [];

  constructor(private dateHandlerService: DateHandlerService) {}

  pushData(selectedButtons: string[]) {
    selectedButtons.forEach(element => {
      this.bookingList.push(element);
    });
    console.log(this.bookingList);
  }

  deleteData(unselectedButtons: string[], deleteAll: boolean) {
    if(!deleteAll) {
      this.bookingList = this.bookingList.filter( element => !unselectedButtons.includes(element));
      console.log(this.bookingList);
    }
    else {
      this.bookingList = [];
      console.log(this.bookingList);
    }
  }

  isCurrentDayBooked() {
    for(const element of this.bookingList) {
      if(element == this.dateHandlerService.getCurrentDate()) {
        return true;
      }
    }
    return false;
  }

  pullData() {

  }
}
