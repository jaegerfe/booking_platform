import { CreateEditBooking } from "@/components/bookings/CreateEditBooking";
import { RootState } from "@/store";
import { getBooking } from "@/store/bookingsSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export function ShowBookingDetails() {
    const { id } = useParams();
    const booking = useSelector((state: RootState)=> getBooking(state.bookings, Number(id)));

    return (
        <>
            <CreateEditBooking property={booking.property} updatingBooking booking={booking}/>
        </>
    )
}

