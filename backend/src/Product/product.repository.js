const prisma = require('../Db')

const findAll = async () => {
  const product = await prisma.product.findMany()
  return product
}

const findById = async (id) => {
  const product = await prisma.product.findUniqueOrThrow({
    where: {
      id
    }
  })
  return product
}
const createData = async (payload) => {
  const product = await prisma.product.create({
    data: payload
  })
  return product
}
const updateData = async (id, payload) => {
  const product = await prisma.product.update({
    where: {
      id
    },
    data: payload
  })
  return product
}

const deleteData = async (id) => {
  return await prisma.product.delete({
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
  deleteData
}
