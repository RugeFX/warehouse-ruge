const express = require('express')
const multer = require('multer')
// const jwt = require('jsonwebtoken')
const jwtValidation = require('../Middleware/jwtValidation')
const {
  getAllCaregory,
  createCaregory,
  getCaregoryById,
  updateCaregory,
  deleteCaregory
} = require('./category.service')
const { categorySchema, updateCategorySchema } = require('../Validation/validation')

const router = express.Router()

router.use(multer().none())
router.use(jwtValidation)

router.get('/', async (req, res) => {
  try {
    const category = await getAllCaregory()
    return res.status(200).json({
      message: 'successfully retrieved data',
      data: category
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
    const category = await getCaregoryById(id)
    return res.status(200).json({
      message: 'successfully retrieved data',
      data: category
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
})
router.post('/', async (req, res) => {
  const { itemType } = req.body

  try {
    await categorySchema.validateAsync({ itemType })
    const newData = await createCaregory(req.body)
    return res.status(200).json({
      message: 'Success Create new Category"',
      category: newData
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { itemType } = req.body

  try {
    await updateCategorySchema.validateAsync({
      itemType
    })

    const newData = await updateCaregory(
      id,
      req.body
    )
    return res.status(200).json({
      message: 'Success Update Category Data',
      category: newData
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(400).json({
        error: 'No Category found'
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
    await deleteCaregory(id)

    return res.status(200).json({
      message: 'Success Delete Category Data'
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(400).json({
        error: 'No Category found'
      })
    }
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})
module.exports = router
