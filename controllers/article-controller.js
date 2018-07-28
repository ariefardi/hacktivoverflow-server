const Article = require('../models/article-model.js')
const moment = require('moment')
const jwt = require('jsonwebtoken')

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
    static getByUser(req, res) {
        let query = req.params.id
        Article.find({
            user: req.params.id
        })
        .populate('user')
        .then(articles=> {
            res.json({
                message: 'get all data by user',
                articles
            })
        })
        .catch(err=> {
            res.json({
                message: err
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
            tags: req.body.tags,
            date: moment().format('LL') ,
            comments: [],
            answers: [],
            upvote: [],
            downvote: []
        }
        console.log(' ini ada di paling atas')
        let newPost = new Article(obj)
        newPost.save()
        .then(articles=> {
            res.status(200).json({
                message: 'berhasil posting article',
                articles
            })
            console.log('ini ada di save data')
        })
        .catch(err=> {
            res.json({
                message: err.message
            })
            console.log('ini ada di error data')
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
        let decoded = jwt.verify(req.headers.token, 'superfox')
        Article.findById(query)
        .then(article=> {
            if (decoded.userId==article.user._id) {
                res.json({
                    message: 'You cant upvote your question'
                })
            }
            else {
                let found = article.upvote.find(function(element){
                    console.log(element)
                    if (element==decoded.userId) {
                        return 'ada nih'
                    }
                    else {
                        return undefined
                    }      
                })
                console.log(found, ' ini found')
                console.log(decoded.userId)
                    
                    if (found) {
                        res.json({
                            message: 'anda sudah vote',
                            id: decoded.userId,
                        })
                        console.log('ada yang sama')
                    }
                    else {
                        console.log('beda')
                        article.upvote.push(decoded.userId)
                            Article.findByIdAndUpdate(query,article)
                            .then(articleUpdated=> {
                                res.json({
                                    message: 'Berhasil upvote',
                                    articleUpdated
                                })
                            })
                            .catch(err=> {
                                res.json({
                                    message: err.message
                                })
                            })
                    }
                }
        })
        .catch(err=> {
            res.json({
                message: err.message
            })
        })
    }

    static downvote (req,res) {
        let query = req.params.id
        let decoded = jwt.verify(req.headers.token, 'superfox')
        Article.findById(query)
        .then(article=> {
            if (decoded.userId==article.user._id) {
                res.json({
                    message: 'You cant downvote your question'
                })
            }
            else {
                let found = article.downvote.find(function(element){
                    console.log(element)
                    if (element==decoded.userId) {
                        return 'ada nih'
                    }
                    else {
                        return undefined
                    }      
                })
                console.log(found, ' ini found')
                console.log(decoded.userId)
                    
                    if (found) {
                        res.json({
                            message: 'anda sudah vote',
                            id: decoded.userId,
                        })
                        console.log('ada yang sama')
                    }
                    else {
                        console.log('beda')
                        article.downvote.push(decoded.userId)
                            Article.findByIdAndUpdate(query,article)
                            .then(articleUpdated=> {
                                res.json({
                                    message: 'Berhasil downvote',
                                    articleUpdated
                                })
                            })
                            .catch(err=> {
                                res.json({
                                    message: err.message
                                })
                            })
                    }
                }
        })
        .catch(err=> {
            res.json({
                message: err.message
            })
        })
        
    }
}

module.exports = Controller