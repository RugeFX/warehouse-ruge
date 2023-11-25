const { findAll, createData, findOrfail, updateData, deleteData, findAllMenuItem, createDataPrivilege, updateDataPrivilege } = require('./position.repository')

const getAllPosition = async () => {
  const position = await findAll()
  return position
}
const getAllMenuItem = async () => {
  const menuItem = await findAllMenuItem()
  return menuItem
}
const getPositionById = async (id) => {
  const position = await findOrfail({ id })
  return position
}
const createPosition = async (name) => {
  const position = await createData(name)
  return position
}
const createPrivilege = async (privilege) => {
  return await createDataPrivilege(privilege)
}
const updatePosition = async (id, name) => {
  const position = await updateData(id, name)
  return position
}
const updatePrivilege = async (id, privilege) => {
  return await updateDataPrivilege(id, privilege)
}
const deletePosition = async (id) => {
  return await deleteData(id)
}
module.exports = {
  getAllPosition,
  createPosition,
  getPositionById,
  updatePosition,
  deletePosition,
  getAllMenuItem,
  createPrivilege,
  updatePrivilege
}
