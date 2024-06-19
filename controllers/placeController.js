import db from "../config/firebase.js"
import { loadAllPlacesIntoFirestore, getRandomPlaces } from "../services/placeService.js"

export const loadPlaces = async (request, h) => {
    await loadAllPlacesIntoFirestore()
    return "All places loaded into Firestore successfully"
}

export const getPlace = async (request, h) => {
    const placeId = request.params.place_id
    // Retrieve place details from Firestore
    const placeRef = db.collection("places").doc(placeId)
    const doc = await placeRef.get()

    if (doc.exists) {
        const placeData = doc.data()
        return h.response({ status: "success", place: placeData }).code(200)
    } else {
        return h.response({ status: "fail", message: "Place not found" }).code(404)
    }
}

export const searchPlace = async (request, h) => {
    const query = request.query.query

    // Query Firestore for places matching the query
    const placesRef = db.collection("places")
    const snapshot = await placesRef.where("place_name", "==", query).get()

    const places = []
    snapshot.forEach((doc) => {
        places.push(doc.data())
    })

    return h.response({ places: places }).code(200)
}

export const getRandomRecommendation = (request, h) => {
    const randomPlaces = getRandomPlaces()
    return h.response({ status: "success", places: randomPlaces }).code(200)
}
