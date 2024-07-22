import { CreateEditBooking } from "@/components/bookings/CreateEditBooking";
import { RootState } from "@/store";
import { getProperty } from "@/store/propertiesSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export function ShowPropertyDetails() {
    const { id } = useParams();
    const property = useSelector((state: RootState)=> getProperty(state.properties, Number(id)));

    return (
        <>
            <CreateEditBooking property={property} />
        </>
    )
}

