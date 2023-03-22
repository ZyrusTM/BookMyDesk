import { addDays, subDays } from "date-fns";

export interface RoomApiModel {
    id: number;
    name?: string; // if no name given, just name it "Room #" + room-id (don't forget the hash sign :-) )
    desks: ReadonlyArray<DeskApiModel>;
    floorPlanUrl?: string; // used to fetch image for floor-plan. If empty, draw basic rectangle with border
    size: Size;
    bookable: Bookable;
}
   
export interface DeskApiModel {
    id: number;
    name?: string; // if no name given, just name it "Desk #" + desk-id (don't forget the hash sign :-) )
    note?: string;
    position: { x: number; y: number };
    size: Size;
    bookings: ReadonlyArray<BookingApiModel>;
    bookable: Bookable;
}
   
  interface Size {
    width: number;
    height: number;
  }
   
export interface BookingApiModel {
    bookedAt: string; // ISO-8601-String
    bookedBy: number; // user-id
}
   
type Bookable = {
        isBookable: boolean;
        reason?: string;
        blockedAt?: ReadonlyArray<string>; // Array of ISO-8601-Strings. If Array is empty, desk is every day blocked
      };
   
  const deskSizeHorizontal: Size = { width: 160, height: 80 };
  const deskSizeVertical: Size = { width: 80, height: 160 };
   
  const defaultDeskHorizontal: DeskApiModel = {
    id: 0,
    bookable: { isBookable: true },
    size: { ...deskSizeVertical },
    position: { x: 0, y: 0 },
    bookings: [],
  };
   
  const defaultDeskVertical: DeskApiModel = {
    id: 0,
    bookable: { isBookable: true },
    size: { ...deskSizeVertical },
    position: { x: 0, y: 0 },
    bookings: [],
  };
   
  export const mockRoomData: ReadonlyArray<RoomApiModel> = [
    {
      id: 1,
      name: 'Big Office Room',
      size: { width: 470, height: 370 },
      desks: [
        {
          ...defaultDeskVertical,
          id: 1,
          position: { x: 10, y: 170 },
          bookings: [
            { bookedAt: new Date().toISOString(), bookedBy: 2 },
            {
              bookedAt: addDays(new Date(), 1).toISOString(),
              bookedBy: 2,
            },
          ],
        },
        { ...defaultDeskVertical, id: 2, position: { x: 92, y: 170 } },
        { ...defaultDeskVertical, id: 3, position: { x: 300, y: 8 } },
        {
          ...defaultDeskVertical,
          id: 4,
          position: { x: 382, y: 8 },
          bookings: [{ bookedAt: new Date().toISOString(), bookedBy: 1 }],
        },
        { ...defaultDeskVertical, id: 5, position: { x: 300, y: 170 } },
        { ...defaultDeskVertical, id: 6, position: { x: 382, y: 170 } },
      ],
      bookable: { isBookable: true },
    },
    {
      id: 2,
      name: 'Small Office 1',
      size: { width: 356, height: 440 },
      desks: [
        { ...defaultDeskHorizontal, id: 7, position: { x: 10, y: 10 }, bookings: [{ bookedAt: new Date().toISOString(), bookedBy: 2 }], },
        { ...defaultDeskHorizontal, id: 8, position: { x: 92, y: 10 } },
        { ...defaultDeskHorizontal, id: 9, position: { x: 265, y: 240 } },
      ],
      bookable: { isBookable: true },
    },
    {
      id: 3,
      name: 'Small Office 2',
      size: { width: 356, height: 440 },
      desks: [
        { ...defaultDeskHorizontal, id: 10, position: { x: 10, y: 10 } },
        { ...defaultDeskHorizontal, id: 11, position: { x: 92, y: 10 } },
        { ...defaultDeskHorizontal, id: 12, position: { x: 265, y: 240 } },
      ],
      bookable: {
        isBookable: false,
        reason: 'used for laboratory work',
        blockedAt: [],
      },
    },
    {
      id: 4,
      name: 'Conference Room',
      size: { width: 580, height: 300 },
      desks: [
        {
          id: 13,
          size: { width: 360, height: 160 },
          position: { x: 110, y: 50 },
          bookings: [],
          name: 'Conference Desk Group',
          bookable: { isBookable: true },
        },
      ],
      bookable: {
        isBookable: false,
        reason: 'Customer Workshop',
        blockedAt: [
          new Date(subDays(new Date(), 1)).toISOString(), // yesterday
          new Date().toISOString(), // today
          new Date(addDays(new Date(), 1)).toISOString(), // tomorrow
        ],
      },
    },
    {
      id: 5,
      name: 'CEO Office',
      size: { width: 200, height: 220 },
      desks: [
        {
          id: 14,
          name: 'CEO Desk',
          bookable: { isBookable: false, blockedAt: [] },
          size: { ...deskSizeVertical },
          position: { x: 110, y: 20 },
          bookings: [],
        },
      ],
      floorPlanUrl: 'assets/plans/ceo-office.png',
      bookable: {
        isBookable: false,
        reason: 'for CEO only',
        blockedAt: [],
      },
    },
  ];
   
  // usage note:
  // in your desk-booking.service.ts -> fetchData() -> add this line:
  // return of(mockRoomData).pipe(delay(200));
  // use this example for better understanding: https://angular.io/tutorial/tour-of-heroes/toh-pt4#observable-data