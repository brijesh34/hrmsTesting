const db = require("../models");
// const config = require("../config/auth.config");
// const Role = db.role;
const EmployeeDetails1 = db.EmployeeDetails1;
const LeaveInfo = db.LeaveInfo;
const EmployeeDetailsLogin = db.EmployeeDetailsLogin;
const EmployeeRoles = db.EmployeeRoles;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getRole = async (req, res) => {
    try {
        EmployeeRoles.find({}, (err, employeeRoles) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeeRoles);
            //res.json(employeedetails);
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
            res.send({ message2: "Role Already Exist, Try another.", val: false })
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

                    res.send({ message: "Successfully Resitered", val2: true })
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
            res.send({ message: " Data updated successfully", val: false, val2: true })

        });
    }
    catch (err) {
        console.log(err);
    }
};