import { Component, Input, Output, EventEmitter} from '@angular/core';
import { DayButton as DayButton } from './dayButton';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent {
  @Input() isShown: boolean = false;
  @Input() deskId: number = 0;
  @Output() changeShadowStyleEvent = new EventEmitter();
  @Output() deskBookedEvent = new EventEmitter<boolean>();

  startDate: string = "23.01.2023";
  endDate: string = "27.01.2023";

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

  dayButtonOnClick(button: DayButton) {
    button.changeColor();
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
