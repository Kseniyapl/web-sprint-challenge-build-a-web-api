// Write your "projects" router here!
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
     try {
         const projectInfo = { 
        ...req.body, 
        name: req.name,  
        description: req.description, 
        completed: req.completed
    };
        const newProject = await Project.insert(projectInfo);
        res.status(201).json(newProject);
      } catch (error) {
        next(error);
      }
    });

router.use(errorHandling);

module.exports = router;