var getMotaVnExpress = require("./parser/getMotaVnExpress");
var getMotaTuoiTre = require("./parser/getMotaTuoiTre");
var getMota24h = require("./parser/getMota24h");
var getMotaDanTri = require("./parser/getMotaDanTri");
var getMotaThanhNien = require("./parser/getMotaThanhNien");
var getMotaTienPhong = require("./parser/getMotaTienPhong");
var getMotaLaoDong = require("./parser/getMotaLaoDong");
var getMotaVietNamNet = require("./parser/getMotaVietNamNet");

module.exports = function () {

    console.log(`Bắt đầu --------- ${new Date().toISOString()}`)
    require('node-schedule').scheduleJob('00 * * * * *', function () { //--------------------1
        console.log(`Giờ là --------- ${new Date().toISOString()}`)
        switch (parseInt(new Date().getMinutes())) {
            case 0:
                try {
                    getMotaVnExpress();
                } catch (e) {
                    console.log(`Lỗi getMotaVnExpress--------- ${e}`)
                }/////////////////////////
                break;
            case 2:
                try {
                    getMotaTuoiTre();
                } catch (e) {
                    console.log(`Lỗi getMotaTuoiTre--------- ${e}`)
                }/////////////////////////
                break;
            case 4:
                try {
                    getMota24h();
                } catch (e) {
                    console.log(`Lỗi getMota24h--------- ${e}`)
                }/////////////////////////
                break;
            case 6:
                try {
                    getMotaDanTri();
                } catch (e) {
                    console.log(`Lỗi getMotaDanTri--------- ${e}`)
                }/////////////////////////
                break;
            case 8:
                try {
                    getMotaTienPhong();
                } catch (e) {
                    console.log(`Lỗi getMotaTienPhong--------- ${e}`)
                }/////////////////////////

                break;
            case 10:
                try {
                    getMotaLaoDong()
                } catch (e) {
                    console.log(`Lỗi getMotaLaoDong--------- ${e}`)
                }/////////////////////////
                break;
            case 12:
                try {
                    getMotaThanhNien()
                } catch (e) {
                    console.log(`Lỗi getMotaThanhNien--------- ${e}`)
                }/////////////////////////
                break;
            case 14:
                try {
                    getMotaVietNamNet()
                } catch (e) {
                    console.log(`Lỗi getMotaVietNamNet--------- ${e}`)
                }/////////////////////////
                break;
            case 16:

                break;

            case 18:

                break;
        }

    });


}