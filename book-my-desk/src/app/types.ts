import { BookingApiModel, DeskApiModel, RoomApiModel } from "./mock-data";

export type BookingViewModel = Omit<BookingApiModel, "bookedAt"> & {bookedAt: Date}

export type DeskViewModel = Omit<DeskApiModel, "bookings" | "position" | "size">  & {bookings: ReadonlyArray<BookingViewModel>, 
     position?: {x: number, y: number}, size?: {width: number, height: number}}

export type RoomViewModel = Omit<RoomApiModel, 'desks'> & {desks: ReadonlyArray<DeskViewModel>};
