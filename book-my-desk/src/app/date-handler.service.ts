import { Injectable } from '@angular/core';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class DateHandlerService {

  currentDate = new Date();
  first = this.currentDate.getDate() - this.currentDate.getDay() + 1;
  last = this.first + 4;

  getFirstDateOfWeek() {
    let firstDay = new Date(this.currentDate.setDate(this.first)).toUTCString();
    let firstDaySplitted = firstDay.split(" ", 4);
    let day = firstDaySplitted[1];
    let month = this.convertNameToNumber(firstDaySplitted[2]);
    let year = firstDaySplitted[3];
    return `${day}.${month}.${year}`;
  }

  getLastDateOfWeek() {
    let lastDay = new Date(this.currentDate.setDate(this.last)).toUTCString();
    let lastDaySplitted = lastDay.split(" ", 4);
    let day = lastDaySplitted[1];
    let month = this.convertNameToNumber(lastDaySplitted[2]);
    let year = lastDaySplitted[3];
    return `${day}.${month}.${year}`;
  }

  controlWeek(previousWeek: boolean) {
    if(previousWeek) {
      this.first = this.currentDate.getDate() - this.currentDate.getDay() +1 - 7;
      this.last = this.first + 4;
    }
    else {
      this.first = this.currentDate.getDate() - this.currentDate.getDay() +1 + 7;
      this.last = this.first + 4;
    }
  }

  private convertNameToNumber(month: string) {
    const monthMap = new Map();
    monthMap.set("Jan", 1);
    monthMap.set("Feb", 2);
    monthMap.set("Mar", 3);
    monthMap.set("Apr", 4);
    monthMap.set("May", 5);
    monthMap.set("Jun", 6);
    monthMap.set("Jul", 7);
    monthMap.set("Aug", 8);
    monthMap.set("Sep", 9);
    monthMap.set("Oct", 10);
    monthMap.set("Nov", 11);
    monthMap.set("Dec", 12);

    let monthAsNumber: number = 0;

    for(let [key, value] of monthMap) {
      if(key == month) {
        monthAsNumber = value;
      }
    }
    return monthAsNumber;
  }
}
