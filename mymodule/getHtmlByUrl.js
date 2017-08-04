var request = require('request')
module.exports = function (url/*Đường dẫn của html cần lấy*/, result/*fuction callback sau khi lấy đọc xong html từ url sẽ gọi tới*/) {
    request(url, function (error, res, htmlBody) {
        if (!error && res.statusCode == 200)
            result(htmlBody);
        else result("lỗi lấy html");

    })//request
}//module.exports