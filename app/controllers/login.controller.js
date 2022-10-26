const db = require("../models");
// const config = require("../config/auth.config");
// const Role = db.role;
// const EmployeeDetails1 = db.EmployeeDetails1;
// const LeaveInfo=db.LeaveInfo;
const EmployeeDetailsLogin=db.EmployeeDetailsLogin;
const EmployeeRoles=db.EmployeeRoles;

const EmployeeDetails1 = db.EmployeeDetails1;
const sendEmail=require("../../utils/sendEmail");
// const sendHtmlEmail = require("./passwordEmail.controller");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.login = async (req, res) => {
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const { email, password } = req.body;
        const tab = EmployeeDetails1;
        console.log("-----------------------------------email------------------>" + email);
        console.log("-----------------------------------Pass------------------>" + password);
        //////////////////////////////////
        //////////////////////OR property not worked here
        ////////////////////////
        await EmployeeDetailsLogin.findOne(
            { emp_id: email },
            (err, employeedetails1) => {
                console.log("employeedetails1: ", employeedetails1);
                if (employeedetails1) {

                    console.log("292: Pass: ", employeedetails1.emp_password);
                    if (password === employeedetails1.emp_password) {
                        const employeedetails2 = tab.findOne({ offId: email }, (err, employeedetails1) => {

                            const jobtype = employeedetails1.jobType;
                            const role = EmployeeRoles.findOne({ role_name: jobtype }, (err, role) => {
                                const offEmail = employeedetails1.offEmail;
                                const name2 = employeedetails1.name;
                                const jobtype = employeedetails1.jobType;

                                const rolet = role.role_id;


                                const offId = employeedetails1.offId;
                                const token = jwt.sign(
                                    { user_id: employeedetails1._id, offEmail, jobtype, offId, name2, rolet },
                                    jwtSecretKey,
                                    {
                                        expiresIn: "2h",
                                    }
                                );
                                res.send({ message: "Login successfully", user: employeedetails1, val: true, val2: token })

                            });
                        })
                    }
                    else {
                        res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
                    }
                }
                else {


                    res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
                }

            }).clone();
       
    } catch (err) {
        console.error(err)
    }

};


exports.sendPassword = async (req, res) => {
    try {

        const { email } = req.body
        EmployeeDetailsLogin.findOne({ emp_email: email }, (err, employeeDetailsLogin) => {
            if (employeeDetailsLogin) {
                if (email === employeeDetailsLogin.emp_email) {
                    
                    var data = Math.floor(Math.random() * (8000 - 1000) + 1000);
                    sendEmail(email, "Otp for Password Reset",data);
                    
                    res.send({ message: "Check Otp on your e-mail , If e-mail is registered ", val: data, vemail: employeeDetailsLogin.email })

                }
                else {
                    res.send({ message: " please recheck email and enter again", val: false })
                }
            }
            else {


                res.send({ message: " please recheck email and enter again", val: false })
            }

        })
    } catch (err) {
        console.error(err)
    }

};
