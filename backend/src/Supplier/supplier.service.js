const { findAll, createData, findById, updateData, deleteData } = require('./supplier.repository')

const getAllSupplier = async () => {
  const supplier = await findAll()
  return supplier
}
const getSupplierById = async (id) => {
  const supplier = await findById(id)
  return supplier
}
const createSupplier = async (name, registerDate, address, phone, image, information) => {
  const date = new Date(registerDate)
  const isoDate = date.toISOString()
  const supplier = await createData(name, isoDate, address, phone, image, information)
  return supplier
}
const updateSupplier = async (id, name, registerDate, address, phone, image, information) => {
  const date = new Date(registerDate)
  const isoDate = date.toISOString()
  const supplier = await updateData(id, name, isoDate, address, phone, image, information)
  return supplier
}
const deleteSupplier = async (id) => {
  return await deleteData(id)
}
module.exports = {
  getAllSupplier,
  createSupplier,
  getSupplierById,
  updateSupplier,
  deleteSupplier
}
