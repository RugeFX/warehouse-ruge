const express = require('express')
const multer = require('multer')
// const jwt = require('jsonwebtoken')
const jwtValidation = require('../middleware/jwtValidation')
const { getAllStaff, createStaff, getStaffById, updateStaff, deleteStaff } = require('./staff.service')
const { staffSchema } = require('../Validation/validation')
const fs = require('fs').promises

const router = express.Router()

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/staff')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

router.use(multer({ storage: fileStorage, fileFilter }).single('image'))
router.use(jwtValidation)

router.get('/', async (req, res) => {
  try {
    const staff = await getAllStaff()
    return res.status(200).json({
      data: staff
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const staff = await getStaffById(id)
    return res.status(200).json({
      data: staff
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
})
router.post('/', async (req, res) => {
  const { name, registerDate, address, phone, positionId } = req.body
  const image = req.file.path

  try {
    await staffSchema.validateAsync({ name, registerDate, address, phone, image, positionId })
    const newData = await createStaff(name, registerDate, address, phone, image, positionId)
    return res.status(200).json({
      message: 'Success Create new Staff"',
      staff: newData
    })
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('name')) {
      return res.status(400).json({
        error: 'Name already exists'
      })
    }
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { name, registerDate, address, phone, positionId } = req.body
  const imagepath = req.file.path

  try {
    await staffSchema.validateAsync({ name, registerDate, address, phone, image: imagepath, positionId })
    const supplier = await getStaffById(id)

    const { image } = supplier
    const newData = await updateStaff(id, name, registerDate, address, phone, imagepath, positionId)
    await fs.unlink(image)
    return res.status(200).json({
      message: 'Success Update Staff Data',
      staff: newData
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(400).json({
        error: 'No staff found'
      })
    }
    if (error.code === 'P2002' && error.meta.target.includes('name')) {
      return res.status(400).json({
        error: 'Name already exists'
      })
    }
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const supplier = await getStaffById(id)

    const { image } = supplier
    await deleteStaff(id)
    await fs.unlink(image)

    return res.status(200).json({
      message: 'Success Delete Staff Data'
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(400).json({
        error: 'No staff found'
      })
    }
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})
module.exports = router
