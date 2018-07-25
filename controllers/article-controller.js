const Article = require('../models/article-model.js')
const moment = require('moment')

class Controller {
    
    static getArticles(req,res){
        Article.find()
        .populate('user')
        .populate('answers')
        .populate('comment')
        .populate('upvote')
        .populate('downvote')
        .exec((err, articles)=> {
            res.status(200).json({
                message: 'get articles',
                articles
            })
        })
    }

    static getOneArticle(req,res){
        let query = req.params.id
        Article.findById(query)
        .populate('user')
        .populate('answers')
        .populate('comment')
        .populate('upvote')
        .populate('downvote')
        .then(article=> {
            res.status(200).json({
                message: 'get one article',
                article
            })
        })
    }
    static postArticle(req,res){
        let decoded = jwt.verify(req.headers.token, 'superfox')
        let obj = {
            title: req.body.title,
            content: req.body.content,
            user: decoded.userId,
            comments: [],
            answers: [],
            upvote: [],
            downvote: []
        }
        let newPost = new Article(obj)
        newPost.save()
        .then(articles=> {
            res.status(200).json({
                message: 'berhasil posting article',
                articles
            })
        })
    }
    static delete(req,res){
        Article.findByIdAndRemove({
            _id: req.params.id
        })
        .then(()=>{
            res.status(200).json({
                message: 'Waduh kedelete patrick'
            })
        })
    }

    static upvote (req,res) {
        let query = req.params.id
        let user = req.body.user
        Article.findById(query)
        .then(article=> {
            article.upvote.push(user)
            Article.findByIdAndUpdate(query,article)
            .then(articleUpdated=> {
                res.json({
                    message: 'Berhasil upvote',
                    articleUpdated
                })
            })
        })
    }

    static downvote (req,res) {
        let query = req.params.id
        let user = req.body.user
        Article.findById(query)
        .then(article=> {
            article.downvote.push(user)
            Article.findByIdAndUpdate(query,article)
            .then(articleUpdated=> {
                res.json({
                    message: 'Berhasil downvote',
                    articleUpdated
                })
            })
        })
    }
}

module.exports = Controller