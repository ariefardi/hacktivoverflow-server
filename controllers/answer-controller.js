const Answer = require('../models/answer-model.js')
const Article = require('../models/article-model.js')
const moment = require('moment')
const jwt = require('jsonwebtoken')

class Controller {
    static getAnswer(req,res){
        Answer.find()
        .populate('article')
        .populate('user')
        .populate('comment')
        .populate('upvote')
        .populate('downvote')
        .exec((err, answers)=> {
            if (err) {
                res.json(err.message)
            }
            res.status(200).json({
                message: 'Get answer',
                answers
            })
        })
    }
    static getOneAnswer(req,res){
        let query = req.param.id
        Answer.findById(query)
        .populate('article')
        .populate('user')
        .populate('comments')
        .populate('upvote')
        .populate('downvote')
        .exec((err, answer)=> {
            res.status(200).json({
                message: 'get One Answer',
                answer
            })
        })
    }
    static postAnswer(req,res){
        let decoded = jwt.verify(req.headers.token, 'superfox')
        let obj = {
            content: req.body.content,
            article: req.body.article,
            user: decoded.userId,
            date: moment().format('LL'),
            comments: [],
            upvote: [],
            downvote: []
        }
        console.log(obj)
        let newAnswer = new Answer(obj)
        newAnswer.save()
        .then(answer=> {
           console.log(answer, ' ini answer post')
            let query = answer.article
            Article.findById(query)
            .then(article=> {
                article.answers.push(answer)
                Article.findByIdAndUpdate(query,article)
                .then(article=>{
                    res.json({
                        message: 'post berhasil',
                        article,
                        answer
                    })
                })
            })
        })
    }
    static upvote (req,res) {
        let query = req.params.id
        let user = req.body.user
        Answer.findById(query)
        .then(answer=> {
            answer.upvote.push(user)
            Answer.findByIdAndUpdate(query,answer)
            .then(answerUpdated=> {
                res.json({
                    message: 'Berhasil upvote',
                    answerUpdated
                })
            })
        })
    }

    static downvote (req,res) {
        let query = req.params.id
        let user = req.body.user
        Answer.findById(query)
        .then(answer=> {
            answer.downvote.push(user)
            Answer.findByIdAndUpdate(query,article)
            .then(answerUpdated=> {
                res.json({
                    message: 'Berhasil downvote',
                    answerUpdated
                })
            })
        })
    }
}

module.exports = Controller