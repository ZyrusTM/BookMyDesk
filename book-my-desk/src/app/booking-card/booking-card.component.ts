import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { DayButton } from './dayButton';
import { DateHandlerService } from '../date-handler.service';
import { DeskBookingService } from '../desk-booking.service';
import { DeskViewModel } from '../types';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookingCardComponent implements OnInit{
  @Input() deskId: number = 0;
  @Input() userId: number = 0;
  @Output() changeShadowStyleEvent = new EventEmitter();
  @Output() deskBookedEvent = new EventEmitter<boolean>();

  private bookingList: DeskViewModel[] = [];
  weekDays: Date[] = [];

  dayButtons: DayButton[] = [];
  private selectedButtons: DeskViewModel[] = [];
  private buttonsToUnselect: DeskViewModel[] = [];

  bookButtonActive: boolean = true;
  cancelButtonsActive: boolean = false;

  constructor(private dateHandlerService: DateHandlerService, private deskBookingService: DeskBookingService){}

  ngOnInit() {
    this.bookingList = this.deskBookingService.pullBookingList(this.deskId);
    if(this.bookingList.length != 0) {
      this.bookButtonActive = false;
      this.cancelButtonsActive = true;
    }
    else {
      this.bookButtonActive = true;
      this.cancelButtonsActive = false;
    }
    this.weekDays = this.dateHandlerService.getDatesOfCurrentWeek();
    this.initializeButtons();
  }

  onDayButtonClick(button: DayButton) {
    let data: DeskViewModel = {
      deskId: this.deskId,
      bookedDay: button.date,
      userId: this.userId
    };

    if(!button.lastStateClicked) {
      this.selectedButtons.push(data);
      button.setBookedByMe();
    }
    else {
      this.checkDataInconsistencies(data);
      this.buttonsToUnselect.push(data);
      button.setFree();
    }
  }

  onChangeWeek(previousWeek: boolean) {
    this.weekDays = this.dateHandlerService.changeWeek(previousWeek);
    this.initializeButtons();
  }

  onResetDate() {
    this.ngOnInit();
  }

  onCancel() {
    this.changeShadowStyleEvent.emit();
  }

  onBook() {
    if(this.selectedButtons.length != 0) {
      this.deskBookingService.pushBookedDesk(this.selectedButtons);
      this.selectedButtons = [];
      this.changeShadowStyleEvent.emit();
      this.checkCurrentBookingState();
    }
  }

  onChangeBooking() {
    if(this.selectedButtons && this.selectedButtons.length) {
      this.deskBookingService.pushBookedDesk(this.selectedButtons);
      this.selectedButtons = [];
    }
    if(this.buttonsToUnselect && this.buttonsToUnselect.length) {
      this.deskBookingService.deleteCanceledDesk(this.buttonsToUnselect, false);
      this.buttonsToUnselect = [];
    }
    this.checkCurrentBookingState();
    this.changeShadowStyleEvent.emit();
  }

  onCancelAll() {
    this.deskBookingService.deleteCanceledDesk(this.buttonsToUnselect, true, this.deskId, this.userId);
    this.buttonsToUnselect = [];
    this.changeShadowStyleEvent.emit();
    this.checkCurrentBookingState();
  }

  isCurrentDate(button: DayButton) {
    return button.date.getDate() === new Date().getDate() ? true : false;
  }

  private checkDataInconsistencies(data: DeskViewModel) {
    this.selectedButtons.forEach(element => {
      if(element.bookedDay.getDate() === data.bookedDay.getDate() && element.deskId === data.deskId && element.userId === data.userId) {
        let index = this.selectedButtons.indexOf(element)
        this.selectedButtons.splice(index, 1);
      }
    });
  }

  private initializeButtons() {
    let days: string[] = ["Mo", "Di", "Mi", "Do", "Fr"];
    for(let i = 0;i<5;i++) {
      this.dayButtons.push(new DayButton(days[i], this.weekDays[i]));
    }
    this.bookingList.forEach(bookedDesk => {
      this.dayButtons.forEach(dayButton => {
        if(bookedDesk.bookedDay.getDate() === dayButton.date.getDate()) {
          if(bookedDesk.userId === this.userId) {
            dayButton.setBookedByMe();
          }
          else {
            dayButton.setBooked();
          }
        }
      });
    });
  }    

  private checkCurrentBookingState() {
    if(this.deskBookingService.isCurrentDayBooked(this.deskId)) {
      this.deskBookedEvent.emit(true);
    }
    else {
      this.deskBookedEvent.emit(false);
    }
  }
}