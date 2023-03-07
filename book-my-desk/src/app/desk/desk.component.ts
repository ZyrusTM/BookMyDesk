import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.scss']
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
  showDialog = false;

  @Input() isBooked: boolean = false;
  @Input() deskId: number = 0;

  onClick() {
    this.showDialog = !this.showDialog;
  }

  onDeskBooked(changeToRed: boolean) {
    this.showDialog = false;
    if(changeToRed) {
      this.fillColor = this.colorBooked;
    }
    else {
      this.fillColor = this.colorDefault;
    }
  }
}
