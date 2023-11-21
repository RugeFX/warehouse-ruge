const express = require('express')
const multer = require('multer')
// const jwt = require('jsonwebtoken')
const jwtValidation = require('../Middleware/jwtValidation')
const {
  getAllPosition,
  createPosition,
  getPositionById,
  updatePosition,
  deletePosition,
  createPrivilege,
  getAllMenuItem,
  updatePrivilege
} = require('./position.service')
const { positionSchema } = require('../Validation/validation')

const router = express.Router()

router.use(multer().none())
router.use(jwtValidation)

router.get('/', async (req, res) => {
  try {
    const staff = await getAllPosition()
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
    const staff = await getPositionById(id)
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
  try {
    const { name, menu } = req.body

    await positionSchema.validateAsync({ name })
    // Create position
    const newPosition = await createPosition(name)

    // Get all menu items
    const menuItems = await getAllMenuItem()

    // Loop through menu items to create privileges
    for (const menuItem of menuItems) {
      const privilege = {
        positionId: newPosition.id,
        menuItemId: menuItem.id,
        view: 0,
        add: 0,
        edit: 0,
        delete: 0
      }

      if (menu && menu[menuItem.id]) {
        const menuItemData = menu[menuItem.id]

        privilege.view = menuItemData.view ? 1 : 0
        privilege.add = menuItemData.add ? 1 : 0
        privilege.edit = menuItemData.edit ? 1 : 0
        privilege.delete = menuItemData.delete ? 1 : 0
      }

      // Create privilege for the new role
      await createPrivilege(privilege)
    }

    return res.status(200).json({
      message: 'Data successfully created',
      data: newPosition
    })
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('name')) {
      return res.status(400).json({ error: 'This Position Name already exists' })
    }
    console.error(error)
    return res.status(400).json({ error: error.message || 'Unexpected error' })
  }
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { name, menu } = req.body
  try {
    await positionSchema.validateAsync({ name })
    const position = await getPositionById(id)
    if (position) {
      for (const menuItem of position.Privilege) {
        const privilege = {
          view: 0,
          add: 0,
          edit: 0,
          delete: 0
        }
        if (menu && menu[menuItem.id]) {
          const menuItemData = menu[menuItem.id]
          privilege.view = menuItemData.view ? 1 : 0
          privilege.add = menuItemData.add ? 1 : 0
          privilege.edit = menuItemData.edit ? 1 : 0
          privilege.delete = menuItemData.delete ? 1 : 0
        }
        // Create privilege for the new role
        await updatePrivilege(menuItem.id, privilege)
      }
      const newData = await updatePosition(id, name)
      return res.status(200).json({
        message: 'Success Update Staff Data',
        staff: newData
      })
    }
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
    await deletePosition(id)

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
