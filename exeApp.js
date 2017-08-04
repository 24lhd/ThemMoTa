var getMotaVnExpress = require("./parser/getMotaVnExpress");
var getMotaTuoiTre = require("./parser/getMotaTuoiTre");

module.exports = function () {


    require('node-schedule').scheduleJob('42 * * * *', function () {
        console.log(`Chạy --------- ${new Date().toISOString()}`)
        try {
            getMotaVnExpress();
        } catch (e) {
            console.log(`Lỗi getMotaVnExpress--------- ${e}`)
        }
        try {
            getMotaTuoiTre();
        } catch (e) {
            console.log(`Lỗi getMotaTuoiTre--------- ${e}`)
        }
    });
}