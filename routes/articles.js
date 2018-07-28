const express = require('express');
const router = express.Router();
const Controller = require('../controllers/article-controller.js')


/* GET users listing. */
router.get('/', Controller.getArticles)
router.get('/:id', Controller.getOneArticle)
router.get('/users/:id', Controller.getByUser)
router.post('/', Controller.postArticle)
router.post('/upvote/:id', Controller.upvote)
router.post('/downvote/:id', Controller.downvote)
router.put('/update/:id', Controller.updateQuestion)
router.delete('/delete/:id', Controller.delete)

module.exports = router;