const express = require('express')
const multer = require('multer')
// const jwt = require('jsonwebtoken')
const jwtValidation = require('../Middleware/jwtValidation')
const {
  getAllUnit,
  createUnit,
  getUnitById,
  updateUnit,
  deleteUnit
} = require('./unit.service')
const { unitSchema, updateUnitSchema } = require('../Validation/validation')

const router = express.Router()

router.use(multer().none())
router.use(jwtValidation)

router.get('/', async (req, res) => {
  try {
    const staff = await getAllUnit()
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
    const staff = await getUnitById(id)
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
  const { unitName, shortName } = req.body

  try {
    await unitSchema.validateAsync({ unitName, shortName })
    const newData = await createUnit(req.body)
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
  const { unitName, shortName } = req.body

  try {
    await updateUnitSchema.validateAsync({
      unitName,
      shortName
    })

    const newData = await updateUnit(
      id,
      req.body
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
    await deleteUnit(id)

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
