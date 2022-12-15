const db = require("../models");
// const config = require("../config/auth.config");
// const Role = db.role;
const EmployeeDetails1 = db.EmployeeDetails1;
const LeaveInfo = db.LeaveInfo;
const EmployeeDetailsLogin = db.EmployeeDetailsLogin;
const EmployeeRoles = db.EmployeeRoles;
const Designation = db.Designation;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getRole = async (req, res) => {
    try {
        EmployeeRoles.find({}, (err, employeeRoles) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            res.send(employeeRoles);
        })
    } catch (err) {
        console.error(err)
    }

};

exports.getDesignation = async (req, res) => {
    try {
        Designation.find({}, (err, desig) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            res.send(desig);
        })
    } catch (err) {
        console.error(err)
    }

};
exports.getRole2 = async (req, res) => {
    try {
        EmployeeRoles.find({}, (err, employeeRoles) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            res.send(employeeRoles);
        })
    } catch (err) {
        console.error(err)
    }

};


exports.addRole = async (req, res) => {
    try {
        const {
            // role_id,
            role_name,
            sys_user

        } = req.body;
        const today = new Date();
        const hour = today.getHours();
        const min = today.getMinutes();
        const sec = today.getSeconds();
        const day = today.getDay();
        const mont = today.getMonth();
        const year = today.getFullYear();

        const oldUser = await EmployeeRoles.findOne({ role_name });
        if (oldUser) {
            res.send({ message: " Role is alredy exist, try another", val2: "false", val: "true" })
        }
        else {
            const employeeRoles = new EmployeeRoles({
                role_id: "rol" + hour + min + sec + day + mont + year,
                role_name,
                role_display_name: role_name,
                createdBy: sys_user,
                updatedBy: sys_user,
                cr_time: new Date(),
                up_date: new Date()
            });
            employeeRoles.save(err => {
                if (err) {
                    res.send(err)
                }

                else {

                    res.send({ message2: "successfully registered role", val2: "true", val: "false" })
                }
            })
        }
    } catch (err) {
        console.error(err)
    }

};
exports.addDesignation = async (req, res) => {
    try {
        const {
            role_name,
            designation,
            m1,
            m2,
            m3,
            m4,
            m5,
            m6,
            m7,
            m8,
            m9,
            m10,
            sys_user

        } = req.body;
        const today = new Date();
        const hour = today.getHours();
        const min = today.getMinutes();
        const sec = today.getSeconds();
        const day = today.getDay();
        const mont = today.getMonth();
        const year = today.getFullYear();

        const oldUser = await Designation.findOne({  designation:designation});
        if (oldUser) {
            console.log('---------------------------line131 not runn')
            // console.log(desig)
            
            res.send({ message: " Designation is alredy exist, try another", val2: "false", val: "true" })
        }
        else {
            const desig = new Designation({
                designation_id: "desig" + hour + min + sec + day + mont + year,
                role_name,
                designation,
                // restriction,
                m1,
                m2,
                m3,
                m4,
                m5,
                m6,
                m7,
                m8,
                m9,
                m10,
                createdBy: sys_user,
                updatedBy: sys_user,
                cr_time: new Date(),
                up_date: new Date()
            });
                                console.log('---------------------------line154')
                    console.log(desig)
                    
                    await desig.save(err => {
                if (err) {
                    res.send(err)
                }

                else {
                                        console.log('---------------------------line160')
                    console.log(desig)
                    res.send({ message2: "successfully registered designation", val2: "true", val: "false" })
                }
            })
        }
    } catch (err) {
        console.error(err)
    }

};


exports.updateRole = async (req, res) => {
    try {
        // const  id = req.body.id;
        const id = req.body.id;
        const name = req.body.name;
        const sys_user = req.body.sys_user;
        await EmployeeRoles.findOne({ role_id: id }, (err, employeeRoles) => {
            employeeRoles.role_id = id;

            employeeRoles.role_name = name;
            employeeRoles.role_display_name = name;
            employeeRoles.createdBy = sys_user,
                employeeRoles.updatedBy = sys_user,
                employeeRoles.cr_time = new Date(),
                employeeRoles.up_date = new Date(),
                employeeRoles.save();
            // res.send("Role updated");
            res.send({ message2: "Role successfully updated", val2: "true", val: "false" })

        });
        // res.send({ message2: "Role successfully updated", val2: "true",val: "false" })

    }
    catch (err) {
        console.log(err);
    }
};

exports.updateDesignation = async (req, res) => {
    try {
        // const  id = req.body.id;

        const designation_id = req.body.designation_id;
        const role_name = req.body.role_name;
        const designation = req.body.designation;
        const m1 = req.body.m1;
        const m2 = req.body.m2;
        const m3 = req.body.m3;
        const m4 = req.body.m4;
        const m5 = req.body.m5;
        const m6 = req.body.m6;
        const m7 = req.body.m7;
        const m8 = req.body.m8;
        const m9 = req.body.m9;
        const m10 = req.body.m10;

        const sys_user = req.body.userid;
        await Designation.findOne({ designation_id: designation_id }, (err, desig) => {

            desig.designation_id = designation_id;
            desig.role_name = role_name;
            desig.designation = designation;
            desig.m1 = m1;
            desig.m2 = m2;
            desig.m3 = m3;
            desig.m4 = m4;
            desig.m5 = m5;
            desig.m6 = m6;
            desig.m7 = m7;
            desig.m8 = m8;
            desig.m9 = m9;
            desig.m10 = m10;

            //   desig.sys_user=  userid;
            desig.createdBy = sys_user,
                desig.updatedBy = sys_user,
                desig.cr_time = new Date(),
                desig.up_date = new Date(),
                desig.save();
            // res.send("Role updated");
            console.log("updated----------------249")
            res.send({ message2: "Designation successfully updated", val2: "true", val: "false" })

        });
        // res.send({ message2: "Role successfully updated", val2: "true",val: "false" })

    }
    catch (err) {
        console.log(err);
    }
};
