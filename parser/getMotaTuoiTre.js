var listCateTuoiTre =
    [
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-tin-moi-nhat.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Trang chủ"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-chinh-tri-xa-hoi.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Chính trị - Xã hội"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-the-gioi.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Thế giới"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-phap-luat.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Pháp luật"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-kinh-te.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Kinh tế"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-song-khoe.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Sống khỏe"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-giao-duc.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Giáo dục"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-the-thao.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Thể thao"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-van-hoa-giai-tri.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Văn hóa - Giải trí"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-nhip-song-tre.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Nhịp sống trẻ"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-nhip-song-so.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Nhịp sống số"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-ban-doc.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Bạn đọc"
        },
        {
            LinkCategory: "http://tuoitre.vn/rss/tt-du-lich.rss",
            linkNew: "http://tuoitre.vn/",
            category: "Du lịch"
        },
    ]

var urlRssToJsonObj = require("../mymodule/urlRssToJsonObj");
var motangan = require('../mongo/moTa')
module.exports = function () {
    for (indexCate in listCateTuoiTre) {
        var itemCate = listCateTuoiTre[indexCate]

        function callback_urlRssToJsonObj(jsonObj,linkXML) {

            var linkCate = linkXML
            var listMoTa = jsonObj.rss.channel[0].item
            // console.log(linkCate);
            // console.log(listMoTa.length);

            for (indexMota in listMoTa) {
                var itemMota = listMoTa[indexMota]
                // console.log(itemMota);
                try {
                    var objMota = {
                        linkCategory: linkCate,
                        linkContents: itemMota.link[0],
                        title: itemMota.title[0],
                        description: itemMota.description[0].split(`</br>`)[1],
                        img: itemMota.description[0].split(`src=\"`)[1].split(`"`)[0],
                    }
                    if ( objMota.description==null)objMota.description=""
                    motangan.insertOne(objMota, {linkContents: itemMota.link[0]}, function () {
                    });
                } catch (e) {
                }

            }

        }

        urlRssToJsonObj(itemCate.LinkCategory, callback_urlRssToJsonObj)
    }
}