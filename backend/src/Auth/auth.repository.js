const prisma = require('../db')
const bcrypt = require('bcrypt')

const firstWhereUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    },
    include: {
      Staff: {
        include: {
          Position: {
            include: {
              Privilege: true
            }
          }
        }
      }
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

const createUser = async (username, password, staffId) => {
  password = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      staffId
    }
  })
  return newUser
}

module.exports = {
  firstWhereUsername,
  firstWhereRefreshToken,
  deleteToken,
  createUser
}
