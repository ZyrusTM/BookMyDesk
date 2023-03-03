export class DayButton{
    name: string;
    color: string;
    lastButtonColorDefault: boolean = true;
    disabled: boolean;
    date: string;
    lastStateClicked: boolean;

    private readonly defaultColor: string = "defaultButtonColor";
    private readonly selectedColor: string = "selectedButtonColor";

    constructor(buttonName: string, buttonDisabled: boolean, buttonDate: string) {
        this.name = buttonName; 
        this.date = buttonDate;
        this.disabled = buttonDisabled;
        this.color = this.defaultColor;
        this.lastStateClicked = false;
    }

    changeColor() {
        if(this.lastButtonColorDefault) {
          this.color = this.selectedColor
          this.lastButtonColorDefault = false;
        }
        else {
          this.color = this.defaultColor;
          this.lastButtonColorDefault = true;
        }
    }

    resetColor() {
      this.color = this.defaultColor;
    }
}