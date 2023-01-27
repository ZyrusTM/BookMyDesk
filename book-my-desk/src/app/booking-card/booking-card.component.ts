import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent {
  @Input() isShown: boolean = false;

  startDate: string = "23.01.2023";
  endDate: string = "27.01.2023";
  days: string[] = ["Mo", "Di", "Mi", "Do", "Fr"];
  buttonColors: string[] = ["primary", "primary", "primary", "primary", "primary"];
  lastButtonColorDefault: boolean[] = [true, true, true, true, true];
  disabledButtons: boolean[] = [];

  onClick(buttonId: number) {
    this.changeColor(buttonId);
  }

  changeColor(buttonId: number) {
    if(this.lastButtonColorDefault[buttonId]) {
      this.buttonColors[buttonId] = "acent";
      this.lastButtonColorDefault[buttonId] = false;
    }
    else {
      this.buttonColors[buttonId] = "primary";
      this.lastButtonColorDefault[buttonId] = true;
    }
  }
}
