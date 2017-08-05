var getMotaVnExpress = require("./parser/getMotaVnExpress");
var getMotaTuoiTre = require("./parser/getMotaTuoiTre");
var getMota24h = require("./parser/getMota24h");
var getMotaDanTri = require("./parser/getMotaDanTri");

module.exports = function () {
    console.log(`Chạy --------- ${new Date().toISOString()}`)
    require('node-schedule').scheduleJob('00 * * * *', function () {
        try {
            getMotaVnExpress();
        } catch (e) {
            console.log(`Lỗi getMotaVnExpress--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('05 * * * *', function () {
        try {
            getMotaTuoiTre();
        } catch (e) {
            console.log(`Lỗi getMotaTuoiTre--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('10 * * * *', function () {
        try {
            getMota24h();
        } catch (e) {
            console.log(`Lỗi getMota24h--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('15 * * * *', function () {
        try {
            getMotaDanTri();
        } catch (e) {
            console.log(`Lỗi getMotaDanTri--------- ${e}`)
        }
    });


    getMotaVnExpress();
    getMotaTuoiTre();
    getMotaDanTri();
    getMota24h();
}