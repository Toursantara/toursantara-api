import { loadPlaces, getPlace, searchPlace, getRandomRecommendation } from "../controllers/placeController.js"

const placeRoutes = [
    {
        method: "GET",
        path: "/load-places",
        handler: loadPlaces,
    },
    {
        method: "GET",
        path: "/place/{place_id}",
        handler: getPlace,
    },
    {
        method: "GET",
        path: "/search",
        handler: searchPlace,
    },
    {
        method: "GET",
        path: "/recommendation",
        handler: getRandomRecommendation,
    },
]

export default placeRoutes
