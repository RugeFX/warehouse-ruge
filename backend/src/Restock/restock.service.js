const { updateProduct } = require('../Product/product.service')
const { findAll, createData, findOrFail, updateData, deleteData, findFirst } = require('./restock.repository')

const getAllRestock = async () => {
  const restock = await findAll()
  return restock
}
const getRestockById = async (id) => {
  const restock = await findOrFail({ id })
  return restock
}
const createRestock = async (payload) => {
  const date = new Date(payload.restockDate)
  payload.restockDate = date.toISOString()
  for (const key in payload.products) {
    if (Object.hasOwnProperty.call(payload.products, key)) {
      const product = payload.products[key]
      await updateProduct(parseInt(product.id), { stock: { increment: product.quantity } })
    }
  }
  const restock = await createData(payload)
  return restock
}
const updateRestock = async (id, payload) => {
  if (payload.restockDate) {
    const date = new Date(payload.restockDate)
    payload.restockDate = date.toISOString()
  }
  if (payload.products) {
    for (const key in payload.products) {
      if (Object.hasOwnProperty.call(payload.products, key)) {
        const product = payload.products[key]
        const productId = parseInt(product.id)
        // const productModel = await getProductById(productId)
        const oldQuantity = await findFirst({ productId, restockId: id }).then((result) => result?.quantity || 0)
        await updateProduct(productId, { stock: { decrement: oldQuantity } })
        await updateProduct(productId, { stock: { increment: product.quantity } })
      }
    }
  }
  const restock = await updateData(id, payload)
  return restock
}
const deleteRestock = async (id) => {
  return await deleteData(id)
}
module.exports = {
  getAllRestock,
  createRestock,
  getRestockById,
  updateRestock,
  deleteRestock
}
