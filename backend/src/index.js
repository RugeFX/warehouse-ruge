const express = require('express')
const dotenv = require('dotenv')

// controller
const AuthController = require('./Auth/auth.controller')
const StaffController = require('./Staff/staff.controller')
const PositionController = require('./Position/position.controller')
// ------------------------------------------------------------//
const app = express()
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())

app.use('/auth', AuthController)
app.use('/staff', StaffController)
app.use('/position', PositionController)

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`)
})
