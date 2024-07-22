import { Booking } from "@/types/Booking"
import { BookingItem } from "./BookingItem"

type BookingsListProps = {
    bookingsList: Booking[]
}

export function BookingsList({ bookingsList }: BookingsListProps) {
    return (
        <ul className="space-y-4">
            {bookingsList.map(b => <BookingItem booking={b} />)}
        </ul>
    )
}
