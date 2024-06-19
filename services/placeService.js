import db from "../config/firebase.js"
import Place from "../models/place.js"
import { tourismWithId } from "../utils/csvLoader.js"

export const loadAllPlacesIntoFirestore = async () => {
    const placesRef = db.collection("places")

    for (const row of tourismWithId) {
        const placeId = row["Place_Id"].toString() // Ensure place_id is converted to string
        const placeName = row["Place_Name"]
        const description = row["Description"]
        const category = row["Category"]
        const city = row["City"]
        const price = row["Price"]
        const rating = row["Rating"]
        const lat = row["Lat"]
        const long = row["Long"]

        // Check if place already exists in Firestore
        const existingDoc = await placesRef.doc(placeId).get()
        if (!existingDoc.exists) {
            // Create document with place details
            const place = new Place(placeId, placeName, description, category, city, price, rating, lat, long)
            await placesRef.doc(placeId).set(Object.assign({}, place), { merge: true }) // Use merge to update existing documents
        }
    }
}

export const getRandomPlaces = () => {
    return tourismWithId
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
        .map(
            (row) =>
                new Place(
                    row["Place_Id"].toString(),
                    row["Place_Name"],
                    row["Description"],
                    row["Category"],
                    row["City"],
                    row["Price"],
                    row["Rating"],
                    row["Lat"],
                    row["Long"]
                )
        )
}
