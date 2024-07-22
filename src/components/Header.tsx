
import { MdCardTravel } from "react-icons/md"
import { Link } from "react-router-dom"

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex w-full items-center justify-between p-4 bg-header-background text-header-color">
            <nav className="flex items-center gap-8">
                <Link to="/">
                    <div className="flex items-center gap-1 font-bold">
                        <MdCardTravel className="size-10" />
                        EduBooks
                    </div>
                </Link>
                <ul className="flex gap-1.5">
                    <li>
                        <Link to={"my-bookings"}>
                            My Bookings
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
