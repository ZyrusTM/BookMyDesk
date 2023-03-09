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
  @Output() deskBookedEvent = new EventEmitter();

  private bookingList: DeskViewModel[] = [];
  weekDays: Date[] = [];

  dayButtons: DayButton[] = [];
  private selectedButtons: DeskViewModel[] = [];
  private buttonsToUnselect: DeskViewModel[] = [];

  bookButtonActive: boolean = true;
  changeButtonActive: boolean = false;
  cancelAllButtonActive: boolean = false;
  pushedData: boolean = false;
  deletedData: boolean = false;
  isDirty = false;

  myUserId: number = 0;

  constructor(private dateHandlerService: DateHandlerService, private deskBookingService: DeskBookingService){}

  ngOnInit() {
    this.bookingList = this.deskBookingService.pullBookingList(this.deskId);
    this.weekDays = this.dateHandlerService.getDatesOfCurrentWeek();
    this.initializeButtons();
  }

  onDayButtonClick(button: DayButton) {
    this.isDirty = true;
    let data: DeskViewModel = {
      deskId: this.deskId,
      bookedDay: button.date,
      userId: this.userId
    };

    if(!button.lastStateClicked) {
      this.selectedButtons.push(data);
      button.lastStateClicked = true;
      this.pushedData = true;
      button.onSelected();
    }
    else {
      this.buttonsToUnselect.push(data);
      button.lastStateClicked = false;
      this.deletedData = true;
      button.onUnselected();
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
    this.deskBookingService.pushBookedDesk(this.selectedButtons);
    this.selectedButtons = [];
    this.changeShadowStyleEvent.emit();
    this.checkCurrentBookingState();
  }

//     if(this.pushedData || this.deletedData) {
//       this.pushedData = false;
//       this.deletedData = false;
//       this.deskBookingService.addBookedDesk(this.selectedButtons);
//       this.selectedButtons = [];
//       this.changeShadowStyleEvent.emit();
//       this.checkCurrentBookingState();
//       this.bookButtonActive = false;
//       this.changeButtonActive = true;
//       this.cancelAllButtonActive = true;
//     }
//   }

  onChangeBooking() {
    if(this.pushedData && this.deletedData) {
      this.deskBookingService.deleteCanceledDesk(this.buttonsToUnselect, false);
      this.buttonsToUnselect = [];
      this.deskBookingService.pushBookedDesk(this.selectedButtons);
      this.selectedButtons = [];
      this.checkCurrentBookingState();
      this.changeShadowStyleEvent.emit();
      this.deletedData = false;
      this.pushedData = false;
      return;
    }
  }

//     if(this.pushedData) {
//       this.onBook();
//       this.pushedData = false;
//     }
//     else if(this.deletedData) {
//       this.deskBookingService.deleteCanceledDesk(this.buttonsToUnselect, false);
//       this.buttonsToUnselect = [];
//       this.checkCurrentBookingState();
//       this.changeShadowStyleEvent.emit();
//       this.deletedData = false;
//       if(this.allButtonsUnselected()) {
//         this.cancelAllButtonActive = false;
//         this.changeButtonActive = false;
//         this.bookButtonActive = true;
//       }
//     }
//   }

  onCancelAll() {
    this.deskBookingService.deleteCanceledDesk(this.buttonsToUnselect, true);
    this.buttonsToUnselect = [];
    this.checkCurrentBookingState();
    this.changeShadowStyleEvent.emit(); 

    this.cancelAllButtonActive = false;
    this.changeButtonActive = false;
    this.bookButtonActive = true;
  }

  isCurrentDate(button: DayButton) {
    return button.date.getDate() === new Date().getDate() ? true : false;
  }

  private initializeButtons() {
    let days: string[] = ["Mo", "Di", "Mi", "Do", "Fr"];
    for(let i = 0;i<5;i++) {
      this.dayButtons.push(new DayButton(days[i], false, this.weekDays[i], true, false));
    }
    this.bookingList.forEach(bookedDesk => {
      this.dayButtons.forEach(dayButton => {
        if(bookedDesk.bookedDay.getDate() === dayButton.date.getDate()) {
          dayButton.disabled = true;
          if(bookedDesk.userId === this.myUserId) {
            dayButton.isBookedByMe = true;
          }
          else {
            dayButton.isBooked = true;
          }
        }
      })
    })
  }    

  private checkCurrentBookingState() {
    if(this.deskBookingService.isCurrentDayBooked(this.deskId)) {
      this.deskBookedEvent.emit();
    }

  }

  private allButtonsUnselected() {
    for(const button of this.dayButtons) {
      if(button.lastStateClicked == true) {
        return false;
      }
    }
    return true;
  }
}