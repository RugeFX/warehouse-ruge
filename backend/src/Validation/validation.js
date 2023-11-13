const Joi = require('joi')

const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.base': 'Username harus berupa teks.',
        'string.empty': 'Username tidak boleh kosong.',
      }),
    password: Joi.string().min(5).required().messages({
        'string.base': 'Password harus berupa teks.',
        'string.empty': 'Password tidak boleh kosong.',
        'string.min': 'Password harus memiliki setidaknya {#limit} karakter.',
      }),
})

module.exports = {
    loginSchema,
}