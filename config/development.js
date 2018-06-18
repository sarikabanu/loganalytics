 var user = 'Vinay'
  var password = 'Shrigowri@123'


module.exports = {
    

    database: {
        //uri: process.env.MONGOLAB_URI || 'mongodb://localhost/jetlogdb'  // 'mongodb://localhost/{dbname}'
        uri:'mongodb://preritha:shrigowri@cluster0-shard-00-00-6phy0.mongodb.net:27017,cluster0-shard-00-01-6phy0.mongodb.net:27017,cluster0-shard-00-02-6phy0.mongodb.net:27017/dbEvents?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
        //uri:'mongodb://${encodeURIComponent(user)}:${encodeURIComponent(password)}@cluster0-shard-00-01-nlbiz.mongodb.net:27071/admin'

    }
}