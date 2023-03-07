import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import { DayButton } from './dayButton';
import { DateHandlerService } from '../date-handler.service';
import { BookingDataHandlerService } from '../booking-data-handler.service';
import { DeskViewModel } from '../types';

const myObject: {foo: string, bar: number} = {foo: '', bar: 42};
@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingCardComponent implements OnInit, OnDestroy{
  @Input() isShown: boolean = false;
  @Input() deskId: number = 0;
  @Input() set deskData(value: DeskViewModel){
    // const isBooked = value.bookedDays === Date.now;
  }
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
isBookedDesk = false;
isFreeDesk = true;
isBookedByMe = false;
  isDirty = false;
  //  formGroup: FormGroup;

  constructor(private dateHandlerService: DateHandlerService, private bookingDataHandler: BookingDataHandlerService){
    console.log('constructed');
    // this.formGroup;
    // this.foormGroup.valueChanged.subscribe(values => { /* do sonethimg */});
  }

  ngOnDestroy(): void {
      console.log('destrcuted');
  }

  ngOnInit() {
    this.weekDays = this.dateHandlerService.getDatesOfCurrentWeek();
    this.initializeButtons();
    this.weekDays.push('foo') // keine Detection
    this.weekDays = ['foo']; // Change Detection triggered!
    this.weekDays = this.weekDays.concat('bar'); // neues Array mit ['fo', 'bar']
    myObject.foo = 'bar';
    const myNewObject = {...myObject};
  }

  onDayButtonClick(button: DayButton) {
    this.isDirty = true;
    if(!button.lastStateClicked) {
      this.selectedButtons.push(button.date);
      button.lastStateClicked = true;
      this.pushedData = true;
    }
    else {
      this.buttonsToUnselect.push(button.date);
      button.lastStateClicked = false;
      this.deletedData = true;
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
  // preList = ['day2'];
// const myBookings = [{'day1', selected: true }, {'day2', selected: false}, ...];
// const myBookings = [];
  async onBook() {
//     const res = await this.bookingDataHandler.pushData();
// if(res.success){
//   this.deskBookedEvent.emit(true);
// }esle {
//   // show error
// }

    if(this.pushedData || this.deletedData) {
      this.pushedData = false;
      this.deletedData = false;
      this.bookingDataHandler.pushData(this.selectedButtons, this.deskId);
      this.selectedButtons = [];
      this.changeShadowStyleEvent.emit();
      this.checkCurrentBookingState();
      this.bookButtonActive = false;
      this.changeButtonActive = true;
      this.cancelAllButtonActive = true;
    }
  }

  onChangeBooking() {
    if(this.pushedData && this.deletedData) {
      this.bookingDataHandler.deleteData(this.buttonsToUnselect, false, this.deskId);
      this.buttonsToUnselect = [];
      this.bookingDataHandler.pushData(this.selectedButtons, this.deskId);
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
      this.bookingDataHandler.deleteData(this.buttonsToUnselect, false, this.deskId);
      this.buttonsToUnselect = [];
      this.checkCurrentBookingState();
      this.changeShadowStyleEvent.emit();
      this.deletedData = false;
      if(this.allButtonsUnselected()) {
        this.cancelAllButtonActive = false;
        this.changeButtonActive = false;
        this.bookButtonActive = true;
      }
    }
  }

  onCancelAll() {
    this.bookingDataHandler.deleteData(this.buttonsToUnselect, true, this.deskId);
    this.buttonsToUnselect = [];
    this.checkCurrentBookingState();
    this.changeShadowStyleEvent.emit(); 
    this.dayButtons.forEach(button => button.resetColor());
    this.cancelAllButtonActive = false;
    this.changeButtonActive = false;
    this.bookButtonActive = true;
  }

  highlightButton(button: DayButton) {
    if(button.date == this.dateHandlerService.getCurrentDate()) {
      return "borderedButton";
    }
    return "button";
  }

  private initializeButtons() {

    this.dayButtons = [new DayButton("Mo", false, this.weekDays[0]), new DayButton("Di", false, this.weekDays[1]),
     new DayButton("Mi", false, this.weekDays[2]), new DayButton("Do", false, this.weekDays[3]), new DayButton("Fr", false, this.weekDays[4])];
  }    

  private checkCurrentBookingState() {
    if(this.bookingDataHandler.isCurrentDayBooked(this.deskId)) {
      this.deskBookedEvent.emit(true);
    }
    else if(!this.bookingDataHandler.isCurrentDayBooked(this.deskId)) {
      this.deskBookedEvent.emit(false);
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