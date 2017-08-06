var getMotaVnExpress = require("./parser/getMotaVnExpress");
var getMotaTuoiTre = require("./parser/getMotaTuoiTre");
var getMota24h = require("./parser/getMota24h");
var getMotaDanTri = require("./parser/getMotaDanTri");
var getMotaThanhNien = require("./parser/getMotaThanhNien");
var getMotaTienPhong = require("./parser/getMotaTienPhong");
var getMotaLaoDong = require("./parser/getMotaLaoDong");
var getMotaVietNamNet = require("./parser/getMotaVietNamNet");

module.exports = function () {

    console.log(`Chạy --------- ${new Date().toISOString()}`)
    require('node-schedule').scheduleJob('00 * * * * *', function () {
        console.log(`Chạy --------- ${new Date().toISOString()}`)
    });

    require('node-schedule').scheduleJob('00 * * * *', function () { //--------------------1
        try {
            getMotaVnExpress();
        } catch (e) {
            console.log(`Lỗi getMotaVnExpress--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('05 * * * *', function () { //--------------------2
        try {
            getMotaTuoiTre();
        } catch (e) {
            console.log(`Lỗi getMotaTuoiTre--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('10 * * * *', function () {//--------------------3
        try {
            getMota24h();
        } catch (e) {
            console.log(`Lỗi getMota24h--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('15 * * * *', function () {//--------------------4
        try {
            getMotaDanTri();
        } catch (e) {
            console.log(`Lỗi getMotaDanTri--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('20 * * * *', function () {//--------------------5
        try {
            getMotaTienPhong();
        } catch (e) {
            console.log(`Lỗi getMotaTienPhong--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('25 * * * *', function () {//--------------------6
        try {
            getMotaLaoDong()
        } catch (e) {
            console.log(`Lỗi getMotaLaoDong--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('30 * * * *', function () {//--------------------6
        try {
            getMotaThanhNien()
        } catch (e) {
            console.log(`Lỗi getMotaThanhNien--------- ${e}`)
        }
    });
    require('node-schedule').scheduleJob('30 * * * *', function () {//--------------------6
        try {
            getMotaVietNamNet()
        } catch (e) {
            console.log(`Lỗi getMotaVietNamNet--------- ${e}`)
        }
    });


}