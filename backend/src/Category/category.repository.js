const prisma = require('../Db')

const findAll = async () => {
  const category = await prisma.category.findMany()
  return category
}

const findOrfail = async (where) => {
  const category = await prisma.category.findUniqueOrThrow({
    where
  })
  return category
}
const createData = async (payload) => {
  const category = await prisma.category.create({
    data: payload
  })
  return category
}
const updateData = async (id, payload) => {
  const category = await prisma.category.update({
    where: {
      id
    },
    data: payload
  })
  return category
}

const deleteData = async (id) => {
  return await prisma.category.delete({
    where: {
      id
    }
  })
}
module.exports = {
  findAll,
  createData,
  findOrfail,
  updateData,
  deleteData
}
