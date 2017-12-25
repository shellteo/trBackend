let express = require('express');
let router = express.Router();
let fetch = require('node-fetch');
let nodemailer = require('nodemailer');

// 开启一个 SMTP 连接池
let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true, // use SSL
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'shellteo@163.com',
        pass: 'Zx1994'
    }
});

let key = 'GAPBZ-HSCCO-YMGWE-S32ZJ-URPBH-BRFPY';

/* GET home page. */
/*router.get('/', function (req, res, next) {
    res.render('index', {title: '哈哈哈哈红红火火'});
});*/

router.get('/', function (req, res, next) {
    res.render('home');
});

router.get('/1', function (req, res, next) {
    res.render('temp');
});

router.get('/2', function (req, res, next) {
    res.render('ip');
});

router.get('/sendEmail', function (req, res) {
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log(ip);
    let requestUrl = 'http://apis.map.qq.com/ws/location/v1/ip?ip=' + ip + '&key=' + key;
    console.log(requestUrl);
    fetch(requestUrl).then(function (response) {
        return response.text()
    }).then(function (body) {
        let parseBody = JSON.parse(body);
        console.log(parseBody);
        let adInfo = parseBody.result.ad_info;
        let address = adInfo.nation + adInfo.province + adInfo.district||'';
        let options = {
            from: '"太上老君" <shellteo@163.com>',
            to: '767070256@qq.com, 312066091@qq.com',
            subject: '太上老君',
            text: '--签--',
            html: '<p>地址：'+address+'</p><p>ip：'+ip+'</p><span>查询地址：</span><a>https://www.opengps.cn/Data/IP/LocHighAcc.aspx</a>'
        };
        transporter.sendMail(options, function(err, msg){
            if(err){
                console.log(err);
            }else {
                console.log(msg);
            }
        });
    })
})

router.get('/api/ipLocation', function (req, res) {
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log(ip);
    let requestUrl = 'http://apis.map.qq.com/ws/location/v1/ip?ip=' + ip + '&key=' + key;
    console.log(requestUrl);
    fetch(requestUrl).then(function (response) {
        return response.text()
    }).then(function (body) {
        res.send(body);
    })
});

router.get('/api/getLocation', function (req, res) {
    //console.log(req.query);
    let location = req.query.location;
    let requestUrl = 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + location + '&key=' + key;
    fetch(requestUrl).then(function (response) {
        return response.text()
    }).then(function (body) {
        //console.log(body);
        res.send(body);
    })
})


module.exports = router;
