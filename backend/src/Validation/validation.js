const Joi = require('joi')
const moment = require('moment')

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.base': 'Username must a string.',
    'string.empty': 'Username is required.'
  }),
  password: Joi.string().min(5).required().messages({
    'string.base': 'Password must a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password should have atleast {#limit} character.'
  })
})
const userSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.base': 'Username must a string.',
    'string.empty': 'Username is required.'
  }),
  password: Joi.string().min(5).required().messages({
    'string.base': 'Password must a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password should have atleast {#limit} character.'
  }),
  staffId: Joi.number().required().messages({
    'number.base': 'staffId must a number.',
    'number.empty': 'staffId is required.'
  })
})

const staffSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must a string.',
    'string.empty': 'Name is required.'
  }),
  registerDate: Joi.string().custom((value, helpers) => {
    const parsedDate = moment(value, 'YYYY-MM-DD HH:mm', true)
    if (!parsedDate.isValid()) {
      return helpers.message('Invalid date format. Please use Year-Month-Date hour:minute .')
    }
  }, 'Date formatting'),
  address: Joi.string().required().messages({
    'string.base': 'Address must be a string.',
    'string.empty': 'Address is required.'
  }),
  phone: Joi.string().required().messages({
    'string.base': 'Phone must be a string.',
    'string.empty': 'Phone is required.'
  }),
  positionId: Joi.number().required().messages({
    'number.base': 'PositionId must be a number.',
    'number.empty': 'PositionId is required.'
  })
})

const positionSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must a string.',
    'string.empty': 'Name is required.'
  })
})
module.exports = {
  loginSchema,
  userSchema,
  staffSchema,
  positionSchema
}
