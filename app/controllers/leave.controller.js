const db = require("../models");
const EmployeeDetails1 = db.EmployeeDetails1;
const EventsInfo = db.EventsInfo;

const LeaveInfo = db.LeaveInfo;
const EmployeeDetailsLogin = db.EmployeeDetailsLogin;
const LeaveManage = db.LeaveManage;
const sendEmail2 = require("../../utils/sendEmail2");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const date_format=(d)=>{
    var e=new Date(d)
    
    const day=e.getDate();
    const mon=e.getMonth()+1;
    const year=e.getFullYear();

    return day+"/"+mon+"/"+year
}
exports.getPersonalLeave = async (req, res) => {
    try {
        const offId = req.params.id;
        const oldUser = await LeaveManage.find({ eid: offId } && { l_status: "approved" });


        const tempar = [
        ]
        LeaveManage.find({ eid: offId }).then(function (leaveManage) {
            var ar3 = leaveManage;
            var sdate = new Date();
            ar3.map((data) => {
                var ndate = new Date(data.start_date);
                var date = ndate.getDate() + '/' + (ndate.getMonth() + 1) + '/' + ndate.getFullYear();
                var ndate2 = new Date(data.end_date);
                var date2 = ndate2.getDate() + '/' + (ndate2.getMonth() + 1) + '/' + ndate2.getFullYear();

                tempar.push({
                    eid: data.eid, l_id: data.l_id, ename: data.ename, reportingPerson: data.reportingPerson,
                    l_reason: data.l_reason, l_reason2: data.l_reason2, start_date: date, end_date: date2, l_days:data.l_days,l_status: data.l_status
                    , l_type: data.l_type, l_category: data.l_category, s_date: data.start_date, e_date: data.end_date, approvedBy: data.approvedBy
                })
            })


            res.send({ leave: tempar, doj: oldUser.length });

        })
    } catch (err) {
        console.error(err)
    }

};

exports.addLeave = async (req, res) => {
    try {
        const {
            eid, l_id, ename, reportingPerson, l_reason, l_reason2, start_date, end_date, l_status
            , l_type, l_category, userEmail, approvedBy,l_days,
            sys_user } = req.body;
        const eDataS = {
            eid: eid, ename: ename,
            reportingPerson: reportingPerson, l_reason: l_reason, l_reason2: "--wait for reply--",
            start_date: date_format(start_date), end_date: date_format(end_date)
            , l_type: l_type, l_category: l_category, approvedBy: approvedBy, l_status: l_status
            ,l_days:l_days
        }
        const leaveManage = new LeaveManage({
            eid, l_id, ename, reportingPerson, l_reason, l_reason2: "", start_date, end_date, l_status
            , l_type, l_category, userEmail, approvedBy,l_days,
            createdBy: sys_user,
            updatedBy: sys_user,
            cr_time: new Date(),
            up_date: new Date()
        });
        leaveManage.save(err => {
            if (err) {
                res.send(err)
            }
            else {
                sendEmail2(reportingPerson, "Leave Request", eDataS, "yes");

                sendEmail2(userEmail, "Leave Request send", eDataS, "yes");
                console.log("line no----------------------->399")
                res.send({ message: "Request successfully registered", val2: true })
            }
        })
    } catch (err) {
        console.error(err)
    }

};


// function getDatesInRange(startDate, endDate) {
//     const date = new Date(startDate);
  
//     const dates = [];
    
//     const oldEvent =  EventsInfo.findOne({ event_id:format });
//     console.log(oldEvent)
//     while (date <= endDate) {
//         let d = new Date(date);
//         let format="eveh"+date_format(d);
//         const oldEvent =  EventsInfo.findOne({ event_id:format });
//         console.log(oldEvent)
// let day = d.getDay()
// if((day==5)||(day==6))
// {

//     date.setDate(date.getDate() + 1);
// }else
//     if(oldEvent){
//         date.setDate(date.getDate() + 1);

//     }
//     else{
        
//       dates.push(day);
//       date.setDate(date.getDate() + 1);

//     }
//          }
//   console.log(dates.length+"--------------------------------------line 109")
//     return dates+1;
//   }

