const Project = require('../projects/projects-model')

function errorHandling(err, req, res, next) { // eslint-disable-line
    res.status(err.status || 500).json({
      message: `Horror in the router: ${err.message}`,
      stack: err.stack,
    });
  }

 async function validateId(req, res, next){
    try {
        const { id } = req.params
        const project = await Project.get(id)
        if (project) {
            req.project = project
            next()
        } else {
            next({
                status: 404,
                message: 'project not found'
            })
        }
    } catch (error) {
        next(error)
    }
}

  module.exports = {
    errorHandling, validateId
  }