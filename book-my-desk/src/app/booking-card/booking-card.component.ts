import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { DayButton } from './dayButton';
import { DateHandlerService } from '../date-handler.service';
import { DeskBookingService } from '../desk-booking.service';
import { BookedDaysModel, DeskViewModel } from '../types';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookingCardComponent implements OnInit{
  @Input() deskId: number = 0;
  @Output() changeShadowStyleEvent = new EventEmitter();
  @Output() deskBookedEvent = new EventEmitter<boolean>();

  private bookingList: DeskViewModel[] = [];
  weekDays: Date[] = [];

  dayButtons: DayButton[] = [];
  selectedButtons: DeskViewModel[] = [];
  buttonsToUnselect: DeskViewModel[] = [];

  bookButtonActive: boolean = true;
  cancelButtonsActive: boolean = false;

  showBooking: boolean = true;
  observable: Observable<number> = new Observable( ob => ob.next(100));

  constructor(private dateHandlerService: DateHandlerService, private deskBookingService: DeskBookingService, private userService: UserService){}

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
    let bookedDays: BookedDaysModel = {
      bookedDay: button.date,
      userId: 0
    }

    let data: DeskViewModel = {
      deskId: this.deskId,
      bookedDays: [] 
    };

    data.bookedDays.push(bookedDays);

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
    this.deskBookingService.cancelDesk(this.buttonsToUnselect, true, this.deskId);
    this.bookingList.forEach(element => {
      this.buttonsToUnselect.push(element);
    });
    this.initializeInfo();
    this.checkCurrentBookingState();
  }

  isCurrentDate(button: DayButton) {
    return button.date.getDate() === new Date().getDate() ? true : false;
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
      selectedButton.bookedDays.forEach(selectedDays => {
        data.bookedDays.forEach(toCheck => {
          if(selectedDays.bookedDay.getDate() === toCheck.bookedDay.getDate() && selectedDays.userId === toCheck.userId
           && selectedButton.deskId === data.deskId) {
            let index = this.selectedButtons.indexOf(selectedButton);
            this.selectedButtons.splice(index, 1);
          }
        });
      });
    });
  }

  private initializeButtons() {
    this.dayButtons = [];
    let days: string[] = ["Mo", "Di", "Mi", "Do", "Fr"];
    for(let i = 0;i<5;i++) {
      this.dayButtons.push(new DayButton(days[i], this.weekDays[i]));
    }
    this.bookingList.forEach(bookedDesk => {
      bookedDesk.bookedDays.forEach(bookedDay => {
        this.dayButtons.forEach(dayButton => {
          if(bookedDay.bookedDay.getDate() === dayButton.date.getDate()) {
            if(bookedDay.userId === this.userService.getUserID()) {
              dayButton.setBookedByMe();
            }
            else {
              dayButton.setBooked();
            }
          }
        });
      })
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