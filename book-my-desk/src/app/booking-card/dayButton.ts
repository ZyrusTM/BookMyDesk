export class DayButton {
    name: string;
    lastButtonColorDefault: boolean = true;
    disabled: boolean = false;
    date: Date;
    lastStateClicked: boolean = false;
    isFree: boolean = false;
    isBooked: boolean = false;
    isBookedByMe: boolean = false;

    constructor(buttonName: string, buttonDate: Date) {
        this.name = buttonName; 
        this.date = buttonDate;
        this.setFree();
    }

    setBooked() {
      this.isBooked = true;
      this.isBookedByMe = false;
      this.isFree = false;
      this.disabled = true;
      this.lastStateClicked = true;
    }

    setBookedByMe() {
      this.isBookedByMe = true;
      this.isFree = false;
      this.isBooked = false;
      this.disabled = false;
      this.lastStateClicked = true;
    }

    setFree() {
      this.isBookedByMe = false;
      this.isFree = true;
      this.isBooked = false;
      this.disabled = false;
      this.lastStateClicked = false;
    }
}