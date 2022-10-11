const db = require("../app/models");
// const config = require("../config/auth.config");
// const Role = db.role;
const EmployeeDetails1 = db.EmployeeDetails1;

const sendEmail2=(email,subject,data,data2)=>{
    // var data=data;
    // var data=data;
    const em=email;
    const dat=subject;
    var nodemailer = require('nodemailer');
    var smtpTransport = require("nodemailer-smtp-transport");
    var handlebars = require("handlebars");
    var fs = require("fs");
    const oldUser =  EmployeeDetails1.findOne({ jobType:"Human Resource" });
    
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
    
        let htmlFile = "/public/secondfromat.html";
        // const html="aa";
        //  readHTMLFile(__dirname + "/../public/code.html", function (err, html) {
        readHTMLFile(__dirname + htmlFile, function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            verificationcode: dat,
            verificationcode2: em,
            
            verificationcode3: data,
            
            verificationcode4: data2,
          };
          var htmlToSend = template(replacements);
          var mailOptions = {
            from: 'inevitableapptest@gmail.com',
                to: email,
                cc:oldUser.offEmail,
                subject: subject,
                // text: JSON.stringify(data),
html: htmlToSend,
          };
          mailTransporter.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log(error);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    
}

module.exports = sendEmail2;