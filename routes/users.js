var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var mailTransport = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
        user: 'shellteo@163.com',
        pass: 'Zx1994'
    },
});
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* 浏览器输入地址（如127.0.0.1:3000/sned）后即发送 */
router.get('/send', function(req, res, next) {
    var options = {
        from        : '"shell" <shellteo@163.com>',
        to          : '767070256@qq.com, 825606393@qq.com',
        // cc         : ''  //抄送
        // bcc      : ''    //密送
        subject        : '一封来自Node Mailer的邮件',
        text          : '一封来自Node Mailer的邮件',
        html           : '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>'
        /*attachments :
            [
                {
                    filename: 'img1.png',            // 改成你的附件名
                    path: 'public/images/img1.png',  // 改成你的附件路径
                    cid : '00000001'                 // cid可被邮件使用
                },
                {
                    filename: 'img2.png',            // 改成你的附件名
                    path: 'public/images/img2.png',  // 改成你的附件路径
                    cid : '00000002'                 // cid可被邮件使用
                },
            ]*/
    };

    mailTransport.sendMail(options, function(err, msg){
        if(err){
            console.log(err);
            res.render('mail', { title: err });
        }
        else {
            console.log(msg);
            res.render('mail', { title: "已接收："+msg.accepted});
        }
    });
});

module.exports = router;
