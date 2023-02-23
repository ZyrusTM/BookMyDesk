import { Injectable } from '@angular/core';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class DateHandlerService {

  private currentDate: Date = new Date();
  private first: number = this.currentDate.getDate() - this.currentDate.getDay() + 1;
  private last: number = this.first + 4;

  private nextWeekFirst: Date = new Date(this.currentDate.setDate(this.first + 1)); 
  private nextWeekLast: Date = new Date(this.currentDate.setDate(this.last + 1)); 
  private previousWeekFirst: Date = new Date(this.currentDate.setDate(this.first + 1)); 
  private previousWeekLast: Date = new Date(this.currentDate.setDate(this.last + 1)); 

  getFirstDateOfWeek() {
    let firstDay = new Date(this.currentDate.setDate(this.first)).toUTCString();
    return this.format(firstDay);
  }

  getLastDateOfWeek() {
    let lastDay = new Date(this.currentDate.setDate(this.last)).toUTCString();
    return this.format(lastDay);
  }

  changeWeekStart(toPreviousWeek: boolean) {
    if(toPreviousWeek) {
      let previousWeek = new Date(this.previousWeekFirst.getFullYear(), this.previousWeekFirst.getMonth(), this.previousWeekFirst.getDate()-7);
      this.previousWeekFirst = previousWeek;
      this.nextWeekFirst = previousWeek;
      return this.format(previousWeek.toUTCString());
    }
    else {
      let nextWeek = new Date(this.nextWeekFirst.getFullYear(), this.nextWeekFirst.getMonth(), this.nextWeekFirst.getDate()+7);
      this.nextWeekFirst = nextWeek;
      this.previousWeekFirst = nextWeek;
      return this.format(nextWeek.toUTCString());
    }
  }

  changeWeekEnd(toPreviousWeek: boolean) {
    if(toPreviousWeek) {
      let previousWeek = new Date(this.previousWeekLast.getFullYear(), this.previousWeekLast.getMonth(), this.previousWeekLast.getDate()-7);
      this.previousWeekLast = previousWeek;
      this.nextWeekLast = previousWeek;
      return this.format(previousWeek.toUTCString());
    }
    else {
      let nextWeek = new Date(this.nextWeekLast.getFullYear(), this.nextWeekLast.getMonth(), this.nextWeekLast.getDate()+7);
      this.nextWeekLast = nextWeek;
      this.previousWeekLast = nextWeek;
      return this.format(nextWeek.toUTCString());
    }
  }

  private format(date: string) {
    let dateSplitted = date.split(" ", 4);
    let day = dateSplitted[1];
    let month = this.convertNameToNumber(dateSplitted[2]);
    let year = dateSplitted[3];
    return `${day}.${month}.${year}`;
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