exports.updateLeaveBySelf = async (req, res) => {
    try {
        const eid = req.body.eid;
        const l_id = req.body.l_id;
        const ename = req.body.ename;
        const reportingPerson = req.body.reportingPerson;
        const l_reason = req.body.l_reason;
        const l_reason2 = req.body.l_reason2

        const start_date = req.body.start_date;
        const end_date = req.body.end_date;
        const l_status = req.body.l_status;
        const l_type = req.body.l_type;
        const l_category = req.body.l_category;
        const approvedBy = req.body.approvedBy;
        const l_days=req.body.l_days;
        const sys_user = req.body.sys_user;
        const day1 = new Date(start_date);
        const day2 = new Date(end_date);

        const eDataS = {
            eid: eid, ename: ename,
            reportingPerson: reportingPerson, l_reason: l_reason, l_reason2: l_reason2,
            start_date: date_format(start_date), end_date: date_format(end_date)
            , l_type: l_type, l_category: l_category, approvedBy: approvedBy, l_status: l_status,l_days:l_days
        }
        // const diff = (day2.getTime() - day1.getTime()) / (24 * 60 * 60 * 1000);
        
        
        // const days = Math.abs(Math.round(diff))+1;
        
const d1 = new Date(start_date);
const d2 = new Date( end_date);
        // const no_days=getDatesInRange(d1,d2);
        const days=l_days;
        // no_days.length-1;
        
        
        await EmployeeDetailsLogin.findOne({ emp_id: eid }, (err, employeeDetailsLogin) => {





            console.log(employeeDetailsLogin.emp_email + "-------------------------------------------------line 1863");

            // await 
            LeaveManage.findOne({ l_id: l_id }, (err, leaveManage) => {

                leaveManage.eid = eid;
                leaveManage.l_id = l_id;
                leaveManage.ename = ename;
                leaveManage.reportingPerson = reportingPerson;
                leaveManage.l_reason = l_reason;
                leaveManage.l_reason2 = l_reason2

                leaveManage.start_date = start_date;
                leaveManage.end_date = end_date;
                leaveManage.l_status = l_status;
                leaveManage.l_type = l_type;
                leaveManage.l_category = l_category;
                leaveManage.approvedBy = approvedBy;
                leaveManage.l_days=l_days;
                leaveManage.createdBy = sys_user;
                leaveManage.updatedBy = sys_user;
                leaveManage.cr_time = new Date();
                leaveManage.up_date = new Date();
                leaveManage.save();

                // await
                if (l_status == "approved") {
                    LeaveInfo.findOne({ eid: eid }, (err, leaveInfo) => {
                        const l1 = leaveInfo.leave_in_buck;
                        const l2 = leaveInfo.availed_leave;
                        leaveInfo.eid = eid;
                        if (l1 < days) {
                            const a = days - l1;
                            leaveInfo.leave_in_buck = 0;
                            leaveInfo.lop = a + leaveInfo.lop;
                        }
                        else {

                            leaveInfo.leave_in_buck = l1 - days;
                            leaveInfo.lop = leaveInfo.lop;
                        }
                        leaveInfo.availed_leave = l2 + days;
                        const d = new Date();
                        cr_date = d.getMonth();
                        leaveInfo.save();

                    });
                }
                sendEmail2(employeeDetailsLogin.emp_email, "Leave have updated", eDataS, "");
                sendEmail2(reportingPerson, "Leave have updated", eDataS, "")
                res.send({ message: "Request successfully updated", val2: true });

            });
        });


    } catch (err) {
        console.error(err)
    }

};


exports.delete_self_leave = async (req, res) => {
    try {

        const l_id = req.params.id;
        const eid = req.body.eid;
        const mess = req.body.message;
        const oldUser = await EmployeeDetailsLogin.findOne({ emp_id: eid });
        await LeaveManage.find({ emp_id: eid }).then(function (leaveManage) {
            const ar3 = leaveManage;
            ar3.map((data) => {


                tempar = {
                    eid: data.eid, ename: data.ename,
                    reportingPerson: data.reportingPerson, l_reason: data.l_reason, l_reason2:'--------------',
                    start_date: date_format(data.start_date), end_date: date_format(data.end_date)
                    , l_type: data.l_type, l_category: data.l_category, approvedBy: data.approvedBy, l_status: data.l_status,l_days:data.l_days
                }





            })
        })
        await LeaveManage.deleteOne({ l_id: l_id });
        sendEmail2(oldUser.emp_email, "Leave have canceled", tempar, mess);
        sendEmail2(req.body.reportingPerson, "Leave have canceled", tempar, mess)

        res.send({ message2: "successfully canceled", val2: "true",val: "false" })
  
    } catch (err) {
        console.error(err)
    }

};

