const prisma = require('../Db')

const findAll = async () => {
  const supplier = await prisma.supplier.findMany()
  return supplier
}

const findById = async (id) => {
  const supplier = await prisma.supplier.findUniqueOrThrow({
    where: {
      id
    }
  })
  return supplier
}
const createData = async (name, registerDate, address, phone, image, information) => {
  const supplier = await prisma.supplier.create({
    data: {
      name,
      registerDate,
      address,
      phone,
      image,
      information
    }
  })
  return supplier
}
const updateData = async (id, name, registerDate, address, phone, image, information) => {
  const supplier = await prisma.supplier.update({
    where: {
      id
    },
    data: {
      name,
      registerDate,
      address,
      phone,
      image,
      information
    }
  })
  return supplier
}

const deleteData = async (id) => {
  return await prisma.supplier.delete({
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
