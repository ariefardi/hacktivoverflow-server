const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = Schema({
    content: String,
    article: {type: Schema.Types.ObjectId, ref: 'article'},
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    upvote: [{type: Schema.Types.ObjectId, ref: 'user'}],
    downvote: [{type: Schema.Types.ObjectId, ref: 'user'}]
},{timestamp: true})

let answers = mongoose.model('answer', answerSchema)

module.exports = answers