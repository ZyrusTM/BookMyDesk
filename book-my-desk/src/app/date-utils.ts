import { addDays, startOfWeek, subDays } from 'date-fns';

export function getDatesOfCurrentWeek() {
    let days: Date[] = [];
    let firstDayOfCurrentWeek: Date = startOfWeek(new Date(), {weekStartsOn: 1});

    for(let i = 0;i<7;i++) {
      let nextDay: Date = addDays(firstDayOfCurrentWeek, i);
      days.push(nextDay);
    }
    return days;
}

export function changeWeek(toPrevious: boolean, datesOfCurrentWeek: Date[]) {
    let days: Date[] = [];
    let firstDayOfWeek: Date = new Date();

    if(toPrevious) {
      firstDayOfWeek = subDays(datesOfCurrentWeek[0], 7);
    }
    else {
      firstDayOfWeek = addDays(datesOfCurrentWeek[0], 7);
    }

    for(let i = 0;i<7;i++) {
      let nextDay: Date = addDays(firstDayOfWeek, i);
      days.push(nextDay);
    }
    return days;
}