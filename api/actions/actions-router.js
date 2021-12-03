const Action = require('../actions/actions-model')
const express = require('express');


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

module.exports = router;