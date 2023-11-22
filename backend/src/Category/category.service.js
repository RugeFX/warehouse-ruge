const { findAll, createData, findById, updateData, deleteData } = require('./category.repository')

const getAllCaregory = async () => {
  const category = await findAll()
  return category
}
const getCaregoryById = async (id) => {
  const category = await findById(id)
  return category
}
const createCaregory = async (payload) => {
  const category = await createData(payload)
  return category
}
const updateCaregory = async (id, payload) => {
  const category = await updateData(id, payload)
  return category
}
const deleteCaregory = async (id) => {
  return await deleteData(id)
}
module.exports = {
  getAllCaregory,
  createCaregory,
  getCaregoryById,
  updateCaregory,
  deleteCaregory
}
