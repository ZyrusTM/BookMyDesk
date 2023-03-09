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

    for(let i = 0;i<5;i++) {
      let monday = new Date(this.currentDate.setDate(this.firstDayOfCurrentWeek));
      let nextDay = this.getNextDay(monday, i);
      days.push(nextDay);
      this.currentDate = new Date();
    }
    this.datesOfCurrentWeek = days;
    this.datesOfPreviousWeek = days;
    this.datesOfNextWeek = days;
    return days;
  }

  changeWeek(toPreviousWeek: boolean) {
    let days: Date[] = [];

    if(toPreviousWeek) {
      for(let i = 0;i<5;i++) {
        days[i] = new Date(this.datesOfPreviousWeek[i].getFullYear(), this.datesOfPreviousWeek[i].getMonth(), this.datesOfPreviousWeek[i].getDate()-7);
      }
      this.datesOfPreviousWeek = days;
      this.datesOfNextWeek = days;      
    }    
    else {
      for(let i = 0;i<5;i++) {
        days[i] = new Date(this.datesOfNextWeek[i].getFullYear(), this.datesOfNextWeek[i].getMonth(), this.datesOfNextWeek[i].getDate()+7);
      }
      this.datesOfNextWeek = days; 
      this.datesOfPreviousWeek = days;
    }
    return days;
  }

  getCurrentDate() {
    return new Date();
  }

  private getNextDay(startDate: Date, dayAfter: number) {
    let nextDate = startDate;
    nextDate.setDate(nextDate.getDate() + dayAfter);
    return nextDate;
  }
// date-fns
// luxon
}