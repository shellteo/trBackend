let express = require('express');
let router = express.Router();
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

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* 浏览器输入地址（如127.0.0.1:3000/send）后即发送 */
router.get('/send', function(req, res, next) {
    let options = {
        from: '"张翔" <shellteo@163.com>',
        to: '767070256@qq.com, 825606393@qq.com',
        subject: 'node mailer测试发送',
        text: '测试',
        html: '<p>测试html</p>'
    };

    transporter.sendMail(options, function(err, msg){
        if(err){
            console.log(err);
            res.render('mail', { title: err });
        }else {
            console.log(msg);
            res.render('mail', { title: "已接收："+msg.accepted});
        }
    });
});

module.exports = router;
