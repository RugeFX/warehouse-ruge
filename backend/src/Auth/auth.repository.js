const prisma = require('../db')

const firstWhereUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })
  return user
}
const firstWhereRefreshToken = async (token) => {
  const refreshToken = await prisma.refreshToken.findUnique({
    where: {
      token
    }
  })
  return refreshToken
}
const deleteToken = async (token) => {
  const deletedToken = await prisma.refreshToken.delete({
    where: {
      token
    }
  })
  return deletedToken
}

module.exports = {
  firstWhereUsername,
  firstWhereRefreshToken,
  deleteToken
}
