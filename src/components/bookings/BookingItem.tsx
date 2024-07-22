import { Booking } from "@/types/Booking"
import { Button } from "../Button"
import { actions } from "@/store/bookingsSlice"
import { useState } from "react"
import { Dialog } from "../Dialog"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/hooks/store"

type BookingItemProps = {
    booking: Booking
}

export function BookingItem({ booking }: BookingItemProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [ openErrorDialod, setOpenErrorDialog] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("")

    function onDelete() {
        try {
            dispatch(actions.delete(booking.id))
        } catch (e) {
            if (e instanceof Error) {
                setErrorMessage(e.message)
                setOpenErrorDialog(true)
            }
        }
    }

    return (
        <li className="h-48 mobile:h-fit w-full border border-borders-color rounded-2xl p-4 flex mobile:flex-col gap-3">
            <img className="desktop:h-full desktop:w-56 mobile:w-2/3 mobile:h-36 object-cover rounded-md mobile:mx-auto" src={booking.property.imgUrl}></img>
            <div className="flex w-full mobile:flex-col justify-between">
                <div className="flex flex-col justify-between">
                    <div className="gap-2">
                        <h2 className="text-xl font-bold">{booking.property.name}</h2>
                        <p>From {booking.startDate.format('MM-DD-YYYY')} to {booking.endDate.format('MM-DD-YYYY')}</p>
                    </div>
                    <p>Total ${booking.total.toFixed(2)}</p>
                </div>
                <div className="self-end flex gap-3">
                    <Button onClick={() => navigate(`/my-bookings/${booking.id}`)}>Update</Button>
                    <Button variant="danger" onClick={onDelete}>Delete</Button>
                </div>
            </div>
            <Dialog open={openErrorDialod} onOpenChange={setOpenErrorDialog} description={errorMessage}/>
        </li>
    )
}
