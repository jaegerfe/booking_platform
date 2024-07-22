import { Booking } from "@/types/Booking";
import moment from "moment";
import * as momentRange from "moment-range";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const rangeMoment = momentRange.extendMoment(moment);

let id = 0;

export interface BookingsState {
    value: Booking[]
}

const initialState: BookingsState = {
    value:[]
}

const isOverlapping = (b1: Booking, b2: Booking): boolean => {
    const range1 = rangeMoment.range(b1.startDate, b1.endDate);
    const range2 = rangeMoment.range(b2.startDate, b2.endDate);
    return range1.overlaps(range2, {adjacent: true})
}

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        book(state, action: PayloadAction<Booking>) {
            const newBooking = action.payload
            console.log(newBooking)
            const overlapingBookings = state.value.filter(b => 
                b.property.id === newBooking.property.id && isOverlapping(b, newBooking))
            if (overlapingBookings.length > 0) {
                throw Error("Error on create booking: unavailable dates")
            }
            newBooking.id = id++
            newBooking.total = newBooking.endDate.diff(newBooking.startDate, 'days') * newBooking.property.price;
            state.value = [...state.value, newBooking];
        },
        update(state, action: PayloadAction<Booking>) {
            const updatedBooking = action.payload
            const indexOfBooking = state.value.findIndex(b => b.id === updatedBooking.id)
            if (indexOfBooking < 0) {
                throw Error("Error on update booking: booking not found")
            }
            const overlapingBookings = state.value.filter(b => 
                b.property.id === updatedBooking.property.id && b.id !== updatedBooking.id && isOverlapping(b, updatedBooking))
            if (overlapingBookings.length > 0) {
                throw Error("Error on update booking: unavailable dates")
            }
            updatedBooking.total = updatedBooking.endDate.diff(updatedBooking.startDate, 'days') * updatedBooking.property.price;
            const newList = [...state.value]
            newList[indexOfBooking] = { ...newList[indexOfBooking], ...updatedBooking }
            state.value = newList
        },
        delete(state, action: PayloadAction<number>) {
            console.log(action.payload);
            console.log(state);
            const indexOfBooking = state.value.findIndex(b => b.id === action.payload)
            if (indexOfBooking < 0) {
                throw Error("Error on delete booking: booking not found")
            }
            const newList = [...state.value]
            newList.splice(indexOfBooking, 1)
            state.value = newList
        }
    }
})

export function getBookingsForUser(state: BookingsState, user: string) {
    return state.value.filter(b => b.owner === user);
}

export function getUnavailableRangesForProperty(state: BookingsState, propertyId: number) {
    const unavailable = state.value.filter(b => b.property.id === propertyId);
    return unavailable.map(b => ({ startDate: b.startDate.toDate(), endDate: b.endDate.toDate() }))
}

export function getBooking(state: BookingsState, id: number) {
    return state.value.filter(b => b.id === id)[0];
}

export default bookingsSlice.reducer

export const actions = bookingsSlice.actions
