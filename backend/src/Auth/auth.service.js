const { firstWhereRefreshToken, deleteToken, createUser, getMenu, updateUser, firstWhere } = require('./auth.repository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUser = async (username, password) => {
  const user = await firstWhere({ username }, true)
  if (user === null) {
    throw new Error('User not found')
  }
  const comparePassword = await bcrypt.compare(password, user.password)
  if (comparePassword === false) {
    throw new Error('Password is incorrect !')
  }
  const privilege = await getMenu(user.staff.positionId)
  return { user, privilege }
}

const getUserId = async (id) => {
  const user = await firstWhere({ id }, false)
  if (user === null) {
    throw new Error('User not found')
  }
  return user
}

const getRefreshToken = async (refreshToken) => {
  const Token = await firstWhereRefreshToken(refreshToken)
  if (!Token) {
    throw new Error('Invalid Token')
  }
}

const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_SERVER, { expiresIn: '15s' })
}

const deleteRefreshToken = async (refreshToken) => {
  await deleteToken(refreshToken)
}

const creatingUser = async (username, password, staffId) => {
  return await createUser(username, password, staffId)
}

const updatingUser = async (id, payload) => {
  const user = await firstWhere({ id }, true)
  if (payload.oldPassword) {
    const comparePassword = await bcrypt.compare(payload.oldPassword, user.password)
    if (!comparePassword) {
      throw new Error('Password is incorrect !')
    }
  }
  const newUser = await updateUser(id, { username: payload.username, password: payload.newPassword })
  return newUser
}

module.exports = {
  getUser,
  getRefreshToken,
  createToken,
  deleteRefreshToken,
  creatingUser,
  updatingUser,
  getUserId
}
