var listCate24H = [
    {
        category: "Tin tức mới nhất",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/trangchu24h.rss"
    },
    {
        category: "Tin tức trong ngày",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/tintuctrongngay.rss",
    },
    {
        category: "Bóng đá",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/bongda.rss",
    },
    {
        category: "Euro 2016",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/euro2016.rss",
    },
    {
        category: "An ninh - Hình sự",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/anninhhinhsu.rss",

    },
    {

        category: "Thời trang",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/thoitrang.rss",
    },
    {
        category: "Thời trang Hi-tech",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/thoitranghitech.rss",


    },
    {
        category: "Tài chính – Bất động sản",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/taichinhbatdongsan.rss",
    },
    {
        category: "Ẩm thực",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/amthuc.rss",
    },
    {

        category: "Làm đẹp",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/lamdep.rss",
    },
    {
        category: "Phim",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/phim.rss",
    },
    {
        category: "Giáo dục - du học",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/giaoducduhoc.rss",
    },
    {
        category: "Bạn trẻ - Cuộc sống",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/bantrecuocsong.rss",
    },
    {
        category: "Ca nhạc - MTV",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/canhacmtv.rss",
    },
    {
        category: "Thể thao",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/thethao.rss",
    },
    {
        category: "Phi thường - kỳ quặc",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/phithuongkyquac.rss",
    },
    {
        category: "Công nghệ thông tin",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/congnghethongtin.rss",
    },
    {
        category: "Ô tô - Xe máy",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/otoxemay.rss",
    },
    {
        category: "Thị trường - Tiêu dùng",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/thitruongtieudung.rss",
    },
    {
        category: "Du lịch",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/dulich.rss",
    },
    {
        category: "Sức khỏe đời sống",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/suckhoedoisong.rss",
    },
    {
        category: "Cười 24h",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/cuoi24h.rss",
    },
    {
        category: "Thế giới",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/tintucquocte.rss",
    },
    {
        category: "Đời sống Showbiz",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/doisongshowbiz.rss",
    },
    {
        category: "Giải trí",
        linkNews: "http://www.24h.com.vn/",
        linkCategory: "http://www.24h.com.vn/upload/rss/giaitri.rss",
    },
]
var urlRssToJsonObj = require("../mymodule/urlRssToJsonObj")
var motangan = require('../mongo/moTa')
var getHtmlByUrl = require("../mymodule/getHtmlByUrl");
var xmlToJsonObj = require("../mymodule/xmlToJsonObj");
module.exports = function () {
    for (indexCate in listCate24H) {
        var itemCate = listCate24H[indexCate]

        function callback_urlRssToJsonObj(jsonObj) {
            try {
                var linkCate = jsonObj.rss.channel[0].link[0]
                var listMoTa = jsonObj.rss.channel[0].item
                console.log(listMoTa.length);
                for (indexMota in listMoTa) {
                    var itemMota = listMoTa[indexMota]
                    console.log(itemMota.description[0].split(`src=\'`)[1].split(`'`)[0]);
                    try {
                        var objMota = {
                            linkCategory: linkCate,
                            linkContents: itemMota.link[0],
                            title: itemMota.title[0],
                            description: itemMota.description[0].split(`<br />`)[1],
                            img: itemMota.description[0].split(`src=\'`)[1].split(`'`)[0],
                        }
                        console.log(objMota);
                        motangan.insertOne(objMota, {linkContents: itemMota.link[0]}, function () {
                        });
                    } catch (e) {
                        console.log(e);
                    }

                }
            } catch (e) {
            }
        }
        urlRssToJsonObj(itemCate.linkCategory, callback_urlRssToJsonObj)
    }
}