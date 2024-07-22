import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "@/pages/Home";
import { ShowPropertyDetails } from "@/pages/ShowPropertyDetails";
import { MyBookings } from "@/pages/MyBookings";
import { ShowBookingDetails } from "@/pages/ShowBookingDetails";
import { NotFound } from "@/pages/NotFound";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />}></Route>
                <Route path="property">
                    <Route path=":id" element={<ShowPropertyDetails />} />
                </Route>
                <Route path="my-bookings">
                    <Route path="" element={<MyBookings />} />
                    <Route path=":id" element={<ShowBookingDetails />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </>
    )
)
