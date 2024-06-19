export default class Place {
    constructor(placeId, placeName, description, category, city, price, rating, lat, long) {
        this.place_id = placeId
        this.place_name = placeName
        this.description = description
        this.category = category
        this.city = city
        this.price = price
        this.rating = rating
        this.lat = lat
        this.long = long
    }
}
