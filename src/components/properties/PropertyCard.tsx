import Property from "@/types/Property"
import { Rating } from "./Rating"
import { useNavigate } from "react-router-dom"

type PropertyCardProps = {
    property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
    const navigate = useNavigate()

    const onClick = () => {
        navigate(`/property/${property.id}`)
    }

    return (
        <div className="w-72 h-96 bg-slate-400 p-3 flex flex-col justify-between cursor-pointer rounded-xl" onClick={onClick}>
            <div>
                <img className="w-full h-1/2 object-cove rounded-md" src={property.imgUrl} alt={property.name}></img>
                <div className="flex items-center justify-between">
                    <h1 className="py-2 text-xl font-bold">{ property.name }</h1>
                    <Rating rate={property.rating} />
                </div>
                <p className="">{property.description}</p>
            </div>
            <div className="text-right">
                <span className="">Price per night ${property.price.toFixed(2)}</span>
            </div>
        </div>
    )
}
