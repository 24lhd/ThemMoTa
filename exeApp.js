var getMotaVnExpress = require("./parser/getMotaVnExpress");
var getMotaTuoiTre = require("./parser/getMotaTuoiTre");
var getMota24h = require("./parser/getMota24h");
var getMotaDanTri = require("./parser/getMotaDanTri");

module.exports = function () {
    require('node-schedule').scheduleJob('30 * * * *', function () {
        runGetMoTa();
    });
    require('node-schedule').scheduleJob('00 * * * *', function () {
        runGetMoTa();
    });

    function runGetMoTa() {
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
        try {
            getMota24h();
        } catch (e) {
            console.log(`Lỗi getMota24h--------- ${e}`)
        }
        try {
            getMotaDanTri();
        } catch (e) {
            console.log(`Lỗi getMotaDanTri--------- ${e}`)
        }
    }

// getXmlFromPreTag();
//     getMotaDanTri();
    // getMota24h();
}