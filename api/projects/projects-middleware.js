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
function validateProject(req, res, next){
    const { name, description, completed } =req.body
    if (!name || !name.trim()) {
        next({ status: 422, message: 'I need a name!' });
    }
    else if(!description||!description.trim()){
        next({ status: 422, message: 'I need a description!' });
    }else if(!completed||!completed.trim()){
        next({ status: 422, message: 'I need a completed!' });

    } else {
        req.name = name;
        req.description = description;
        req.completed = completed;
        next();
      }
    }

  module.exports = {
    errorHandling, validateId, validateProject
  }