import admin from "firebase-admin"
import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccountPath = join(__dirname, "../credentials/serviceAccountKey.json")

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

export default db
