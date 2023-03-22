import { Injectable, OnInit } from '@angular/core';
import { delay, firstValueFrom, map, Observable, of, Subject, tap } from 'rxjs';
import { mockRoomData} from './mock-data';
import { DeskViewModel, RoomViewModel } from './types';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class DeskBookingService {

  readonly rooms = new Subject<ReadonlyArray<RoomViewModel>>();
  private bookingList: DeskViewModel[] = [];

  constructor(private userService: UserService) {}

  saveDesk(selectedButtons: DeskViewModel[]) {
    selectedButtons.forEach(element => {
      element.bookings.filter(booking => {
        booking.bookedBy = this.userService.getUserId();
      });
      this.bookingList.push(element);
    });
  }

  cancelDesk(canceledDesks: DeskViewModel[], deleteAll: boolean, deskId?: number) {
    this.bookingList.forEach(bookedDesk => {
      bookedDesk.bookings.filter(booking => {
        if (deleteAll) {
          if (bookedDesk.id === deskId && booking.bookedBy === this.userService.getUserId()) {
            let index = this.bookingList.indexOf(bookedDesk);
            this.bookingList.splice(index);
          }
        }
        else {
          canceledDesks.forEach(canceledDesk => {
            canceledDesk.bookings.filter(canceledDay => {
              if (canceledDay.bookedAt.getDate() === booking.bookedAt.getDate() && canceledDesk.id === bookedDesk.id
                && canceledDay.bookedBy === booking.bookedBy) {
                let index = this.bookingList.indexOf(bookedDesk);
                this.bookingList.splice(index, 1);
              }
            });
          });
        }
      })
    })
  }

  fetchData(): Promise<ReadonlyArray<RoomViewModel>> {
    return firstValueFrom(of(mockRoomData).pipe(delay(200),
      map(rooms => {
        return rooms.map(room => {
          return { 
            ...room,
            desks: room.desks.map(desk => {
              return {
                id: desk.id,
                name: desk.name,
                note: desk.note,
                position: desk.position,
                size: desk.size,
                bookings: desk.bookings.map(booking => {
                  return {
                    bookedAt: new Date(booking.bookedAt),
                    bookedBy: booking.bookedBy
                  }
                }),
                bookable: desk.bookable
              }
            })
          }
        })
      })
    ,tap(values => { return this.rooms.next(values); })));
  }

  isCurrentDayBooked(desk?: DeskViewModel) {
    let result: boolean = false;
    desk?.bookings.forEach(booking => {
      if(booking.bookedAt.getDate() === new Date().getDate()) result = true;
    })
    return result;
  }
}