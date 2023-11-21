const { firstWhereUsername, firstWhereRefreshToken, deleteToken, createUser, getMenu } = require('./auth.repository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUser = async (username, password) => {
  const user = await firstWhereUsername(username)
  if (user === null) {
    throw new Error('User not found')
  }
  const comparePassword = await bcrypt.compare(password, user.password)
  if (comparePassword === false) {
    throw new Error('Password is incorrect !')
  }
  const privilege = await getMenu(user.staff.position.id)
  return { user, privilege }
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

module.exports = {
  getUser,
  getRefreshToken,
  createToken,
  deleteRefreshToken,
  creatingUser
}
