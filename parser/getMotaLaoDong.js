var listCateLaoDong =
    [

        {
            linkCategory: "http://laodong.com.vn/rss/home.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Home",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/video-161.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Video",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/thoi-su-xa-hoi-1321.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Thời sự - Xã hội",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/cong-doan-58.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Công đoàn",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/the-gioi-62.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Thế giới",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/phap-luat-65.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Pháp luật",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/phong-su-dieu-tra-72.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Phóng sự - Điều tra",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/kinh-te-63.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Kinh tế",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/van-hoa-giai-tri-1322.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Văn hóa - Giải trí",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/the-thao-60.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Thể thao",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/du-lich-108.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Du lịch",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/cong-nghe-66.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Công nghệ",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/suc-khoe-1166.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Sức khỏe",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/dien-dan-1279.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Diễn đàn",
        },


        {
            linkCategory: "http://laodong.com.vn/rss/ban-doc-75.rss",
            linkNews: " http://laodong.com.vn/",
            category: "Bạn đọc",
        },
    ]

var urlRssToJsonObj = require("../mymodule/urlRssToJsonObj")
var motangan = require('../mongo/moTa')
module.exports = function () {
    for (indexCate in listCateLaoDong) {
        var itemCate = listCateLaoDong[indexCate]

        function callback_urlRssToJsonObj(jsonObj, linkXMl) {
            try {
                var linkCate = linkXMl
                var listMoTa = jsonObj.rss.channel[0].item
                console.log(linkCate);
                // console.log(jsonObj);
                // console.log(jsonObj.rss.channel[0]);
                // console.log(listMoTa[0].title[0]);
                // console.log(listMoTa[0].link[0]);
                // console.log(listMoTa[0].description[0]);
                // console.log(listMoTa[0].description[0].split(`/></a>`)[1].split(`<div`)[0]);
                // console.log(listMoTa[0].description[0].splxit(`src="`)[1].split(`"`)[0]);
                // console.log(listMoTa[0]);
                // console.log(listMoTa[0].description[0].split(`src="`)[1].split('"')[0]);
                // console.log(jsonObj.rss.channel[0].item.length);
                for (indexMota in listMoTa) {
                    var itemMota = listMoTa[indexMota]
                    //     console.log(itemMota.description[0].split(`src=\'`)[1].split(`'`)[0]);
                    try {
                        var objMota = {
                            linkCategory: linkCate,
                            linkContents: itemMota.link[0],
                            title: itemMota.title[0],
                            description: itemMota.description[0].split(`/></a>`)[1].split(`<div`)[0],
                            img: itemMota.description[0].split(`src="`)[1].split(`"`)[0],
                        }
                        if (objMota.description == null) objMota.description = ""
                        // console.log(objMota);
                        motangan.insertOne(objMota, {linkContents: itemMota.link[0]});
                    } catch (e) {
                        console.log(e);
                    }
                }
            } catch (e) {

                console.log(e);
                console.log(jsonObj);
            }
        }

        urlRssToJsonObj(itemCate.linkCategory, callback_urlRssToJsonObj)
    }
}