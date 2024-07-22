import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";
import { useAppDispatch } from "@/hooks/store";
import { RootState } from "@/store";
import { actions, getUnavailableRangesForProperty } from "@/store/bookingsSlice";
import { Booking } from "@/types/Booking";
import Property from "@/types/Property";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Rating } from "../properties/Rating";

type CreateEditBookingProps = {
    updatingBooking?: boolean,
    booking?: Booking,
    property: Property
}

// Using the same component to create and edit a booking
export function CreateEditBooking({ property, booking, updatingBooking }: CreateEditBookingProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const unavailableDates = useSelector((state: RootState) => getUnavailableRangesForProperty(state.bookings, property.id))

    const [ range, setRange ] = useState<DateValueType>({
        startDate: null,
        endDate: null
    })
    const [ bookingObj, setBookingObj ] = useState<Booking>({
        id: 0,
        startDate: moment(new Date()),
        endDate: moment(new Date()),
        owner: "eduardo",
        total: 0,
        property: property,
    })
    const [ total, setTotal ] = useState(0)
    const [ validBooking, setValidBooking ] = useState(false)
    const [ openErrorDialod, setOpenErrorDialog] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("")

    useEffect(() => {
        if (updatingBooking && booking) {
            setBookingObj(booking)
            setRange({ startDate: booking.startDate.toDate(), endDate: booking.endDate.toDate() })
            setTotal(booking.total)
            setValidBooking(true)
        }
    }, [updatingBooking, booking])

    const changeRange = (newRange: DateValueType) => {
        setRange(newRange)
        const updatedBooking = {
            ...bookingObj,
            startDate: moment(newRange?.startDate),
            endDate: moment(newRange?.endDate)
        }
        setBookingObj(updatedBooking)
        const totalDays = updatedBooking.endDate.diff(updatedBooking.startDate, 'days');
        if(newRange?.startDate && newRange.endDate && totalDays !== 0) {
            setTotal(totalDays * property.price)
            setValidBooking(true)
        } else {
            setTotal(0)
            setValidBooking(false)
        }
    }

    function onBook () {
        try {
            if (updatingBooking) {
                dispatch(actions.update(bookingObj));
            } else {
                dispatch(actions.book(bookingObj));
            }
            navigate('/my-bookings')
        } catch (e) {
            if (e instanceof Error) {
                setErrorMessage(e.message)
                setOpenErrorDialog(true)
            }
        }
    }

    return (
        <>
            <div className="max-w-screen-xl bg-back mt-10 mx-auto desktop:grid desktop:grid-cols-6">
                <div className="col-start-1 col-end-5 row-start-1 ">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold mb-4">{property.name}</h1>
                        <Rating rate={property.rating} />
                    </div>
                    <img className="w-full desktop:rounded-lg mobile:rounded-t-lg" src={property.imgUrl}></img>
                </div>
                <div className="col-start-4 col-end-7 row-start-1 flex flex-col justify-between desktop:mt-40 mobile:rounded-b-lg bg-header-background text-header-color desktop:rounded-lg p-4 desktop:h-80">
                    <div className="mobile:mb-2">
                        <h2 className="text-xl font-bold mb-4">Reserve now</h2>
                        <Datepicker useRange={false} primaryColor="teal" minDate={new Date()} disabledDates={unavailableDates} placeholder="Select your dates" value={range} onChange={changeRange} showShortcuts={false} />
                        <p className="mt-8 text-end"><b>Price per night: </b>${property.price.toFixed(2)}</p>
                        <p className="mt-1 text-end"><b>Total for selected dates: </b>${total.toFixed(2)}</p>
                    </div>
                    <Button variant="secondary" disabled={!validBooking} onClick={onBook}>Book Now</Button>
                </div>
                <div className="p-4 col-start-1 col-end-5">
                    {property.description}
                </div>
            </div>
            <Dialog open={openErrorDialod} onOpenChange={setOpenErrorDialog} description={errorMessage}/>
        </>
    )
}

