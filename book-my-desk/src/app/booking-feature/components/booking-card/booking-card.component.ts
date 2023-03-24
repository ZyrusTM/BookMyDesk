import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { DayButton } from './dayButton';
import { getDatesOfCurrentWeek, changeWeek } from '../../../common/utils/date-utils';
import { DeskBookingService } from '../../services/desk-booking.service';
import { BookingViewModel, DeskViewModel } from '../../booking-api/types';
import { Observable } from 'rxjs';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookingCardComponent implements OnInit{
  @Input() desk?: DeskViewModel;
  @Output() changeShadowStyleEvent = new EventEmitter();
  @Output() deskBookedEvent = new EventEmitter<boolean>();

  private bookings: DeskViewModel[] = [];

  weekDays: Date[] = [];

  dayButtons: DayButton[] = [];
  selectedButtons: DeskViewModel[] = [];
  buttonsToUnselect: DeskViewModel[] = [];

  bookButtonActive: boolean = true;
  cancelButtonsActive: boolean = false;

  showBooking: boolean = true;
  observable: Observable<number> = new Observable( ob => ob.next(100));

  constructor(private deskBookingService: DeskBookingService, private userService: UserService){}

  ngOnInit() {
    this.desk?.bookings.forEach(booking => {
      if(booking.bookedBy === this.userService.getUserId()) {
        this.bookButtonActive = false;
        this.cancelButtonsActive = true;
      }
      else {
        this.bookButtonActive = true;
        this.cancelButtonsActive = false;
      }
    })
    this.weekDays = getDatesOfCurrentWeek();
    this.initializeButtons();
  }

  onDayButtonClick(button: DayButton) {
    let bookings: BookingViewModel = {
      bookedAt: button.date,
      bookedBy: 0
    }

    let data: DeskViewModel = {
      id: this.desk ? this.desk.id : 0,
      bookings: [],
      bookable: {isBookable: true}
    };

    data.bookings = data.bookings.concat(bookings);
    console.log(data);

    if(!button.lastStateClicked) {
      this.selectedButtons.push(data);
      button.bookingStatus = "booked-by-me";
      button.lastStateClicked = true;
    }
    else {
      this.checkDataInconsistencies(data);
      this.buttonsToUnselect.push(data);
      button.bookingStatus = "free";
      button.lastStateClicked = false;
    }
  }

  onChangeWeek(previousWeek: boolean) {
    this.weekDays = changeWeek(previousWeek, this.weekDays);
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
      this.deskBookingService.saveDesk(this.selectedButtons);
      this.initializeInfo();
      this.checkCurrentBookingState();
    }
  }

  onChangeBooking() {
    if(this.selectedButtons && this.selectedButtons.length) {
      this.deskBookingService.saveDesk(this.selectedButtons);
    }
    if(this.buttonsToUnselect && this.buttonsToUnselect.length) {
      this.deskBookingService.cancelDesk(this.buttonsToUnselect, false);
    }
    this.initializeInfo();
    this.checkCurrentBookingState();
  }

  onCancelAll() {
    this.deskBookingService.cancelDesk(this.buttonsToUnselect, true, this.desk?.id);
    // this.bookingList.forEach(element => {
    //   this.buttonsToUnselect.push(element);
    // });
    this.initializeInfo();
    this.checkCurrentBookingState();
  }

  initializeInfo() {
    this.showBooking = !this.showBooking;
    let value = 100;
    this.observable = new Observable( observer => {
      const interval = setInterval(() => {
        if(value <= 0) {
          clearInterval(interval);
          this.changeShadowStyleEvent.emit();
        }
        observer.next(value);
        value--;
      }, 200);
    });
  }

  private checkDataInconsistencies(data: DeskViewModel) {
    this.selectedButtons.forEach(selectedButton => {
      selectedButton.bookings.forEach(selectedDays => {
        data.bookings.forEach(toCheck => {
          if(selectedDays.bookedAt.getDate() === toCheck.bookedAt.getDate() && selectedDays.bookedBy === toCheck.bookedBy
           && selectedButton.id === data.id) {
            let index = this.selectedButtons.indexOf(selectedButton);
            this.selectedButtons.splice(index, 1);
          }
        });
      });
    });
  }

  private initializeButtons() {
    this.dayButtons = [];
    let days: string[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    for(let i = 0;i<7;i++) {
      let dayButton: DayButton = {
        name: days[i],
        bookingStatus: "free",
        date: this.weekDays[i],
        lastStateClicked: false
      }
      this.dayButtons.push(dayButton);
    }
    this.desk?.bookings.forEach(booking => {
      this.dayButtons.forEach(dayButton => {
        if(booking.bookedAt.getDate() === dayButton.date.getDate()) {
          if(booking.bookedBy === this.userService.getUserId()) {
            dayButton.bookingStatus = "booked-by-me";
          }
          else {
            dayButton.bookingStatus = "booked";
          }
          dayButton.lastStateClicked = true;
        }
      })
    })
    const currentDayButton = this.dayButtons.find(btn => btn.date.getDate() === new Date().getDate());
    if(currentDayButton){
      currentDayButton.currentDay = true;
    }
  }

  private checkCurrentBookingState() {
    if(this.deskBookingService.isCurrentDayBooked(this.desk)) {
      this.deskBookedEvent.emit(true);
    }
    else {
      this.deskBookedEvent.emit(false);
    }
  }
}
