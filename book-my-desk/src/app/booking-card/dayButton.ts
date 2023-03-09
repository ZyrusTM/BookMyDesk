export class DayButton {
    name: string;
    lastButtonColorDefault: boolean = true;
    disabled: boolean;
    date: Date;
    lastStateClicked: boolean;
    isFree: boolean;
    isBooked: boolean;
    isBookedByMe: boolean;

    constructor(buttonName: string, buttonDisabled: boolean, buttonDate: Date, isFree: boolean, isBookedByMe: boolean) {
        this.name = buttonName; 
        this.date = buttonDate;
        this.disabled = buttonDisabled;
        this.lastStateClicked = false;
        this.isFree = isFree;
        this.isBooked = this.isFree ? false : true;
        this.isBookedByMe = isBookedByMe;
    }

    onSelected() {
      this.isBookedByMe = true;
      this.isFree = false;
    }

    onUnselected() {
      this.isBookedByMe = false;
      this.isFree = true;
    }


}