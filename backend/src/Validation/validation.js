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
const updateUserSchema = Joi.object({
  username: Joi.string().messages({
    'string.base': 'Username must a string.'
  }),
  oldPassword: Joi.string().min(5).messages({
    'string.base': 'Old Password must a string.',
    'string.min': 'Old Password should have atleast {#limit} character.'
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
  image: Joi.string().required().messages({
    'string.empty': 'image is required.'
  }),
  positionId: Joi.number().required().messages({
    'number.base': 'PositionId must be a number.',
    'number.empty': 'PositionId is required.'
  })
})

const updateStaffSchema = Joi.object({
  name: Joi.string().messages({
    'string.base': 'Name must a string.'
  }),
  registerDate: Joi.string().custom((value, helpers) => {
    const parsedDate = moment(value, 'YYYY-MM-DD HH:mm', true)
    if (!parsedDate.isValid()) {
      return helpers.message('Invalid date format. Please use Year-Month-Date hour:minute .')
    }
  }, 'Date formatting'),
  address: Joi.string().messages({
    'string.base': 'Address must be a string.'
  }),
  phone: Joi.string().messages({
    'string.base': 'Phone must be a string.'
  }),
  positionId: Joi.number().messages({
    'number.base': 'PositionId must be a number.',
    'number.empty': 'PositionId is required.'
  })
})

const supplierSchema = Joi.object({
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
  image: Joi.string().required().messages({
    'string.empty': 'image is required.'
  }),
  information: Joi.string().messages({
    'string.base': 'Information must be a string.'
  })
})
const updateSupplierSchema = Joi.object({
  name: Joi.string().messages({
    'string.base': 'Name must a string.'
  }),
  registerDate: Joi.string().custom((value, helpers) => {
    const parsedDate = moment(value, 'YYYY-MM-DD HH:mm', true)
    if (!parsedDate.isValid()) {
      return helpers.message('Invalid date format. Please use Year-Month-Date hour:minute .')
    }
  }, 'Date formatting'),
  address: Joi.string().messages({
    'string.base': 'Address must be a string.'
  }),
  phone: Joi.string().messages({
    'string.base': 'Phone must be a string.'
  }),
  information: Joi.string().messages({
    'string.base': 'Information must be a string.'
  })
})

const positionSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must a string.',
    'string.empty': 'Name is required.'
  })
})
const updatePositionSchema = Joi.object({
  name: Joi.string().messages({
    'string.base': 'Name must a string.'
  })
})

const unitSchema = Joi.object({
  unitName: Joi.string().required().messages({
    'string.base': 'unitName must a string.',
    'string.empty': 'unitName is required.'
  }),
  shortName: Joi.string().required().messages({
    'string.base': 'shortName must a string.',
    'string.empty': 'shortName is required.'
  })
})
const updateUnitSchema = Joi.object({
  unitName: Joi.string().messages({
    'string.base': 'unitName must a string.'
  }),
  shortName: Joi.string().messages({
    'string.base': 'Name must a string.'
  })
})

const categorySchema = Joi.object({
  itemType: Joi.string().required().messages({
    'string.base': 'unitName must a string.',
    'string.empty': 'unitName is required.'
  })
})
const updateCategorySchema = Joi.object({
  itemType: Joi.string().messages({
    'string.base': 'unitName must a string.'
  })
})

module.exports = {
  loginSchema,
  userSchema,
  staffSchema,
  positionSchema,
  supplierSchema,
  updateStaffSchema,
  updateSupplierSchema,
  updatePositionSchema,
  updateUserSchema,
  unitSchema,
  updateUnitSchema,
  categorySchema,
  updateCategorySchema
}
