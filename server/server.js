const express = require('express')
const app = express()
const finalRoute = require('./apiurl/index')
const { default: mongoose } = require('mongoose')

require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


finalRoute(app)
app.get('/', (req, res) => res.send('Hello World!'))

mongoose.connect('mongodb://localhost:27017/populate-MERN').then(() => {
    console.log("db connected 🔥")
}).catch((err) => {
    console.log(err)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))