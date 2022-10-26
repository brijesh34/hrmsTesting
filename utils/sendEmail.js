    var nodemailer = require('nodemailer');
    var smtpTransport = require("nodemailer-smtp-transport");
    var handlebars = require("handlebars");
    const db = require("../app/models");

const EmployeeDetails1 = db.EmployeeDetails1;
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
const sendEmail=(email,subject,data)=>{
    var data=data;
    // var nodemailer = require('nodemailer');
    // var smtpTransport = require("nodemailer-smtp-transport");
    // var handlebars = require("handlebars");
    // var fs = require("fs");
    
    // var readHTMLFile = function (path, callback) {
    //   fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    //     if (err) {
    //       callback(err);
    //       throw err;
    //     } else {
    //       callback(null, html);
    //     }
    //   });
    // };
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
        let htmlFile = "../../public/index.html";
    
        const html="aa";
        //  readHTMLFile(__dirname + "/../public/code.html", function (err, html) {
        readHTMLFile(__dirname + htmlFile, function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            verificationcode: data,
          };
          const oldUser =  EmployeeDetails1.findOne({ jobType:"Human Resource" });
    
          var htmlToSend = template(replacements);
          var mailOptions = {
            from: 'inevitableapptest@gmail.com',
                to: email,
                cc:oldUser.offEmail,
                // bcc:email,
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
module.exports = sendEmail;