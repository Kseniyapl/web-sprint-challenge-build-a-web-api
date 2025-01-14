
const express = require('express');
const Project = require('./projects-model');
const {
    errorHandling,
    validateId,
    validateProject
 } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next)=>{
    Project.get()
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(error=>{
        next(error)
    })
})

router.get('/:id', validateId, (req, res, next) =>{
    try{
        res.json(req.project)
    }catch(error){
        next(error)
    }
})

router.post('/', validateProject,  async(req, res, next) =>{
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error=>{
        next(error)
    })
})
router.put('/:id', validateId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
    .then(project=>{
        res.status(200).json(project)    
    })
    .catch(error=>{
        next(error)
    })
})

router.delete('/:id', validateId, (req, res, next) => {
    Project.remove(req.params.id)
    .then(() => {
        res.status(200).json(req.params.id);
      })
      .catch(error=>{
        next(error)
      })
  });

  router.get('/:id/actions', validateId, (req, res, next) =>{
      Project.getProjectActions(req.params.id)
      .then(actions => {
        if (actions.length > 0) {
            res.status(200).json(actions)
        } else {
            res.status(404).json(actions)
        }
    })
    .catch(error=>{
        next(error)
      })
  })

router.use(errorHandling);

module.exports = router;