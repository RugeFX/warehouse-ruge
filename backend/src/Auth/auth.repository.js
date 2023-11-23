const prisma = require('../Db')
const bcrypt = require('bcrypt')

const firstWhereUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    },
    select: {
      id: true,
      username: true,
      staffId: true,
      staff: true,
      password: false
    }
  })
  return user
}
const firstWhereId = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id
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
    },
    select: {
      id: true,
      username: true,
      staffId: true,
      staff: true,
      password: false
    }
  })
  return newUser
}

const updateUser = async (id, payload) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10)
  }
  const newUser = await prisma.user.update({
    where: {
      id
    },
    data: payload,
    select: {
      id: true,
      username: true,
      staffId: true,
      staff: true,
      password: false
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
  getMenu,
  updateUser,
  firstWhereId
}
