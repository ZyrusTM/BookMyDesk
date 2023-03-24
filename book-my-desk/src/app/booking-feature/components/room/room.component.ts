import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RoomApiModel } from '../../mocks/mock-data';
import { RoomViewModel } from '../../booking-api/types';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

export class RoomComponent implements OnInit, OnChanges{
  @Input() room?: RoomViewModel;

  isBlurred: boolean = false;

  ngOnInit() {
    this.checkRoomBookable();
  }

  ngOnChanges() {
    this.checkRoomBookable();
  }

  private checkRoomBookable() {
    if(!this.room?.bookable.isBookable) {
      this.isBlurred = true;
    }
  }
}
