const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = Schema({
    title: String, 
    content: String,
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    comments : [{type: Schema.Types.ObjectId, ref: 'comment'}],
    answers : [{type: Schema.Types.ObjectId, ref: 'answer'}],
    upvote : [{type: Schema.Types.ObjectId, ref: 'user'}],
    downvote : [{type: Schema.Types.ObjectId, ref: 'user'}]
}, {timestamp: true})

let articles = mongoose.model('article', articleSchema)

module.exports = articles