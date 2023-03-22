import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DeskBookingService } from '../desk-booking.service';
import { RoomApiModel } from '../mock-data';
import { RoomViewModel } from '../types';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent {
  readonly rooms: Observable<ReadonlyArray<RoomViewModel>>;

  constructor(deskBookingService: DeskBookingService) {
    this.rooms = deskBookingService.rooms;
    deskBookingService.fetchData().then().catch(err => console.error('oh noez', err));
  }

  onDragEnd(event: CdkDragEnd) {
    console.log(event.source.getFreeDragPosition())
  }
}
