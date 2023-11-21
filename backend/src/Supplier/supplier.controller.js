const express = require('express')
const multer = require('multer')
const jwtValidation = require('../Middleware/jwtValidation')
const {
  getAllSupplier,
  createSupplier,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} = require('./supplier.service')
const { supplierSchema } = require('../Validation/validation')
const fs = require('fs').promises
const path = require('path')

const router = express.Router()
const uploadFolderPath = 'images/supplier'
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
    const staff = await getAllSupplier()
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
    const staff = await getSupplierById(id)
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
  const { name, registerDate, address, phone, information } = req.body
  const image = req.file.path

  try {
    await supplierSchema.validateAsync({ name, registerDate, address, phone, image, information })
    const newData = await createSupplier(name, registerDate, address, phone, image, information)
    return res.status(200).json({
      message: 'Success Create new Supplier',
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
  const { name, registerDate, address, phone, information } = req.body
  const imagepath = req.file.path
  try {
    await supplierSchema.validateAsync({
      name,
      registerDate,
      address,
      phone,
      image: imagepath,
      information
    })
    const supplier = await getSupplierById(id)

    const { image } = supplier
    await fs.unlink(image)
    const newData = await updateSupplier(
      id,
      name,
      registerDate,
      address,
      phone,
      imagepath,
      information
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
    const supplier = await getSupplierById(id)

    const { image } = supplier

    await deleteSupplier(id)

    await fs.unlink(image)

    return res.status(200).json({
      message: 'Success Delete Supplier Data'
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