exports.leaveManagementInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const tempar = [
        ]
        LeaveManage.find({ reportingPerson: id }).then(function (leaveManage) {
            var ar3 = leaveManage;
            var sdate = new Date();
            ar3.map((data) => {
                var ndate = new Date(data.start_date);
                var date = ndate.getDate() + '/' + (ndate.getMonth() + 1) + '/' + ndate.getFullYear();
                var ndate2 = new Date(data.end_date);
                var date2 = ndate2.getDate() + '/' + (ndate2.getMonth() + 1) + '/' + ndate2.getFullYear();

                tempar.push({
                    eid: data.eid, l_id: data.l_id, ename: data.ename, reportingPerson: data.reportingPerson,
                    l_reason: data.l_reason, l_reason2: data.l_reason2, start_date: date, end_date: date2, l_status: data.l_status
                    , l_type: data.l_type, l_category: data.l_category, s_date: data.start_date, e_date: data.end_date, approvedBy: data.approvedBy
               ,l_days:data.l_days })
            })

            res.send({ leave: tempar });

        })




    } catch (err) {
        console.error(err)
    }

};


exports.leaveManagementInfoAll = async (req, res) => {
    try {
        // const id = req.params.id;
        const tempar = [
        ]
        LeaveManage.find({  }).then(function (leaveManage) {
            var ar3 = leaveManage;
            var sdate = new Date();
            ar3.map((data) => {
                var ndate = new Date(data.start_date);
                var date = ndate.getDate() + '/' + (ndate.getMonth() + 1) + '/' + ndate.getFullYear();
                var ndate2 = new Date(data.end_date);
                var date2 = ndate2.getDate() + '/' + (ndate2.getMonth() + 1) + '/' + ndate2.getFullYear();

                tempar.push({
                    eid: data.eid, l_id: data.l_id, ename: data.ename, reportingPerson: data.reportingPerson,
                    l_reason: data.l_reason, l_reason2: data.l_reason2, start_date: date, end_date: date2, l_status: data.l_status
                    , l_type: data.l_type, l_category: data.l_category, s_date: data.start_date, e_date: data.end_date, approvedBy: data.approvedBy
               ,l_days:data.l_days })
            })

            res.send({ leave: tempar });

        })




    } catch (err) {
        console.error(err)
    }

};

exports.updateLeaveByManager = async (req, res) => {
    try {
        const eid = req.body.eid;
        const l_id = req.body.l_id;
        const ename = req.body.ename;
        const reportingPerson = req.body.reportingPerson;
        const l_reason = req.body.l_reason;
        const l_reason2 = req.body.l_reason2

        const start_date = req.body.start_date;
        const end_date = req.body.end_date;
        const l_status = req.body.l_status;
        const l_type = req.body.l_type;
        const l_category = req.body.l_category;
        const approvedBy = req.body.approvedBy;
        const l_days=req.body.l_days;
        const sys_user = req.body.sys_user;
        const day1 = new Date(start_date);
        const day2 = new Date(end_date);
        // const d1 = new Date('2022-01-18');
        // const d2 = new Date('2022-01-24');
        
        const eDataS = {
            eid: eid, ename: ename,
            reportingPerson: reportingPerson, l_reason: l_reason, l_reason2: l_reason2,
            start_date: date_format(start_date), end_date: date_format(end_date)
            , l_type: l_type, l_category: l_category, approvedBy: approvedBy, l_status: l_status,l_days:l_days
        }
        // const diff = (day2.getTime() - day1.getTime()) / (24 * 60 * 60 * 1000);
        // const days = Math.abs(Math.round(diff)) + 1;
         // const diff = (day2.getDate() - day1.getDate())+((day2.getMonth() - day1.getMonth()))

         const d1 = new Date(start_date);
         const d2 = new Date( end_date);
                //  const no_days=getDatesInRange(d1,d2);
                 const days=l_days;
                //  no_days.length-1;
                 
        // (day2.getDate() - day1.getDate());

        // const days = Math.abs(Math.round(diff)) + 1;
     
        await EmployeeDetailsLogin.findOne({ emp_id: eid }, (err, employeeDetailsLogin) => {





            console.log(employeeDetailsLogin.emp_email + "-------------------------------------------------line 1863");

            // await 
            LeaveManage.findOne({ l_id: l_id }, (err, leaveManage) => {

                leaveManage.eid = eid;
                leaveManage.l_id = l_id;
                leaveManage.ename = ename;
                leaveManage.reportingPerson = reportingPerson;
                leaveManage.l_reason = l_reason;
                leaveManage.l_reason2 = l_reason2

                leaveManage.start_date = start_date;
                leaveManage.end_date = end_date;
                leaveManage.l_status = l_status;
                leaveManage.l_type = l_type;
                leaveManage.l_category = l_category;
                leaveManage.approvedBy = approvedBy;
                leaveManage.l_days=l_days;
                leaveManage.createdBy = sys_user;
                leaveManage.updatedBy = sys_user;
                leaveManage.cr_time = new Date();
                leaveManage.up_date = new Date();
                // leaveManage.save();

                // await
                if (l_status == "approved") {
                    LeaveInfo.findOne({ eid: eid }, (err, leaveInfo) => {
                        const l1 = leaveInfo.leave_in_buck;
                        const l2 = leaveInfo.availed_leave;
                        leaveInfo.eid = eid;
                        // leaveInfo.total_leave;
                        if (l1 < days) {
                            const a = days - l1;
                            leaveInfo.leave_in_buck = 0;
                            leaveInfo.lop = a + leaveInfo.lop;
                        }
                        else {

                            leaveInfo.leave_in_buck = l1 - days;
                            leaveInfo.lop = leaveInfo.lop;
                        }
                        leaveInfo.availed_leave = l2 + days;
                        const d = new Date();
                        cr_date = d.getMonth();
                        leaveInfo.save();
                        leaveManage.save();

                        // res.send("leave updated");

                    });
                }
                sendEmail2(employeeDetailsLogin.emp_email, "Leave have replied", eDataS, "");
                sendEmail2(reportingPerson, "Leave have replied", eDataS, "")
                // res.send("leave  info updated");
                res.send({ message: " Data  successfully send", val: false, val2: true })

            });
        });


    } catch (err) {
        console.error(err)
    }

};

