import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingDataHandlerService {

  private bookingList: string[] = [];

  constructor() { }

  fetchData() {}

  pushData(date: string) {
    this.bookingList.push(date);
    console.log(this.bookingList);
  }

  changeData(date: string) {
    for(let i = 0;i<this.bookingList.length;i++) {
      if(this.bookingList[i] == date) {
        this.bookingList.splice(i);
      }
    }
    console.log(this.bookingList);
  }
}
