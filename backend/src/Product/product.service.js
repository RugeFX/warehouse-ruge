const { findAll, createData, findOrFail, updateData, deleteData } = require('./product.repository')

const getAllProduct = async () => {
  const Product = await findAll()
  return Product
}
const getProductById = async (id) => {
  const Product = await findOrFail({ id })
  return Product
}
const createProduct = async (name, stock, netPrice, unitId, categoryId, supplierId, information, image) => {
  const Product = await createData({ name, stock, netPrice, unitId, categoryId, supplierId, information, image })
  return Product
}
const updateProduct = async (id, payload) => {
  const Product = await updateData(id, payload)
  return Product
}
const deleteProduct = async (id) => {
  return await deleteData(id)
}
module.exports = {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
}
