import { useAppSelector } from "@/hooks/store";
import { PropertyCard } from "./PropertyCard";

export function TopProperties() {
    const properties = useAppSelector(state => state.properties.value);
    return (
        <div className="flex gap-10 px-20 py-10">
            {properties.map(p => <PropertyCard key={p.name} property={p} />)}
        </div>
    )
}
