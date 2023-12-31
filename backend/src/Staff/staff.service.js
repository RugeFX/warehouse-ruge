const { findAll, createData, findOrFail, updateData, deleteData } = require('./staff.repository')

const getAllStaff = async () => {
  const staff = await findAll()
  return staff
}
const getStaffById = async (id) => {
  const staff = await findOrFail({ id })
  return staff
}
const createStaff = async (name, registerDate, address, phone, image, positionId) => {
  const date = new Date(registerDate)
  const isoDate = date.toISOString()
  const staff = await createData(name, isoDate, address, phone, image, positionId)
  return staff
}
const updateStaff = async (id, name, registerDate, address, phone, image, positionId) => {
  const date = new Date(registerDate)
  const isoDate = date.toISOString()
  const staff = await updateData(id, name, isoDate, address, phone, image, positionId)
  return staff
}
const deleteStaff = async (id) => {
  return await deleteData(id)
}
module.exports = {
  getAllStaff,
  createStaff,
  getStaffById,
  updateStaff,
  deleteStaff
}
