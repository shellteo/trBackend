var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


let key = 'GAPBZ-HSCCO-YMGWE-S32ZJ-URPBH-BRFPY';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '哈哈哈哈红红火火'});
});

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
