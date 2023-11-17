const prisma = require('../db')

const findAll = async () => {
  const position = await prisma.position.findMany({
    include: {
      privilege: true
    }
  })
  return position
}

const findAllMenuItem = async () => {
  const privilege = await prisma.menuItem.findMany({
    include: {
      MenuGroup: true
    }
  })
  return privilege
}

const findById = async (id) => {
  const position = await prisma.position.findUniqueOrThrow({
    where: {
      id
    },
    include: {
      Privilege: true
    }
  })
  return position
}
const createData = async (name) => {
  const position = await prisma.position.create({
    data: {
      name
    }
  })
  return position
}
const createDataPrivilege = async (privilege) => {
  return await prisma.privilege.create({
    data: privilege
  })
}
const updateData = async (id, name) => {
  const position = await prisma.position.update({
    where: {
      id
    },
    data: {
      name
    }
  })
  return position
}
const updateDataPrivilege = async (id, privilege) => {
  const position = await prisma.privilege.update({
    where: {
      id
    },
    data: privilege
  })
  return position
}

const deleteData = async (id) => {
  return await prisma.position.delete({
    where: {
      id
    }
  })
}
module.exports = {
  findAll,
  createData,
  findById,
  updateData,
  deleteData,
  findAllMenuItem,
  createDataPrivilege,
  updateDataPrivilege
}
