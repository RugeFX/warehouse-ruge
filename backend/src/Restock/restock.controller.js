const express = require('express')
const multer = require('multer')
const jwtValidation = require('../Middleware/jwtValidation')
const {
  getAllRestock,
  createRestock,
  getRestockById,
  updateRestock,
  deleteRestock
} = require('./restock.service')
const { restockSchema, updateRestcokSchema } = require('../Validation/validation')

const router = express.Router()

router.use(multer().none())
router.use(jwtValidation)

router.get('/', async (req, res) => {
  try {
    const data = await getAllRestock()
    return res.status(200).json({
      message: 'successfully retrieved data',
      data
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
    const data = await getRestockById(id)
    return res.status(200).json({
      message: 'successfully retrieved data',
      data
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
})
router.post('/', async (req, res) => {
  const { supplierId, restockDate, totalSpend, products } = req.body

  try {
    await restockSchema.validateAsync({ supplierId, restockDate, totalSpend, products })
    const data = await createRestock(req.body)
    return res.status(200).json({
      message: 'Success Create new restock',
      restock: data
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { supplierId, restockDate, totalSpend, products } = req.body

  try {
    await updateRestcokSchema.validateAsync({ supplierId, restockDate, totalSpend, products })
    const data = await updateRestock(id, req.body)
    return res.status(200).json({
      message: 'Success Create new restock',
      restock: data
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await deleteRestock(id)

    return res.status(200).json({
      message: 'Success Delete Restock Data'
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(400).json({
        error: 'No restock found'
      })
    }
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})
module.exports = router
