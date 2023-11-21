const prisma = require('../db')

const findAll = async () => {
  const staff = await prisma.staff.findMany({
    include: {
      Position: true
    }
  })
  return staff
}

const findById = async (id) => {
  const staff = await prisma.staff.findUniqueOrThrow({
    where: {
      id
    },
    include: {
      Position: true
    }
  })
  return staff
}
const createData = async (name, registerDate, address, phone, image, positionId) => {
  const staff = await prisma.staff.create({
    data: {
      name,
      registerDate,
      address,
      phone,
      // image,
      positionId
    }
  })
  return staff
}
const updateData = async (id, name, registerDate, address, phone, image, positionId) => {
  const staff = await prisma.staff.update({
    where: {
      id
    },
    data: {
      name,
      registerDate,
      address,
      phone,
      // image,
      positionId
    }
  })
  return staff
}

const deleteData = async (id) => {
  return await prisma.staff.delete({
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
