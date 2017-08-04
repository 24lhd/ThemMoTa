var listCateVnExpress = [
    {
        linknew: 'http://vnexpress.net/',
        name: 'Tin mới nhất',
        link: 'http://vnexpress.net/rss/tin-moi-nhat.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Thời sự',
        link: 'http://vnexpress.net/rss/thoi-su.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Kinh Doanh',
        link: 'http://vnexpress.net/rss/kinh-doanh.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Startup',
        link: 'http://vnexpress.net/rss/startup.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Giải trí',
        link: 'http://vnexpress.net/rss/giai-tri.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Thể thao',
        link: 'http://vnexpress.net/rss/the-thao.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Pháp luật',
        link: 'http://vnexpress.net/rss/phap-luat.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Giáo dục',
        link: 'http://vnexpress.net/rss/giao-duc.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Sức khỏe',
        link: 'http://vnexpress.net/rss/suc-khoe.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Gia đình',
        link: 'http://vnexpress.net/rss/gia-dinh.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Du lịch',
        link: 'http://vnexpress.net/rss/du-lich.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Khoa học',
        link: 'http://vnexpress.net/rss/khoa-hoc.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Số hóa',
        link: 'http://vnexpress.net/rss/so-hoa.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Cộng đồng',
        link: 'http://vnexpress.net/rss/cong-dong.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Xe',
        link: 'http://vnexpress.net/rss/oto-xe-may.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Tâm sự',
        link: 'http://vnexpress.net/rss/tam-su.rss'
    },
    {
        linknew: 'http://vnexpress.net/',
        name: 'Cười',
        link: 'http://vnexpress.net/rss/cuoi.rss'
    },]
var urlRssToJsonObj = require("../mymodule/urlRssToJsonObj");
var motangan = require('../mongo/moTa')
module.exports = function () {
    for (indexCate in listCateVnExpress) {
        var itemCate = listCateVnExpress[indexCate]

        function callback_urlRssToJsonObj(jsonObj) {

            var linkCate = jsonObj.rss.channel[0].link[0]
            var listMoTa = jsonObj.rss.channel[0].item
            // console.log(linkCate);

            for (indexMota in listMoTa) {
                var itemMota = listMoTa[indexMota]
                try {
                    var objMota = {
                        linkCategory: linkCate,
                        linkContents: itemMota.link[0],
                        title: itemMota.title[0],
                        description: itemMota.description[0].split(`</br>`)[1],
                        img: itemMota.description[0].split(`src=\"`)[1].split(`"`)[0],
                    }
                    motangan.insertOne(objMota, {linkContents: itemMota.link[0]}, function () {
                    });
                } catch (e) {
                }

            }

        }

        urlRssToJsonObj(itemCate.link, callback_urlRssToJsonObj)
    }
}