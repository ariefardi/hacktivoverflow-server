const Model = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
class Controller {
    static getUsers(req,res){
        console.log('masuk gak ge user') 
        Model.find()
        .then(dataUsers => {
            res.status(200).json({
                message: 'data users',
                dataUsers
            })
        })
    }
    static register(req,res){
        let username = req.body.username
        let email = req.body.email
        Model.findOne({username})
        .then(found=> {
            if (found) {
                res.status(500).json({
                    message: 'username Used'
                })
            }
            else{
                const salt = bcrypt.genSaltSync(7);
                const hash = bcrypt.hashSync(req.body.password, salt);
                let password = hash;
                Model.create({
                    username,
                    email,
                    password
                })
                .then(user=> {
                    res.status(200).json({
                        message: "successfully sign up",
                        user
                    });
                })
            }
        })
        .catch(err=> {
            console.log(err.message)
        })
    }
    static login(req,res){
        console.log(req.body)
        Model.findOne({username: req.body.username})
        .then(found =>{
            console.log(found.password,'ini found')
            if (found.length!==0) {  
                const isPassword = bcrypt.compareSync(req.body.password,found.password)
                if(isPassword){
                    console.log(isPassword,'ini mauk gka')
                    const token = jwt.sign({userId: found._id},`superfox`)
                    res.status(200).json({
                        message: `sigin succed`,
                        token,
                        found
                    })
                }
                else {
                    res.status(400).json({
                        message: `username/password salah`
                    })
                }
            }
            else {
                req.status(400).json({
                    message: `username/password salah`
                })
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(400).json({
                message: 'duh  error patrick'
            })
            console.log(err)
        })
    }
}

module.exports = Controller