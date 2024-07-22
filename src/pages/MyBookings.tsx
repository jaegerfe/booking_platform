import { BookingsList } from "@/components/bookings/BookingsList";
import { RootState } from "@/store";
import { getBookingsForUser } from "@/store/bookingsSlice";
import { useSelector } from "react-redux";

export function MyBookings() { 
    const bookingList = useSelector((state: RootState) => getBookingsForUser(state.bookings, 'eduardo'));

    return (
        <div className="max-w-screen-xl mt-10 mx-auto">
            <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
            <BookingsList bookingsList={bookingList} />
        </div>
    )
}
