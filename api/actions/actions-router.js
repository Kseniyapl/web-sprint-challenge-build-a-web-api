const express = require('express'); 
const Action = require('./actions-model');

const {
    validateId,
    validateAction
    
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
router.post("/", validateAction, (req, res, next) => {
    Action.insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(next);
  });

router.put("/:id", validateId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(next);
  });

  router.delete('/:id', validateId, (req, res, next) => {
    Action.remove(req.params.id)
    .then(() => {
        res.status(200).json(req.params.id);
      })
      .catch(error=>{
        next(error)
      })
  });

module.exports = router;