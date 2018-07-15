var express = require('express');
var router = express.Router();
const Controller = require('../controllers/answer-controller.js')
/* GET users listing. */
router.get('/', Controller.getAnswer )
router.get('/:id', Controller.getOneAnswer )
router.post('/', Controller.postAnswer )

module.exports = router;