import db from "../config/firebase.js"

export const getUserByEmail = async (email) => {
    const userRef = db.collection("users").doc(email)
    const doc = await userRef.get()
    return doc.exists ? doc.data() : null
}

export const createUser = async (user) => {
    const userRef = db.collection("users").doc(user.email)
    await userRef.set(user)
}
