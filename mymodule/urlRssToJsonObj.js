var getHtmlByUrl = require("../mymodule/getHtmlByUrl");
var xmlToJsonObj = require("../mymodule/xmlToJsonObj");
module.exports = function (urlXML, callback) {
    function callback_xmlToJsonObj(json) {
        callback(json);
    }

    function callBack_getHtmlByUrl(html) {
        xmlToJsonObj(html, callback_xmlToJsonObj);
    }

    getHtmlByUrl(urlXML, callBack_getHtmlByUrl)

}