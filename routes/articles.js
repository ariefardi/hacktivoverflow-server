const express = require('express');
const router = express.Router();
const Controller = require('../controllers/article-controller.js')


/* GET users listing. */
router.get('/', Controller.getArticles)
router.get('/:id', Controller.getOneArticle)
router.post('/', Controller.postArticle)
router.delete('/delete/:id', Controller.delete)

module.exports = router;