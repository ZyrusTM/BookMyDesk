import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHandlerService {

  private currentDate: Date = new Date();
  private firstDayOfCurrentWeek: number = this.currentDate.getDate() - this.currentDate.getDay() + 1;;
  private datesOfCurrentWeek: Date[] = [];

  private datesOfPreviousWeek: Date[] = [];
  private datesOfNextWeek: Date[] = [];

  getDatesOfCurrentWeek() {
    let days: Date[] = [];
    let daysFormatted: string[] = [];

    for(let i = 0;i<5;i++) {
      let monday = new Date(this.currentDate.setDate(this.firstDayOfCurrentWeek));
      let nextDay = this.getNextDay(monday, i);
      days.push(nextDay);
      daysFormatted[i] = this.format(days[i].toUTCString());
      this.currentDate = new Date();
    }
    this.datesOfCurrentWeek = days;
    this.datesOfPreviousWeek = days;
    this.datesOfNextWeek = days;
    return daysFormatted;
  }

  changeWeek(toPreviousWeek: boolean) {
    let days: Date[] = [];
    let daysFormatted: string[] = [];

    if(toPreviousWeek) {
      for(let i = 0;i<5;i++) {
        days[i] = new Date(this.datesOfPreviousWeek[i].getFullYear(), this.datesOfPreviousWeek[i].getMonth(), this.datesOfPreviousWeek[i].getDate()-7);
        daysFormatted[i] = this.format(new Date(this.datesOfPreviousWeek[i].getFullYear(), this.datesOfPreviousWeek[i].getMonth(), 
        this.datesOfPreviousWeek[i].getDate()-6).toUTCString());
      }
      this.datesOfPreviousWeek = days;
      this.datesOfNextWeek = days;      
    }    
    else {
      for(let i = 0;i<5;i++) {
        days[i] = new Date(this.datesOfNextWeek[i].getFullYear(), this.datesOfNextWeek[i].getMonth(), this.datesOfNextWeek[i].getDate()+7);
        daysFormatted[i] = this.format(new Date(this.datesOfNextWeek[i].getFullYear(), this.datesOfNextWeek[i].getMonth(), 
        this.datesOfNextWeek[i].getDate()+8).toUTCString());
      }
      this.datesOfNextWeek = days; 
      this.datesOfPreviousWeek = days;
    }
    return daysFormatted;
  }

  getCurrentDate() {
    return this.format(new Date().toUTCString());
  }

  private getNextDay(startDate: Date, dayAfter: number) {
    let nextDate = startDate;
    nextDate.setDate(nextDate.getDate() + dayAfter);
    return nextDate;
  }
// date-fns
// luxon

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