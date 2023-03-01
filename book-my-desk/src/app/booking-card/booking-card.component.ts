import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { DayButton } from './dayButton';
import { DateHandlerService } from '../date-handler.service';
import { BookingDataHandlerService } from '../booking-data-handler.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit{
  @Input() isShown: boolean = false;
  @Input() deskId: number = 0;
  @Output() changeShadowStyleEvent = new EventEmitter();
  @Output() deskBookedEvent = new EventEmitter<boolean>();

  weekDays: string[] = [];

  dayButtons: DayButton[] = [];

  private readonly textBooking: string = "Buchen";
  private readonly textCancelBooking: string = "Stornieren";
  bookButtonText: string = this.textBooking;

  lastStateBooked: boolean = false;

  constructor(private dateHandlerService: DateHandlerService, private bookingDataHandler: BookingDataHandlerService){}

  ngOnInit() {
    this.weekDays = this.dateHandlerService.getDatesOfCurrentWeek();
    this.initializeButtons();
  }

  onDayButtonClick(button: DayButton) {
    if(!button.lastStateClicked) {
      this.bookingDataHandler.pushData(button.date);
      button.lastStateClicked = true;
    }
    else {
      this.bookingDataHandler.changeData(button.date);
      button.lastStateClicked = false;
    }
    button.changeColor();
  }

  onChangeWeek(previousWeek: boolean) {
    this.weekDays = this.dateHandlerService.changeWeek(previousWeek);
  }

  onCancel() {
    this.isShown = false;
    this.changeShadowStyleEvent.emit();
  }

  onBook() {
    if(!this.lastStateBooked) {
      this.deskBookedEvent.emit(true);
      this.bookButtonText = this.textCancelBooking;
      this.changeShadowStyleEvent.emit();
      this.lastStateBooked = true;
    }
    else if(this.lastStateBooked) {
      this.lastStateBooked = false;
      this.bookButtonText = this.textBooking;
      this.deskBookedEvent.emit(false);
      this.changeShadowStyleEvent.emit();
    }
  }

  private initializeButtons() {

    this.dayButtons = [new DayButton("Mo", false, this.weekDays[0]), new DayButton("Di", false, this.weekDays[1]),
     new DayButton("Mi", false, this.weekDays[2]), new DayButton("Do", false, this.weekDays[3]), new DayButton("Fr", false, this.weekDays[4])];
  }    
}