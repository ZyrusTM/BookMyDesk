export interface DayButton {
    name: string,
    bookingStatus: "booked-by-me" | "booked" | "free",
    date: Date,
    currentDay?: boolean,
    lastStateClicked: boolean
}