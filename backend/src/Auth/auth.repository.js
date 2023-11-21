const prisma = require('../Db')
const bcrypt = require('bcrypt')

const firstWhereUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    },
    include: {
      staff: {
        include: {
          position: true
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

const getMenu = async (positionId) => {
  console.log(positionId)
  const menus = await prisma.menuGroup.findMany({
    include: {
      menuItem: {
        include: {
          privilege: {
            where: {
              positionId,
              view: 1
            }
          }
        }
      }
    }
  })
  return menus
}

module.exports = {
  firstWhereUsername,
  firstWhereRefreshToken,
  deleteToken,
  createUser,
  getMenu
}
