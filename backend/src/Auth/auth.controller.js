const express = require('express')
const multer = require('multer')
const { loginSchema, userSchema } = require('../Validation/validation')
const { getUser, getRefreshToken, createToken, deleteRefreshToken, creatingUser } = require('./auth.service')
const jwt = require('jsonwebtoken')
const prisma = require('../db')
const jwtValidation = require('../middleware/jwtValidation')

const router = express.Router()

router.use(multer().none())

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    await loginSchema.validateAsync({ username, password })
    const user = await getUser(username, password)
    const payload = {
      id: user.id,
      username: user.username,
      staffId: user.staffId,
      positionId: user.Staff.Position.id
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
      user,
      token,
      refreshtoken
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
    console.log(error)
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
      message: 'Success'
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

module.exports = router
