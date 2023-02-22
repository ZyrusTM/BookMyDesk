export class DayButton{
    name: string;
    color: string;
    lastButtonColorDefault: boolean = true;
    disabled: boolean;

    private readonly defaultColor: string = "primary";
    private readonly selectedColor: string = "acent";

    constructor(buttonName: string, buttonDisabled: boolean) {
        this.name = buttonName; 
        this.color = this.defaultColor;
        this.disabled = buttonDisabled;
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
}