import { Moment } from "moment";
import Property from "./Property";

export interface Booking {
    id: number,
    startDate: Moment,
    endDate: Moment,
    owner: string,
    total: number,
    property: Property,
}
