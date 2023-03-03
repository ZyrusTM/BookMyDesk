import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { DayButton } from './dayButton';
import { DateHandlerService } from '../date-handler.service';
import { BookingDataHandlerService } from '../booking-data-handler.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit{
  @Input() isShown: boolean = false;
  @Input() deskId: number = 0;
  @Output() changeShadowStyleEvent = new EventEmitter();
  @Output() deskBookedEvent = new EventEmitter<boolean>();

  weekDays: string[] = [];

  dayButtons: DayButton[] = [];
  private selectedButtons: string[] = [];
  private buttonsToUnselect: string[] = [];

  bookButtonActive: boolean = true;
  changeButtonActive: boolean = false;
  cancelAllButtonActive: boolean = false;
  pushedData: boolean = false;
  deletedData: boolean = false;

  constructor(private dateHandlerService: DateHandlerService, private bookingDataHandler: BookingDataHandlerService){}

  ngOnInit() {
    this.weekDays = this.dateHandlerService.getDatesOfCurrentWeek();
    this.initializeButtons();
  }

  onDayButtonClick(button: DayButton) {
    if(!button.lastStateClicked) {
      this.selectedButtons.push(button.date);
      button.lastStateClicked = true;
      if(this.changeButtonActive) this.pushedData = true;
    }
    else {
      this.buttonsToUnselect.push(button.date);
      button.lastStateClicked = false;
      if(this.changeButtonActive) this.deletedData = true;
    }
    if(this.bookingDataHandler)
    button.changeColor();
  }

  onChangeWeek(previousWeek: boolean) {
    this.weekDays = this.dateHandlerService.changeWeek(previousWeek);
    this.initializeButtons();
  }

  onResetDate() {
    this.ngOnInit();
  }

  onCancel() {
    this.isShown = false;
    this.changeShadowStyleEvent.emit();
  }

  onBook() {
    this.bookingDataHandler.pushData(this.selectedButtons);
    this.selectedButtons = [];
    this.changeShadowStyleEvent.emit();
    this.checkCurrentBookingState();
    this.bookButtonActive = false;
    this.changeButtonActive = true;
    this.cancelAllButtonActive = true;
  }

  onChangeBooking() {
    if(this.pushedData && this.deletedData) {
      this.bookingDataHandler.deleteData(this.buttonsToUnselect, false);
      this.buttonsToUnselect = [];
      this.bookingDataHandler.pushData(this.selectedButtons);
      this.selectedButtons = [];
      this.checkCurrentBookingState();
      this.changeShadowStyleEvent.emit();
      this.deletedData = false;
      this.pushedData = false;
      return;
    }

    if(this.pushedData) {
      this.onBook();
      this.pushedData = false;
    }
    else if(this.deletedData) {
      this.bookingDataHandler.deleteData(this.buttonsToUnselect, false);
      this.buttonsToUnselect = [];
      this.checkCurrentBookingState();
      this.changeShadowStyleEvent.emit();
      this.deletedData = false;
    }
  }

  onCancelAll() {
    this.bookingDataHandler.deleteData(this.buttonsToUnselect, true);
    this.buttonsToUnselect = [];
    this.checkCurrentBookingState();
    this.changeShadowStyleEvent.emit(); 
    this.dayButtons.forEach(button => button.resetColor());
    this.cancelAllButtonActive = false;
    this.changeButtonActive = false;
    this.bookButtonActive = true;
  }

  private initializeButtons() {

    this.dayButtons = [new DayButton("Mo", false, this.weekDays[0]), new DayButton("Di", false, this.weekDays[1]),
     new DayButton("Mi", false, this.weekDays[2]), new DayButton("Do", false, this.weekDays[3]), new DayButton("Fr", false, this.weekDays[4])];
  }    

  private checkCurrentBookingState() {
    if(this.bookingDataHandler.isCurrentDayBooked()) {
      this.deskBookedEvent.emit(true);
    }
    else if(!this.bookingDataHandler.isCurrentDayBooked()) {
      this.deskBookedEvent.emit(false);
    }
  }

  private allButtonsUnselected() {
    for(const button of this.dayButtons) {
      if(button.lastStateClicked == true) {
        return false;
      }
      console.log(button);
    }
    return true;
  }
}