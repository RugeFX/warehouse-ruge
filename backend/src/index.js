const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
// controller
const AuthController = require('./Auth/auth.controller')
const StaffController = require('./Staff/staff.controller')
const PositionController = require('./Position/position.controller')
const SupplierController = require('./Supplier/supplier.controller')
// ------------------------------------------------------------//
const app = express()
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())
app.use('/images/supplier', express.static(path.join(__dirname, '../images/supplier')))
app.use(cors())

app.use('/auth', AuthController)
app.use('/staff', StaffController)
app.use('/position', PositionController)
app.use('/supplier', SupplierController)

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`)
})
