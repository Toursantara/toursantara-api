import fs from "fs"
import path from "path"
import csv from "csv-parser"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tourismWithId = []

fs.createReadStream(path.join(__dirname, "../dataset/tourism_with_id.csv"))
    .pipe(csv())
    .on("data", (row) => {
        tourismWithId.push(row)
    })

export { tourismWithId }
