const express = require('express')
const multer = require('multer')
const jwtValidation = require('../Middleware/jwtValidation')
const {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('./product.service')
const { productSchema, updateProductSchema } = require('../Validation/validation')
const fs = require('fs').promises
const path = require('path')

const router = express.Router()
const uploadFolderPath = 'images/product'
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
    const staff = await getAllProduct()
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
    const staff = await getProductById(id)
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
  const { name, stock, netPrice, unitId, categoryId, supplierId, information } = req.body
  const image = req.file.path

  try {
    await productSchema.validateAsync({ name, stock, netPrice, unitId, categoryId, supplierId, information, image })
    const newData = await createProduct(name, Number(stock), Number(netPrice), Number(unitId), Number(categoryId), Number(supplierId), information, image)
    return res.status(200).json({
      message: 'Success Create new Product',
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
  const { name, stock, netPrice, unitId, categoryId, supplierId, information } = req.body
  const imagepath = req.file ? req.file.path : null
  try {
    await updateProductSchema.validateAsync({
      name, stock, netPrice, unitId, categoryId, supplierId, information
    })
    const product = await getProductById(id)
    if (imagepath) {
      await fs.unlink(product.image)
    }
    const newData = await updateProduct(
      id,
      {
        name: name || product.name,
        stock: Number(stock) || product.stock,
        netPrice: Number(netPrice) || product.netPrice,
        unitId: Number(unitId) || product.unitId,
        categoryId: Number(categoryId) || product.categoryId,
        supplierId: Number(supplierId) || product.supplierId,
        image: imagepath || product.image,
        information: information || product.information
      }
    )
    return res.status(200).json({
      message: 'Success Update Product Data',
      staff: newData
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(400).json({
        error: 'No Product found'
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
    const supplier = await getProductById(id)

    const { image } = supplier

    await fs.unlink(image)

    await deleteProduct(id)

    return res.status(200).json({
      message: 'Success Delete Product Data'
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(400).json({
        error: 'No Product found'
      })
    }
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})
module.exports = router
