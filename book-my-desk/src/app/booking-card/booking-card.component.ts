import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { DayButton as DayButton } from './dayButton';
import { DateHandlerService } from '../date-handler.service';

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

  startDate: string = "";
  endDate: string = "";

  monButton = new DayButton("Mo", false);
  tueButton = new DayButton("Di", false);
  wedButton = new DayButton("Mi", false);
  thuButton = new DayButton("Do", false);
  friButton = new DayButton("Fr", false);
  dayButtons: DayButton[] = [this.monButton, this.tueButton, this.wedButton, this.thuButton, this.friButton];

  private readonly textBooking: string = "Buchen";
  private readonly textCancelBooking: string = "Stornieren";
  bookButtonText: string = this.textBooking;

  lastStateBooked: boolean = false;

  constructor(private dateHandlerService: DateHandlerService){}

  ngOnInit() {
    this.startDate = this.dateHandlerService.getFirstDateOfWeek();
    this.endDate = this.dateHandlerService.getLastDateOfWeek();
  }

  onDayButtonClick(button: DayButton) {
    button.changeColor();
  }

  onChangeWeek(previousWeek: boolean) {
    this.startDate = this.dateHandlerService.changeWeekStart(previousWeek);
    this.endDate = this.dateHandlerService.changeWeekEnd(previousWeek);
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
}