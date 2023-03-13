export interface BookedDaysModel {
     bookedDay: Date,
     userId: number
}

export interface DeskViewModel {
     deskId: number;
     bookedDays: BookedDaysModel[];
}