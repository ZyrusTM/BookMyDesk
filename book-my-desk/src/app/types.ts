export interface DeskViewModel {
     deskId: number;
bookedDays: ReadonlyArray<{bookedDay: Date; userId: number}>;

}