import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent {
  readonly recWidth: number = 50;
  readonly recHeight: number = 80;

  readonly colorDefault: string = 'rgb(0, 255, 0)';
  readonly colorBooked: string = 'rgb(255, 0, 0)';
  fillColor: string = this.colorDefault;
  isShown: boolean = false;
  lastVisibilityState: boolean = false;
  shadowStyles: string[] = ["hovorShadow", "staticShadow"];
  shadowStyle: string = this.shadowStyles[0];

  @Input() isBooked: boolean = false;
  @Input() deskId: number = 0;

  onClick() {
    if(!this.lastVisibilityState) {
      this.isShown = true;
      this.lastVisibilityState = true;
      this.shadowStyle = this.shadowStyles[1];
    }
    else if(this.lastVisibilityState) {
      this.isShown = false;
      this.lastVisibilityState = false;
      this.shadowStyle = this.shadowStyles[0];
    }
  }

  onDeskBooked(changeToRed: boolean) {
    if(changeToRed) {
      this.fillColor = this.colorBooked;
    }
    else {
      this.fillColor = this.colorDefault;
    }
  }
}
