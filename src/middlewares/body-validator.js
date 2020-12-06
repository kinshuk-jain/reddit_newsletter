const Ajv = require('ajv')
const path = require('path')
const fs = require('fs')

const ajv = new Ajv({ allErrors: true })

function bodyValidator(schema) {
  data = require(path.join(__dirname, `../../${schema}`))
  const validate = ajv.compile(data)

  return (req, res, next) => {
    var valid = validate(req.body)
    if (!valid) {
      const err = ajv.errors[0]
      return next({
        message: err.message,
        stack: err.params,
      })
    }
    return next()
  }
}

module.exports = {
  bodyValidator,
}
