import bcrypt from "bcrypt"
import db from "../config/firebase.js"

// Function to generate a random user ID between 1 and 300
const generateRandomUserId = () => {
    return Math.floor(Math.random() * 300) + 1
}

export const register = async (request, h) => {
    try {
        const data = request.payload
        const { username, email, password } = data

        if (!username || !email || !password) {
            return h.response({ error: "Missing fields" }).code(400)
        }

        // Check if email already exists
        const userRef = db.collection("users").doc(email)
        const userDoc = await userRef.get()
        if (userDoc.exists) {
            return h.response({ error: "Email already exists" }).code(409)
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Generate a random user ID
        const user_id = generateRandomUserId()

        // Store user data in Firestore
        const userData = {
            username,
            email,
            password: hashedPassword,
            user_id,
        }
        await userRef.set(userData)

        return h.response({ message: "User registered successfully" }).code(201)
    } catch (error) {
        return h.response({ error: error.message }).code(500)
    }
}

export const login = async (request, h) => {
    const data = request.payload
    const email = data.email
    const password = data.password

    // Retrieve user data from Firestore
    const userRef = db.collection("users").doc(email)
    const doc = await userRef.get()

    if (!doc.exists) {
        return h.response({ error: "User not found" }).code(404)
    }

    const userData = doc.data()

    // Verify password
    const storedPassword = userData.password
    const isPasswordCorrect = await bcrypt.compare(password, storedPassword)

    if (isPasswordCorrect) {
        return h.response({ message: "Login successful" }).code(200)
    } else {
        return h.response({ error: "Invalid email or password" }).code(401)
    }
}
