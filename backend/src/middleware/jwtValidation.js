const jwt = require('jsonwebtoken')

const jwtValidation = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  const token = authorization.split(' ')[1]
  try {
    const jwtToken = jwt.verify(token, process.env.SECRET_SERVER)
    req.user = jwtToken
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
  next()
}
module.exports = jwtValidation
