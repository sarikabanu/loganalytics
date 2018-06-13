const mongoose = require('mongoose');
const User = require('../models/user.js')
const jwt = require('../utils/jwt')


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
                        email: req.body.email,
                        token: jwtToken
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
            .then(result3 => {

                if (result3.length != 0) {
                    res.status(200).json({ message: 'logged in successfully', content: result3[0].token })
                }
                else {
                    res.status(200).json({ message: 'please enter proper credential', content: '' })
                }
            })


            .catch(err => {
                res.send(err)
            })
    }

}
module.exports = new userServices()
