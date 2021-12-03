const express = require('express'); 
const Action = require('./actions-model');

const {
    validateId
    
 } = require('./actions-middleware');

const router = express.Router();

router.get('/', (req, res, next)=>{
    Action.get()
    .then(actions=>{
        res.status(200).json(actions)
    })
    .catch(error=>{
        next(error)
    })
})
router.get('/:id', validateId, (req, res, next) =>{
    try{
        res.json(req.action )
    }catch(error){
        next(error)
    }
})




module.exports = router;