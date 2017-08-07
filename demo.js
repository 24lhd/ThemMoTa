var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname + '/public/sql22.sqlite');

module.exports = function () {
    db.serialize(function () {
        db.run("CREATE TABLE IF Not Exists lorem (info TEXT,name TEXT)");
//chèn vào cơ sở dữ liệu
        var stmt = db.prepare("INSERT INTO lorem VALUES (?,?)");
        for (var i = 0; i < 10; i++) {
            stmt.run(["Ipsum " + i+",Duong","Ipsum " + i+",Duong2"]);
        }
        stmt.finalize();
        // lấy ra
        // db.each("SELECT rowid AS id ,info FROM lorem", function (err, row) {
        //     console.log(row.id + ": " + row.info);
        // });
    });

    db.close();
}