
const sendEmail3=(email,subject,email2,email3,data)=>{
    // var data=data;
    // var data=data;
    const em=email;
    const dat=subject;
    var nodemailer = require('nodemailer');
    var smtpTransport = require("nodemailer-smtp-transport");
    var handlebars = require("handlebars");
    var fs = require("fs");
    
    var readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          callback(err);
          throw err;
        } else {
          callback(null, html);
        }
      });
    };
    try {
        let mailTransporter = nodemailer.createTransport(
          smtpTransport({
            service: 'gmail',
                host: "gsmtp.gmail.com",
            port: 587,
            requireTLS:true,
            secure: false,
                auth: {
                    user: 'inevitableapptest@gmail.com',
                    pass: 'fiddtnvwktcucugh'
                }
          })
        );
        // let htmlFile = "/secondfromat.html";
    
        let htmlFile = "../../public/appraisalFormat.html";
        // const html="aa";
        //  readHTMLFile(__dirname + "/../public/code.html", function (err, html) {
        readHTMLFile(__dirname + htmlFile, function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            verificationcode: dat,
            verificationcode2: em,
            
            verificationcode3: data,
            
            // verificationcode4: data2,
          };
          var htmlToSend = template(replacements);
    //       var oldUser =  EmployeeDetails1.findOne({offId:email });
    // const oldUser2 =  EmployeeDetails1.findOne({offId:email2 });
    // const oldUser3 =  EmployeeDetails1.findOne({ offId:email3 });
    
    // const oldUser = await EmployeeDetailsLogin.findOne({ emp_id:eid });
          var mailOptions = {
            from: 'inevitableapptest@gmail.com',
                to: email,
                // cc:oldUser2.offEmail,
                // bcc:oldUser3.offEmail,
                subject: subject,
                // text: JSON.stringify(data),
html: htmlToSend,
          };
          mailTransporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log("this is error at the time of sending"+
                 "email and "+email)
              console.log(error);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    
}
module.exports = sendEmail3;