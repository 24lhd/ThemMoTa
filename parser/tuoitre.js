var listCate = {
    item: [{
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
}
var mongo = require('mongodb');
var request = require('request')
var cheerio = require('cheerio')
var noidung = require('../mongo/noidung')
var motangan = require('../mongo/moTa')
var xml2js = require('xml2js')
var parser = new xml2js.Parser()
var sizeCategory = listCate.item.length;
var jsdom = require("jsdom/lib/old-api.js");


module.exports = function (index) {
    var ArrayMotaNgan = [];
    var ArrayNoiDung = [];

    function chayCategory(indexCategory) {
        var linkCategory = listCate.item[indexCategory].LinkCategory // lấy link một mục trên rss
        console.log("Chạy thể loại : " + listCate.item[indexCategory].category)
        console.log("LinkCategory : " + listCate.item[indexCategory].LinkCategory)
        request(linkCategory, function (error, res, htmlBody) { // lấy các mô tả qua linh một mục
                if (!error && res.statusCode == 200) {
                    parser.parseString(htmlBody, function (err, data) {
                            var listMoTaNgan = data;
                            var linkCategory = data.rss.channel[0].link
                            var listItemMotaNgan = data.rss.channel[0].item
                            // console.log(`${listItemMotaNgan.length}`)
                            // console.log(JSON.stringify(listItemMotaNgan[0]))
                            for (indexMoTaNgan in listItemMotaNgan) {
                                var itemMoTaNgan = {
                                    linkCategory: linkCategory[0],
                                    linkContents: listItemMotaNgan[indexMoTaNgan].link[0],
                                    title: listItemMotaNgan[indexMoTaNgan].title[0],
                                    description: listItemMotaNgan[indexMoTaNgan].description[0].split(`</br>`)[1],
                                    img: listItemMotaNgan[indexMoTaNgan].description[0].split(`src=\"`)[1].split(`"`)[0],

                                }
                                // console.log(JSON.stringify(itemMoTaNgan))
                                ArrayMotaNgan.push(itemMoTaNgan)


                            }//-------------for
                            var MoTaNganHave = []

                            function getHTML(indexMoTaNgan) {
                                var objMoTaNgan = ArrayMotaNgan[indexMoTaNgan];
                                jsdom.env(objMoTaNgan.linkContents, ["http://code.jquery.com/jquery.js"], function (err, window) {
                                        try {
                                            var content;
                                            content = window.$("body").html();
                                            var linkVideo = '';
                                            console.log(objMoTaNgan.linkContents)
                                            console.log(`---------------------${window.$("script").text().split("mp4: [\"")[1].split(`"]`)[0]}`)
                                            linkVideo = window.$("script").text().split("mp4: [\"")[1].split(`"]`)[0]
                                            if (linkVideo != '') linkVideo = `<video src="${linkVideo}" controls></video>`
                                            else linkVideo = '';
                                            var title = `<h1>${objMoTaNgan.title}</h1>`
                                            console.log(`${indexMoTaNgan + title}`)
                                            var contents = {
                                                linkContents: ArrayMotaNgan[indexMoTaNgan].linkContents,
                                                contentHTML: `${title}${content}${linkVideo}`
                                            }
                                            ArrayNoiDung.push(contents);
                                            MoTaNganHave.push(objMoTaNgan)
                                            if (indexMoTaNgan < ArrayMotaNgan.length - 1) getHTML(indexMoTaNgan + 1);
                                            else if (indexCategory < sizeCategory - 1) {
                                                for (indexNoiDung in ArrayNoiDung) {
                                                    noidung.insertOne(ArrayNoiDung[indexNoiDung], {"linkContents": ArrayNoiDung[indexNoiDung].linkContents}, function () {
                                                    });// noidung.insertOne
                                                }// for (indexNoiDung in ArrayNoiDung){
                                                for (indexMoTaNganHave in MoTaNganHave) {
                                                    motangan.insertOne(MoTaNganHave[indexMoTaNganHave], {"linkContents": MoTaNganHave[indexMoTaNganHave].linkContents}, function () {
                                                    });// noidung.insertOne
                                                }
                                                MoTaNganHave = []
                                                ArrayNoiDung = [];
                                                ArrayMotaNgan = [];
                                                // chayCategory(indexCategory + 1)
                                            }// else if
                                        } catch (ex) {
                                            if (indexMoTaNgan < ArrayMotaNgan.length - 1) getHTML(indexMoTaNgan + 1);
                                            else if (indexCategory < sizeCategory - 1) {
                                                for (indexNoiDung in ArrayNoiDung) {
                                                    noidung.insertOne(ArrayNoiDung[indexNoiDung], {"linkContents": ArrayNoiDung[indexNoiDung].linkContents}, function () {
                                                    });// noidung.insertOne
                                                }// for (indexNoiDung in ArrayNoiDung){
                                                for (indexMoTaNganHave in MoTaNganHave) {
                                                    motangan.insertOne(MoTaNganHave[indexMoTaNganHave], {"linkContents": MoTaNganHave[indexMoTaNganHave].linkContents}, function () {
                                                    });// noidung.insertOne
                                                }
                                                MoTaNganHave = []
                                                ArrayNoiDung = [];
                                                ArrayMotaNgan = [];
                                                // chayCategory(indexCategory + 1)
                                            }// else if
                                        }

                                    }
                                )
                            }

                            getHTML(0)
                            console.log("Số item Des  " + ArrayMotaNgan.length)
                        }//-------function (err, data) {
                    )//--------- parser.parseString(


                }//-------  if (!error && res.statusCode == 200) {
            }//-------request(linkCategory, function (error, res, htmlBody)
        )
    }

    chayCategory(index)
}