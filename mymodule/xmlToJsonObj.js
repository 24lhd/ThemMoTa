var xml2js = require('xml2js')
var parser = new xml2js.Parser()
module.exports = function (xml,callback) {
    parser.parseString(xml, function (err, data) {
        callback(data);
    })
}