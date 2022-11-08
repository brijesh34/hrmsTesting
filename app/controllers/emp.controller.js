const db = require("../models");
const EmployeeDetails1 = db.EmployeeDetails1;
const LeaveInfo = db.LeaveInfo;
const EmployeeDetailsLogin = db.EmployeeDetailsLogin;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getAllCurrentEmp = async (req, res) => {
    try {

        const status = "Current";
        EmployeeDetails1.find({ status: status }, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);
            res.json(employeedetails1);
        })
    } catch (error) {
        return res.status(500).send({ success: false, message: error });
    }
};
exports.getAllExEmp = async (req, res) => {
    try {
        const status = "Ex-Employee";
        EmployeeDetails1.find({ status: status }, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);
            res.send(employeedetails1);
        })
    } catch (error) {
        return res.status(500).send({ success: false, message: error });
    }


};

exports.getAllEmp = async (req, res) => {
    try {
        EmployeeDetails1.find({}, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);
            res.send(employeedetails1);
        })

    } catch (error) {
        return res.status(500).send({ success: false, message: error });
    }
};


exports.getPersonal = async (req, res) => {
    try {
        const id = req.params.id;

        const fileExists = require('file-exists');

        EmployeeDetails1.find({ offEmail: id }, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);

            res.send({ user: employeedetails1 });

        })
    } catch (error) {
        return res.status(500).send({ success: false, message: error });
    }
};

exports.addNew = async (req, res) => {
    try {
        const {
            name,
            fname,
            email,
            gender,
            offEmail,
            // offId,
            address,
            aadhaar,
            pan,
            bankAccount,
            bankName,
            bankIfsc,
            Country,
            state,
            city,
            pincode,
            highestDegree,
            lastCollegeCompany,
            phoneNo,
            jobType,
            dob,
            // salary,


            noExp,
            status,

            DoJ,
            ReportingManager,
            sys_user
        } = req.body;
        //  encryptedPassword = await bcrypt.hash(password, 10);           EmployeeDetailsLogin
        const oldUser = await EmployeeDetails1.findOne({ offEmail });
        const oldUser2 = await EmployeeDetails1.find({});
        const len = oldUser2.length + 1;
        if (oldUser) {
            // return res.status(409).send("User Already Exist. Please Login");
            res.send({ message2: " User alredy exist, Please Login", val: false })
        }
        else {
            const doj = new Date(DoJ);
            const month = doj.getMonth();
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const leave = await LeaveInfo.create({
                eid: "inv0" + len,
                total_leave: (12 - month) * 2,
                leave_in_buck: 2,
                availed_leave: 0,
                lop: 0,
                cr_date: month
            });



            const login = await EmployeeDetailsLogin.create({
                emp_id: "inv0" + len,
                emp_password: name,
                emp_email: offEmail,

                emp_status: status,
                emp_token: "",
                emp_policy_status:""

            });

            const user = await EmployeeDetails1.create({
                name,
                fname,
                email,
                gender,
                offEmail,
                offId: "inv0" + len,
                address,
                aadhaar,
                pan,
                bankAccount,
                bankName,
                bankIfsc,
                Country,
                state,
                city,
                pincode,
                highestDegree,
                lastCollegeCompany,
                phoneNo,
                jobType,
                dob,
                // salary,

                noExp,
                status,

                DoJ,
                ReportingManager,

                createdBy: sys_user,
                updatedBy: sys_user,
                cr_time: new Date(),
                up_date: new Date(),

            });


            user.save(err => {
                if (err) {
                    res.send(err)
                }

                else {
                    leave.save(err => {
                        if (err) {
                            res.send(err)
                        }

                        else {
                            console.log("yes it worked-------------------------------line 806");
                        }
                    }

                    )
                    login.save(err => {
                        if (err) {
                            res.send(err)
                        }

                        else {
                            // res.send({ message: "Successfully Resitered", verify: "true" })
                        }
                    }

                    )
                    res.send({ message: "Successfully Resitered", dt: user })
                }
            }

            )


        }

    } catch (err) {
        console.error(err)
    }


};



exports.updateProfile = async (req, res) => {
    try {
        // const  id = req.body.id;
        const name = req.body.name;
        const fname = req.body.fname;
        const email = req.body.email;
        const gender = req.body.gender;
        const offEmail = req.body.offEmail;
        const offId = req.body.offId;
        const address = req.body.address;
        const aadhaar = req.body.aadhaar;
        const pan = req.body.pan;
        const bankAccount = req.body.bankAccount;
        const bankName = req.body.bankName;
        const bankIfsc = req.body.bankIfsc;
        const Country = req.body.Country;
        const state = req.body.state;
        const city = req.body.city;
        const pincode = req.body.pincode;
        const highestDegree = req.body.highestDegree;
        const lastCollegeCompany = req.body.lastCollegeCompany;
        const phoneNo = req.body.phoneNo;
        const jobType = req.body.jobType;
        const dob = req.body.dob;
        // const salary = req.body.salary;

        const noExp = req.body.noExp;
        const status = req.body.status;

        const DoJ = req.body.DoJ;
        const ReportingManager = req.body.ReportingManager;
        // const id = req.body.id
        const sys_user = req.body.sys_user;
        await EmployeeDetails1.findOne({ offEmail: offEmail }, (err, employeedetails1) => {
            employeedetails1.name = name
                ; employeedetails1.fname = fname
                ; employeedetails1.email = email
                ; employeedetails1.gender = gender
                ; employeedetails1.offEmail = offEmail
                ; employeedetails1.offId = offId
                ; employeedetails1.address = address
                ; employeedetails1.aadhaar = aadhaar
                ; employeedetails1.pan = pan
                ; employeedetails1.bankAccount = bankAccount
                ; employeedetails1.bankName = bankName
                ; employeedetails1.bankIfsc = bankIfsc
                ; employeedetails1.Country = Country
                ; employeedetails1.state = state
                ; employeedetails1.city = city
                ; employeedetails1.pincode = pincode
                ; employeedetails1.highestDegree = highestDegree
                ; employeedetails1.lastCollegeCompany = lastCollegeCompany
                ; employeedetails1.phoneNo = phoneNo
                ; employeedetails1.jobType = jobType
                ; employeedetails1.dob = dob
                // ;employeedetails1.salary=salary

                ; employeedetails1.noExp = noExp

                ; employeedetails1.status = status;
            employeedetails1.DoJ = DoJ;
            employeedetails1.ReportingManager = ReportingManager;

            employeedetails1.createdBy = sys_user;
            employeedetails1.updatedBy = sys_user;
            employeedetails1.cr_time = new Date();
            employeedetails1.up_date = new Date();



            employeedetails1.save();
            res.send({ message: " Data updated successfully", val: false, val2: true })
            // });
        });
    }
    catch (err) {
        console.log(err);
    }
};
