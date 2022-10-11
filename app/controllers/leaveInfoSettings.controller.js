const db = require("../models");
const LeaveCategory = db.LeaveCategory;
const LeaveTypes=db.LeaveTypes;
exports.leaveTypesDetail = async (req, res) => {
    try {

        LeaveTypes.find({}, (err, leaveTypes) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(leaveTypes);
            //res.json(employeedetails);
            res.send(leaveTypes);
        })

    } catch (err) {
        console.error(err)
    }

};

exports.leaveCategoryDetail = async (req, res) => {
    try {

        LeaveCategory.find({}, (err, leaveCategory) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(leaveCategory);
            //res.json(employeedetails);
            res.send(leaveCategory);
        })

    } catch (err) {
        console.error(err)
    }

};

exports.addLeaveType = async (req, res) => {
    try {
        const {
            // leaveType_id,
            leaveType_name,
            sys_user
        } = req.body;
        // console.log(leaveType_id)
        const today = new Date();
        const hour=today.getHours();
        const min=today.getMinutes();
      const sec=today.getSeconds();
      const day=today.getDay();
      const mont=today.getMonth();
      const year=today.getFullYear(); 
       const oldUser = await LeaveTypes.findOne({ leaveType_name });
        if (oldUser) {
            // return res.status(409).send("User Already Exist. Please Login");
            res.send({ message2: " Leave Type alredy exist, try another", val: false })
        }
        else {
            const leaveTypes = new LeaveTypes({
                leaveType_id:"lev"+hour+min+sec+day+mont+year,
                leaveType_name,
                createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()
                // role_display_name: role_name,
            });
            leaveTypes.save(err => {
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
exports.updateLeaveType = async (req, res) => {
    try {

        const id = req.body.leaveType_id;
        const name = req.body.leaveType_name;
const sys_user=req.body.sys_user;
        await LeaveTypes.findOne({ leaveType_id: id }, (err, leaveTypes) => {
            leaveTypes.leaveType_id = id;

            leaveTypes.leaveType_name = name;
            leaveTypes.createdBy=sys_user,
            leaveTypes.updatedBy=sys_user,
            leaveTypes.cr_time=new Date(),
            leaveTypes.up_date=new Date(),
            leaveTypes.save();
            // res.send("leave type updated");
            res.send({ message: " Data updated successfully", val: false, val2: true })
        });

    } catch (err) {
        console.error(err)
    }

};
exports.addLeaveCategory = async (req, res) => {
    try {
        const {
            // leaveCategory_id,
            leaveCategory_name,
            sys_user
        } = req.body;
        const today = new Date();
        const hour=today.getHours();
        const min=today.getMinutes();
      const sec=today.getSeconds();
      const day=today.getDay();
      const mont=today.getMonth();
      const year=today.getFullYear();
        // console.log(leaveCategory_id)
        const oldUser = await LeaveCategory.findOne({ leaveCategory_name });
        if (oldUser) {
            // return res.status(409).send("User Already Exist. Please Login");
            res.send({ message2: " Leave Category alredy exist, try another", val: false })
        }
        else {
            const leaveCategory = new LeaveCategory({
                leaveCategory_id:"lcat"+hour+min+sec+day+mont+year,
                leaveCategory_name,
                createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()
                // role_display_name: role_name,
            });
            leaveCategory.save(err => {
                if (err) {
                    res.send(err)
                }

                else {

                    res.send({ message: "Successfully Resitered" , val2: true})
                }
            })
        }

    } catch (err) {
        console.error(err)
    }

};
exports.updateLeaveCategory = async (req, res) => {
    try {
        const id = req.body.leaveCategory_id;
        const name = req.body.leaveCategory_name;
const sys_user=req.body.sys_user;
        await LeaveCategory.findOne({ leaveCategory_id: id }, (err, leaveCategory) => {
            leaveCategory.leaveCategory_id = id;

            leaveCategory.leaveCategory_name = name;
            leaveCategory.leaveCategory_name = name;
            leaveCategory.createdBy=sys_user,
            leaveCategory.updatedBy=sys_user,
            leaveCategory.cr_time=leaveCategory.cr_time,
            leaveCategory.up_date=new Date(),
            leaveCategory.save();
            // res.send("Role updated");
            res.send({ message: " Data updated successfully", val: false, val2: true })

        });
    

    } catch (err) {
        console.error(err)
    }

};