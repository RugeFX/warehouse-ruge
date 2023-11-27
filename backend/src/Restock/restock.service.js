const { findAll, createData, findOrFail, updateData, deleteData } = require('./restock.repository')

const getAllRestock = async () => {
  const Product = await findAll()
  return Product
}
const getRestockById = async (id) => {
  const Product = await findOrFail({ id })
  return Product
}
const createRestock = async (payload) => {
  const date = new Date(payload.restockDate)
  payload.restockDate = date.toISOString()
  const Product = await createData(payload)
  return Product
}
const updateRestock = async (id, payload) => {
  if (payload.restockDate) {
    const date = new Date(payload.restockDate)
    payload.restockDate = date.toISOString()
  }
  const Product = await updateData(id, payload)
  return Product
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