exports.pendingLeave = async (req, res) => {
    try {


        const id = req.params.id;
        const tempar = [
        ]
        LeaveManage.find({ reportingPerson: id }).then(function (leaveManage) {
            var ar3 = leaveManage;
            var sdate = new Date();
            ar3.map((data) => {
                if (data.l_status === "pending") {
                    var ndate = new Date(data.start_date);
                    var date = (ndate.getMonth() + 1) + '/' + ndate.getDate() + '/' + ndate.getFullYear();
                    var ndate2 = new Date(data.end_date);
                    var date2 = (ndate2.getMonth() + 1) + '/' + ndate2.getDate() + '/' + ndate2.getFullYear();

                    tempar.push({
                        eid: data.eid, l_id: data.l_id, ename: data.ename, reportingPerson: data.reportingPerson,
                        l_reason: data.l_reason, l_reason2: data.l_reason2, start_date: date, end_date: date2, l_status: data.l_status
                        , l_type: data.l_type, l_category: data.l_category, s_date: data.start_date, e_date: data.end_date, approvedBy: data.approvedBy
                    ,l_days:data.l_days}
                    )
                }
            })

            res.send({ leave: tempar });

        })

    } catch (err) {
        console.error(err)
    }

};
exports.pendingLeaveAll = async (req, res) => {
    try {


        // const id = req.params.id;
        const tempar = [
        ]
        LeaveManage.find({  }).then(function (leaveManage) {
            var ar3 = leaveManage;
            var sdate = new Date();
            ar3.map((data) => {
                if (data.l_status === "pending") {
                    var ndate = new Date(data.start_date);
                    var date = (ndate.getMonth() + 1) + '/' + ndate.getDate() + '/' + ndate.getFullYear();
                    var ndate2 = new Date(data.end_date);
                    var date2 = (ndate2.getMonth() + 1) + '/' + ndate2.getDate() + '/' + ndate2.getFullYear();

                    tempar.push({
                        eid: data.eid, l_id: data.l_id, ename: data.ename, reportingPerson: data.reportingPerson,
                        l_reason: data.l_reason, l_reason2: data.l_reason2, start_date: date, end_date: date2, l_status: data.l_status
                        , l_type: data.l_type, l_category: data.l_category, s_date: data.start_date, e_date: data.end_date, approvedBy: data.approvedBy
                    ,l_days:data.l_days}
                    )
                }
            })

            res.send({ leave: tempar });

        })

    } catch (err) {
        console.error(err)
    }

};

exports.detailPersonal = async (req, res) => {
    try {
        const offId = req.params.id;

        EmployeeDetails1.findOne({ offId: offId }, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);
            console.log("oooooooooooooo      1181" + employeedetails1);
            res.send(employeedetails1);
        })
    } catch (err) {
        console.error(err)
    }

};


exports.leaveReport = async (req, res) => {
    try {
        const eid = req.params.id;
        console.warn(".................................................................line1087");


        LeaveInfo.find({ eid: eid }, (err, leaveInfo) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(leaveInfo + ".................................................................line1096");
            res.send(leaveInfo);
        })
    } catch (err) {
        console.error(err)
    }

};