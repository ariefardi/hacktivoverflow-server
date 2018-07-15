const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = Schema({
    username: String,
    email: String,
    password: String,
},{timestamp: true})

let users = mongoose.model('user',userSchema)

module.exports = users