const { findAll, createData, updateData, deleteData, findOrFail } = require('./unit.repository')

const getAllUnit = async () => {
  const unit = await findAll()
  return unit
}
const getUnitById = async (id) => {
  const unit = await findOrFail({ id })
  return unit
}
const createUnit = async (payload) => {
  const unit = await createData(payload)
  return unit
}
const updateUnit = async (id, payload) => {
  const unit = await updateData(id, payload)
  return unit
}
const deleteUnit = async (id) => {
  return await deleteData(id)
}
module.exports = {
  getAllUnit,
  createUnit,
  getUnitById,
  updateUnit,
  deleteUnit
}
