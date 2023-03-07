import { Injectable } from '@angular/core';
import { DateHandlerService } from './date-handler.service';


interface DeskData {
  deskId: number;
  bookedDays: string[];
};

@Injectable({
  providedIn: 'root'
})

export class BookingDataHandlerService {

  private bookingList: DeskData[] = [];

  constructor(private dateHandlerService: DateHandlerService) {}

  pushData(selectedButtons: string[], deskId: number) {
    let data: DeskData = {
      deskId: deskId,
      bookedDays: []
    };

    selectedButtons.forEach(element => {
      data.bookedDays.push(element);
    });
    this.bookingList.push(data);
    console.log(this.bookingList);
  }

  deleteData(unselectedButtons: string[], deleteAll: boolean, deskId: number) {
    if(!deleteAll) {
      this.bookingList.forEach(deskData => {
        if(deskData.deskId === deskId) {
          deskData.bookedDays = deskData.bookedDays.filter( element => !unselectedButtons.includes(element));
        }
      });
      console.log(this.bookingList);
    }
    else {
      this.bookingList = [];
      console.log(this.bookingList);
    }
  }

  isCurrentDayBooked(deskId: number) {
    // let isBooked: boolean = false;
    // let list = this.bookingList;
    // this.bookingList.forEach(deskData => {
    //   if(deskData.deskId = deskId) {
    //     for(const element of deskData.bookedDays) {
    //       if(element == this.dateHandlerService.getCurrentDate()) {
    //         isBooked = true;
    //       }
    //     }
    //   }
    // });
    return false;
    console.log(this.bookingList);
  }

  pullData() {

  }
}
