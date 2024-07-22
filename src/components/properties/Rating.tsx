import { ReactNode } from "react"
import { MdStar, MdStarOutline } from "react-icons/md"

type RatingProps = {
    rate: 1 | 2 | 3 | 4 | 5
}

export function Rating({rate}: RatingProps) {
    function renderStars(): ReactNode[] {
        const stars = [null, null, null, null, null] as ReactNode[]
        stars.fill(<MdStar className="size-4"/>, 0, rate)
        stars.fill(<MdStarOutline className="size-4" />, rate, 5)
        console.log(stars)
        return stars
    }
    return (
        <div className="flex">
            {renderStars()}
        </div>
    )
}
