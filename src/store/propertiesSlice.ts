import { createSlice } from "@reduxjs/toolkit";
import Property from '../types/Property';

// Mocked data
const mockedProperties = [
    {
        id: 1,
        name: "Snowy Chalet",
        imgUrl: "https://cdn.loc.gov/service/pnp/highsm/36900/36930r.jpg",
        description: "A glamorous chalet near of snow montains.",
        price: 150.56,
        rating: 4,
    },
    {
        id: 2,
        name: "Beach House", 
        imgUrl: "https://burst.shopifycdn.com/photos/a-beach-shack-on-stilts.jpg?width=1850&format=pjpg&exif=0&iptc=0",
        description: "Little house where you can wake up and directly put your feets on the sand.",
        price: 110.6,
        rating: 3,
    }
] as Property[];

export interface PropertiesState {
    value: Property[]
}

const initialState: PropertiesState = {
    value: mockedProperties
}

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
    },
})

export function getTopRatings(state: PropertiesState) {
    return state.value.filter(p => p.rating>=4);
}

export function getProperty(state: PropertiesState, id: number): Property {
    return state.value.filter(p => p.id === id)[0];
}

export default propertiesSlice.reducer
