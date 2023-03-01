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
}
