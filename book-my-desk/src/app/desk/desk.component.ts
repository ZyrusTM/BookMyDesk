import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.scss']
})
export class DeskComponent {
  readonly recWidth: number = 50;
  readonly recHeight: number = 80;

  defaultColor: boolean = true;
  staticShadow = false;
  showDialog = false;

  @Input() deskId: number = 0;

  onClick() {
    this.showDialog = !this.showDialog;
    this.staticShadow = !this.staticShadow;
  }

  onDeskBooked() {
    this.showDialog = false;
    this.defaultColor = !this.defaultColor;
  }
}
