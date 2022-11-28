
const db = require("../models");
// const config = require("../config/auth.config");
// const Role = db.role;
// const EmployeeDetails1 = db.EmployeeDetails1;
// const LeaveInfo = db.LeaveInfo;
// const EmployeeDetailsLogin = db.EmployeeDetailsLogin;
const EventsInfo = db.EventsInfo;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const date_format=(d)=>{
    var e=new Date(d)
    
    const day=e.getDate();
    const mon=e.getMonth();
    const year=e.getFullYear();

    return day+"/"+mon+"/"+year
}
exports.getEvents = async (req, res) => {
    try {
        EventsInfo.find({}, (err, eventsInfo) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(eventsInfo);
            //res.json(employeedetails);
            res.send(eventsInfo);
        })
    } catch (err) {
        console.error(err)
    }

};


exports.addEvent = async (req, res) => {
    try {
        const {
            // role_id,
            // role_name,
            event_name,
        
            event_type,
        event_detail,
        event_date,
            sys_user

        } = req.body;
        const today = new Date();
        const hour = today.getHours();
        const min = today.getMinutes();
        const sec = today.getSeconds();
        const day = today.getDay();
        const mont = today.getMonth();
        const year = today.getFullYear();

        const oldEvent = await EventsInfo.findOne({ event_name:event_name });
        const oldEvent2 = await EventsInfo.find({});
        
        const len = oldEvent2.length + 1;

        if (oldEvent) {
            res.send({ message: " Event is alredy exist, try another", val2: "false",val: "true" })
 }
        else {
            const eventsInfo = new EventsInfo({
                event_id: "eve" +len,
                event_name,
        
            event_type,
        event_detail,
        event_date,
createdBy: sys_user,
                updatedBy: sys_user,
                cr_time: new Date(),
                up_date: new Date()
            });
            eventsInfo.save(err => {
                if (err) {
                    res.send(err)
                }

                else {

                    res.send({ message2: "successfully registered event", val2: "true",val: "false" })
  }
            })
        }
    } catch (err) {
        console.error(err)
    }

};

exports.updateEvent = async (req, res) => {
    try {
        // const  id = req.body.id;
        const id = req.body.event_id;
        const event_type=req.body.event_type;
        const event_name = req.body.event_name;
        const event_detail=req.body.event_detail;
        const event_date=req.body.event_date;
        const sys_user = req.body.sys_user;
        await EventsInfo.findOne({ event_id: id }, (err, eventsInfo) => {
                // eventsInfo.event_id= "eve" + hour + min + sec + day + mont + year,
                eventsInfo.event_name=event_name,
        
                eventsInfo.event_type=event_type,
                eventsInfo.event_detail=event_detail,
                eventsInfo.event_date=event_date,
                // eventsInfo.createdBy= sys_user,
                eventsInfo.updatedBy= sys_user,
                // eventsInfo.cr_time= new Date(),
                eventsInfo.up_date= new Date()
           
                eventsInfo.save();
            // res.send("Role updated");
            res.send({ message2: "Event successfully updated", val2: "true",val: "false" })
  
        });
        // res.send({ message2: "Role successfully updated", val2: "true",val: "false" })
  
    }
    catch (err) {
        console.log(err);
    }
};
