import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeskBookingService } from '../../services/desk-booking.service';
import { DeskViewModel } from '../../booking-api/types';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.scss']
})
export class DeskComponent implements OnInit {
  @Input() desk?: DeskViewModel;
  @Input() isBlurred: boolean = false;
  @Output() bookingCardActiveEvent = new EventEmitter<number>();

  defaultColor: boolean = true;
  staticShadow = false;
  showDialog = false;

  constructor(private deskBookingService: DeskBookingService) {}

  ngOnInit() {
    if(this.deskBookingService.isCurrentDayBooked(this.desk)) {
      this.onDeskBooked(true);
    }
  }

  onClick() {
    if(!this.isBlurred) {
      this.bookingCardActiveEvent.emit(this.desk?.id);
      this.showDialog = !this.showDialog;
      this.staticShadow = !this.staticShadow;
    }
  }

  onDeskBooked(isBooked: boolean) {
    if(isBooked) {
      this.defaultColor = false;
    }
    else {
      this.defaultColor = true;
    }
  }
}
