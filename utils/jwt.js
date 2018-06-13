const jwt = require('jsonwebtoken');
const secret = 'sgs@123';


exports.generate = (email) => {

    let payload = {
        email:email
    };
    
    var token = jwt.sign(payload, secret);
    return token
};

exports.validate =function (app) {

        app.use(function (req, res, next) {

            var token = req.headers['x-access-token'];

            if (token) {
                jwt.verify(token,secret,function (err, decoded) {

                    if (err) {

                        res.status(401).json({ error:'Failed to authenticate token.'})
                } else {
                    
                        req.jwtToken = decoded;
                         next();
                    }
                });
             } else {
                    res.status(401).json({ error:'Failed to authenticate token.'})
            }
      });
};