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

function validateAction(req, res, next){
    const { project_id, description, notes } =req.body
    if (!project_id ) {
        next({ status: 400, message: 'I need a project ID!' });
    }
    else if(!description||!description.trim()){
        next({ status: 400, message: 'I need a description!' });
    }else if(!notes || !notes.trim()){
        next({ status: 400, message: 'I need a notes!' });

    } else {
        next()
        
      }
    }
module.exports = {
 validateId,
 validateAction
  }