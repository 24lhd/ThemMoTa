var xml2js = require('xml2js')
var parser = new xml2js.Parser()
module.exports = function (xml,callback) {
    try {
        parser.parseString(xml, function (err, data) {
            callback(data);
        })
    }catch(e) {
        callback();
    }

}