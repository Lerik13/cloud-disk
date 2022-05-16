const express = require("express")
const mongoose = require("mongoose")
const config =  require("config")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")

const app = express()
const PORT = process.env.PORT || config.get('serverPort')

const corsMiddleware = require('./middleware/cors.middleware')
const filePathMiddleware = require('./middleware/filepath.middleware')
const path = require('path')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.json())
//app.use(express.static('static'))
app.use(express.static(path.join(__dirname, 'static')))
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
	// Set build folder as static
	app.use(express.static(path.join(__dirname, '../front_end/build')))

	app.get('*', (req, res) => res.sendFile(__dirname, '../', 'front_end', 'build', 'index.html'))
} else {
	app.get('/', (req, res) => {
		res.status(200).json({message: 'Welcome to  Cloud Disk API'})
	})
}

const start = async () => {
	try {
		const DB_URL = process.env.DB_URL || config.get("dbUrl")
		await mongoose.connect(DB_URL)

		app.listen(PORT, () => {
			console.log('Server started on port ', PORT)
		})
	} catch(e) {
		console.log(e)
	}
}

start();