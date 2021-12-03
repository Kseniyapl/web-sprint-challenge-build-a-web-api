// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');
const {
    errorHandling
 } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next)=>{
    Project.get()
    .then(projects=>{
        console.log(req.query)
        res.status(200).json(projects)
    })
    .catch(error=>{
        next(error)
    })
})

router.use(errorHandling);

module.exports = router;