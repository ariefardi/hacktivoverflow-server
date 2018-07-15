const Model = require('../models/article-model.js')
const moment = require('moment')

class Controller {
    static getArticles(req,res){
        Model.find()
        .then(articles=> {
            res.status(200).json({
                message: 'get articles',
                articles
            })
        })
    }
    static getOneArticle(req,res){
        let query = req.params.id
        Model.findById(query)
        .then(article=> {
            res.status(200).json({
                message: 'get one article',
                article
            })
        })
    }
    static postArticle(req,res){
        let obj = {
            title: req.body.title,
            content: req.body.content,
            user: req.body.user,
            comments: [],
            answers: [],
            upvote: [],
            downvote: []
        }
        let newPost = new Model(obj)
        newPost.save()
        .then(articles=> {
            res.status(200).json({
                message: 'berhasil posting article',
                articles
            })
        })
    }
    static delete(req,res){
        Model.findByIdAndRemove({
            _id: req.params.id
        })
        .then(()=>{
            res.status(200).json({
                message: 'Waduh kedelete patrick'
            })
        })
    }
}

module.exports = Controller