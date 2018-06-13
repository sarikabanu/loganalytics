const express = require('express');
const bodyparser = require('body-parser');
const http = require('http')
const mongoose = require('mongoose');
const mongoload = require('mongoload');
const config = require('config')
const app = express();
const server = http.Server(app)
var jwt = require('./utils/jwt')

const login = require('./routes/login.js')
const user = require('./routes/user.js')
const project = require('./routes/projects.js')

mongoose.connect(config.database.uri);

// if (process.env.NODE_ENV !== 'production') {
//   mongoose.set('debug', true);
// }


let db = mongoose.connection;



db.on('error', function () {
    console.log('error', 'Connection to db failed!');
    process.exit(0);
});

db.on('connected', function callback() {
    console.log('info', 'Connected to db...');
});

db.on('disconnected', function (err) {
    console.log('error', 'Connection treminated to db');
    process.exit(0);
});



app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb' }));
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'access-control-allow-methods,access-control-allow-origin,x-access-token,content-type,Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});

app.use('/login',login)
app.use('/user',user)
jwt.validate(app);
app.use('/project',project)



server.listen(process.env.PORT || 5000, function () {
    console.log('server listening on port ' + server.address().port);
});