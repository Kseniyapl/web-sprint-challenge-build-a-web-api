const Action = require('./actions-model')


async function validateId(req, res, next){
    try {
        const { id } = req.params
        const action = await Action.get(id)
        if (action) {
            req.action = action
            next()
        } else {
            next({
                status: 404,
                message: 'action not found'
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
 validateId
  }