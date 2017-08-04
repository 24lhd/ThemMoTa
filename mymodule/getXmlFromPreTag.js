var jsdom = require("jsdom/lib/old-api.js");
var getHtmlByUrl = require('../mymodule/getHtmlByUrl');
var xmlToJsonObj = require('../mymodule/xmlToJsonObj');

module.exports = function () {
    getHtmlByUrl("http://www.24h.com.vn/upload/rss/tintuctrongngay.rss", function (html) {
        xmlToJsonObj(html,function (json) {
            console.log(json)
        })
    })
}