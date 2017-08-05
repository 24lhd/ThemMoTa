var Mongo = require('../config/MongoConnect');
var CollName = 'MoTaNgan'

module.exports = {
    insertMany: function (content) {
        console.log(content.length);
        Mongo(function (database) {
            for (index in content) {
                database.deleteMany(content[index].linkContents, function (err, obj) {
                    if (err) throw err;


                    // console.log(obj.result.n + " document(s) deleted");
                    // db.close();
                });
                // database.collection(CollName).deleteOne(content[index].linkContents)
                console.log(content[index].linkContents);
                date = new Date();
                path = date.toISOString().split("Z")[0].split("T");
                content.pubDate = {
                    phut: path[1].split(":")[1],
                    gio: path[1].split(":")[0],
                    ngay: path[0].split("-")[2],
                    thang: path[0].split("-")[1],
                    nam: path[0].split("-")[0],
                }
            }
            database.collection(CollName).insertMany(content, function (err, res) {
                if (err) throw err;
                console.log("Number of records inserted: " + res.insertedCount);
                db.close();
            });
        })
    },
    insertOne: function (content, query) {
        Mongo(function (database) {
            database.collection(CollName).deleteMany(query, function (err, result) {
                if (err) throw err;
                var date = new Date();
                var path = date.toISOString().split("Z")[0].split("T");
                content.pubDate = {
                    phut: path[1].split(":")[1],
                    gio: path[1].split(":")[0],
                    ngay: path[0].split("-")[2],
                    thang: path[0].split("-")[1],
                    nam: path[0].split("-")[0],
                }
                console.log(JSON.stringify(content.pubDate));
                database.collection(CollName).insertOne(content, function (err, res) {
                    if (err) throw err;
                    // callback();
                    // console.log("Query chèn mô tả " + JSON.stringify(query))
                    database.close();
                });
            })
        })
    },
    findAll: function (callback) {
        Mongo(function (database) {
            database.collection(CollName).find({}).toArray(function (err, result) {
                if (err) throw err;
                callback(result);
                database.close();
            })
        })
    },
    findQuery: function (query, callback) {
        Mongo(function (database) {
            database.collection(CollName).find(query).toArray(function (err, result) {
                if (err) throw err;
                callback(result);
                database.close();
            })
        })
    },
    findQueryLimit: function (query, limit, callback) {
        Mongo(function (database) {
            database.collection(CollName).find(query).limit(limit).sort({__id: -1}).toArray(function (err, result) {
                if (err) throw err;
                callback(result);
                database.close();
            })
        })
    },
    deleteOne: function (query, callback) {
        Mongo(function (database) {
            database.collection(CollName).deleteOne(query).toArray(function (err, result) {
                if (err) throw err;
                callback(result);
                database.close();
            })
        })
    },
    deleteMany: function (query, callback) {
        Mongo(function (database) {
            database.collection(CollName).deleteMany(query).toArray(function (err, result) {
                if (err) throw err;
                callback(result);
                database.close();
            })
        })
    },
    countQuery: function (query, callback) {
        Mongo(function (database) {
            database.collection(CollName).count(query, function (err, count) {
                if (err) throw err;
                callback(count);
                database.close();
            })
        })
    },
}