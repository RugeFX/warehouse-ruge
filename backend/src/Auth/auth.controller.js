const express = require('express')
const multer = require('multer')
const { loginSchema, userSchema, updateUserSchema } = require('../Validation/validation')
const {
  getUser,
  getRefreshToken,
  createToken,
  deleteRefreshToken,
  creatingUser,
  updatingUser,
  getUserId
} = require('./auth.service')
const jwt = require('jsonwebtoken')
const prisma = require('../Db')
const jwtValidation = require('../Middleware/jwtValidation')

const router = express.Router()

router.use(multer().none())

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    await loginSchema.validateAsync({ username, password })
    const user = await getUser(username, password)
    const payload = {
      id: user.user.id,
      username: user.username,
      staffId: user.staffId,
      positionId: user.user.staff.positionId
    }
    const token = createToken(payload)
    const refreshtoken = jwt.sign(payload, process.env.SECRET_SERVER, { expiresIn: '7d' })

    const expireAt = new Date(Date.now() + 7)
    expireAt.setDate(expireAt.getDate() + 7)

    await prisma.refreshToken.create({
      data: {
        token: refreshtoken,
        expireAt
      }
    })
    res.json({
      message: 'Login successful',
      token,
      refreshtoken
    })
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.get('/me', jwtValidation, async (req, res) => {
  try {
    const { id } = req.user
    const user = await getUserId(id)
    return res.status(200).json({
      message: 'successfully retrieved data',
      userInfo: user
    })
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.post('/token', async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({
        message: 'No Token Provided'
      })
    }
    await getRefreshToken(refreshToken)

    const decode = jwt.verify(refreshToken, process.env.SECRET_SERVER)
    const { id, username, staffId } = decode
    const token = createToken({ id, username, staffId })

    return res.status(200).json({
      message: 'Success',
      token
    })
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.delete('/logout', jwtValidation, async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({
        message: 'No Token Provided'
      })
    }
    await deleteRefreshToken(refreshToken)

    return res.status(200).json({
      message: 'Successfully Logout'
    })
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.post('/register', jwtValidation, async (req, res) => {
  try {
    const { username, password, staffId } = req.body
    await userSchema.validateAsync({ username, password, staffId })
    const newUser = await creatingUser(username, password, staffId)

    return res.status(200).json({
      message: 'successful create new user',
      user: newUser
    })
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('staffId')) {
      return res.status(400).json({
        error: 'staff already have user account'
      })
    }
    if (error.code === 'P2002' && error.meta.target.includes('username')) {
      return res.status(400).json({
        error: 'username already exists'
      })
    }
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

router.put('/:id', jwtValidation, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { username, oldPassword } = req.body
    await updateUserSchema.validateAsync({ username, oldPassword })
    const newUser = await updatingUser(id, req.body)

    return res.status(200).json({
      message: 'successful update new user',
      user: newUser
    })
  } catch (error) {
    console.log(error)
    if (error.code === 'P2002' && error.meta.target.includes('staffId')) {
      return res.status(400).json({
        error: 'staff already have user account'
      })
    }
    if (error.code === 'P2002' && error.meta.target.includes('username')) {
      return res.status(400).json({
        error: 'username already exists'
      })
    }
    return res.status(400).json({
      error: error.message || 'Unexpected error'
    })
  }
})

module.exports = router
