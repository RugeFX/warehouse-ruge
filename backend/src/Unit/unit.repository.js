const prisma = require('../Db')

const findAll = async () => {
  const unit = await prisma.unit.findMany()
  return unit
}

const findOrFail = async (where) => {
  const unit = await prisma.unit.findUniqueOrThrow({
    where
  })
  return unit
}
const createData = async (payload) => {
  const unit = await prisma.unit.create({
    data: payload
  })
  return unit
}
const updateData = async (id, payload) => {
  const unit = await prisma.unit.update({
    where: {
      id
    },
    data: payload
  })
  return unit
}

const deleteData = async (id) => {
  return await prisma.unit.delete({
    where: {
      id
    }
  })
}
module.exports = {
  findAll,
  createData,
  findOrFail,
  updateData,
  deleteData
}
