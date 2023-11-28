const express = require('express')
const multer = require('multer')
// const jwt = require('jsonwebtoken')
const jwtValidation = require('../Middleware/jwtValidation')
const {
  getAllStaff,
  createStaff,
  getStaffById,
  updateStaff,
  deleteStaff
} = require('./staff.service')
const { staffSchema, updateStaffSchema } = require('../Validation/validation')
const fs = require('fs').promises
const path = require('path')

const router = express.Router()

const uploadFolderPath = 'images/staff'
fs.mkdir(path.resolve(uploadFolderPath), { recursive: true })
  .then(() => console.log(`'${uploadFolderPath}' folder is ready`))
  .catch((err) => console.error(`Error creating '${uploadFolderPath}' folder: ${err.message}`))

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolderPath)
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
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
      message: 'successfully retrieved data',
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
      message: 'successfully retrieved data',
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
  const imagepath = req.file ? req.file.filename : null

  try {
    await updateStaffSchema.validateAsync({
      name,
      registerDate,
      address,
      phone,
      positionId
    })
    const staff = await getStaffById(id)

    if (imagepath && staff.image && staff.image !== 'null') {
      await fs.unlink('images/staff/' + staff.image)
    }
    const newData = await updateStaff(
      id,
      name || staff.name,
      registerDate || staff.registerDate,
      address || staff.address,
      phone || staff.phone,
      imagepath || staff.image,
      positionId || staff.positionId
    )
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
    await fs.unlink(image)
    await deleteStaff(id)

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
