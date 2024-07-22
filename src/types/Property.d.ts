export default interface Property {
    id: number,
    name: string,
    imgUrl: string,
    price: number,
    rating: 1 | 2 | 3 | 4 | 5,
    description: string,
}
