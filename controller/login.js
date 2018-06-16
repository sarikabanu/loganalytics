const mongoose = require('mongoose');
const jwt = require('../utils/jwt')
const User = require('../models/user.js')
const Project = require('../models/projects.js')




function userServices() {


    this.userSignUp = function (req, res) {

        User.find({ email: req.body.email })
            .exec()
            .then(result => {
                if (result.length != 0) {
                    res.status(200).json({ message: 'user already registered', content: '' })
                }
                else {
                    var jwtToken = jwt.generate(req.body.email)
                    var item = {
                        name: req.body.name,
                        company: req.body.company,
                        mobile: req.body.mobile,
                        email: req.body.email,
                        address: req.body.address,
                        password: req.body.password,
                        token: jwtToken,
                        uidentity: '',
                    }
                    const user = new User(item);
                    user.save()
                        .then(result => {
                            res.status(200).json({ message: 'user registered successfully', content: '' })
                        })

                }

            })
            .catch(err => {
                res.send(err)
            })
    }



    this.userSignIn = function (req, res) {

        User.find({ password: req.body.password, email: req.body.email })
            .exec()
            .then(result => {
                if (result.length != 0) {
                    var resData={
                        id:result[0]._id,
                        token:result[0].token
                    }
                    return resData
                    // res.status(200).json({ message: 'logged in successfully', content: result3[0].token })
                }
                else {
                    res.status(200).json({ message: 'please enter proper credential', content: '' })
                }
            })
            .then(result2 => {
                Project.find({ uid: result2.id })
                    .exec()
                    .then(result3 => {
                        res.status(200).json({ message: 'logged in successfully',content:{jwtToken:result2.token,projects:result3 } })
                    })

                    .catch(err => {
                        console.log(err)
                       res.status(200).json({ message: 'error', content: err })
                    })
            })
    }

}
    module.exports = new userServices()
