import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnChanges{
  readonly recWidth: number = 50;
  readonly recHeight: number = 80;
  fillColor: string = 'rgb(0, 255, 0)';
  isHovored: boolean = false;

  @Input() isBooked: boolean = false;
  @Input() deskId: number = 0;
  
  ngOnChanges() {
    if(this.isBooked) {
      this.fillColor = 'rgb(255, 0, 0)'
    }
  }

  onHover() {
    this.isHovored = true;
  }

  notHovored() {
    this.isHovored = false;
  }
}
