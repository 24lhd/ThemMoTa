var listCateTuoiTre =
    [
        {
            linkNews: "http://vietnamnet.vn",
            category: "Trang chủ"

            , linkCategory: " http://vietnamnet.vn/rss/home.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Pháp luật"
            , linkCategory: " http://vietnamnet.vn/rss/phap-luat.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Công nghệ "
            , linkCategory: " http://vietnamnet.vn/rss/cong-nghe.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Kinh doanh "
            , linkCategory: " http://vietnamnet.vn/rss/kinh-doanh.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Giáo dục"
            , linkCategory: " http://vietnamnet.vn/rss/giao-duc.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Thời sự"
            , linkCategory: " http://vietnamnet.vn/rss/thoi-su.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Giải trí "
            , linkCategory: " http://vietnamnet.vn/rss/giai-tri.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Sức khỏe "
            , linkCategory: " http://vietnamnet.vn/rss/suc-khoe.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Thể thao "
            , linkCategory: " http://vietnamnet.vn/rss/the-thao.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Đời sống"
            , linkCategory: " http://vietnamnet.vn/rss/doi-song.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Thế giới "
            , linkCategory: " http://vietnamnet.vn/rss/the-gioi.rss"
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Bất động sản "
            , linkCategory: " http://vietnamnet.vn/rss/bat-dong-san.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Bạn đọc "
            , linkCategory: " http://vietnamnet.vn/rss/ban-doc.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Tin mới nóng "
            , linkCategory: " http://vietnamnet.vn/rss/tin-moi-nong.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Tin nổi bật "
            , linkCategory: " http://vietnamnet.vn/rss/tin-noi-bat.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Tuần Việt Nam "
            , linkCategory: " http://vietnamnet.vn/rss/tuanvietnam.rss "
        },
        {
            linkNews: "http://vietnamnet.vn",
            category: "Góc nhìn thẳng"
            , linkCategory: " http://vietnamnet.vn/rss/goc-nhin-thang.rss "
        },
    ]
var urlRssToJsonObj = require("../mymodule/urlRssToJsonObj")
var motangan = require('../mongo/moTa')
module.exports = function () {
    for (indexCate in listCateTuoiTre) {
        var itemCate = listCateTuoiTre[indexCate]
        function callback_urlRssToJsonObj(jsonObj, linkXMl) {
            try {
                var linkCate = linkXMl
                var listMoTa = jsonObj.rss.channel[0].item
                // console.log(linkCate);
                // console.log(listMoTa.length);
                // console.log(jsonObj);
                for (indexMota in listMoTa) {
                    var itemMota = listMoTa[indexMota]
                    // console.log(itemMota );
                    // console.log( itemMota.title[0]);
                    try {
                        var objMota = {
                            linkCategory: linkCate,
                            linkContents: itemMota.link[0],
                            title: itemMota.title[0],
                            description: itemMota.description[0].split("<br")[0].replace("<p>", "").replace("</p>", "").replace("&#160;", " "),
                            img: itemMota.description[0].split(`src="`)[1].split(`"`)[0].split(`?`)[0],
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