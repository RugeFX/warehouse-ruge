const prisma = require('../Db')

const findAll = async () => {
  const restock = await prisma.restock.findMany()
  return restock
}

const findOrFail = async (where) => {
  const restock = await prisma.restock.findUniqueOrThrow({
    where
  })
  return restock
}
const createData = async (payload) => {
  const { supplierId, restockDate, totalSpend, products } = payload
  const restock = await prisma.restock.create({
    data: {
      supplierId,
      restockDate,
      totalSpend,
      products: {
        create: products.map((p) => ({
          quantity: p.quantity,
          product: {
            connect: {
              id: p.id
            }
          }
        }))
      }
    }
  })
  return restock
}
const updateData = async (id, payload) => {
  const { supplierId, restockDate, totalSpend, products } = payload
  const restock = await prisma.restock.update({
    where: {
      id
    },
    data: {
      supplierId,
      restockDate,
      totalSpend,
      products: products && {
        update: products.map((p) => ({
          where: {
            productId_restockId: {
              productId: p.id,
              restockId: id
            }
          },
          data: {
            quantity: p.quantity,
            product: {
              connect: {
                id: p.id
              }
            }
          }
        }))
      }
    }
  })
  return restock
}

const deleteData = async (id) => {
  return await prisma.restock.delete({
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
