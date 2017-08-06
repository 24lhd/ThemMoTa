var MongoClient = require('mongodb').MongoClient;
var connectionString = "mongodb://24duong:Haiduong24@ds161069.mlab.com:61069/bao";
// var connectionString = "mongodb://localhost:27017/news"
module.exports = function (callbackMongo) {
    MongoClient.connect(connectionString, function (err, db) {
        if (err)
            return;
        callbackMongo(db);
    });

}