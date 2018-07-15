const Answer = require('../models/answer-model.js')
const Article = require('../models/article-model.js')
const moment = require('moment')

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
        let obj = {
            content: req.body.content,
            article: req.body.article,
            user: req.body.user,
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
}

module.exports = Controller