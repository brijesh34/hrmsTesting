const db = require("../models");
const ProjectInfo = db.ProjectInfo;
exports.projectInfo = async (req, res) => {
    try {
        ProjectInfo.find({}, (err, projectInfo) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(projectInfo);
            res.send(projectInfo);
        })

    } catch (err) {
        console.error(err)
    }

};

exports.addProject = async (req, res) => {
    try {
        const {
            // pid,
            pname, pstatus, phead, pdescription, sys_user } = req.body;
        const today = new Date();
        const hour = today.getHours();
        const min = today.getMinutes();
        const sec = today.getSeconds();
        const day = today.getDay();
        const mont = today.getMonth();
        const year = today.getFullYear();
        const oldProject = await ProjectInfo.findOne({ pname: pname });
        const oldProject2 = await ProjectInfo.find({});
        const len = oldProject2.length + 1;
       
        if (oldProject) {
            res.send({ message: " Project is alredy exist, try another", val2: "false",val: true })
        }
        else {
            const projectInfo = new ProjectInfo({
                pid: "proj"+len,
                pname, pstatus, phead, pdescription,
                createdBy: sys_user,
                updatedBy: sys_user,
                cr_time: new Date(),
                up_date: new Date()
            });
            projectInfo.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    console.log("line no----------------------->399")
                    // res.send({ message2: "successfully registered project", val2: true,val: false })
                }
            })
            res.send({ message2: "successfully registered project", val2: "true",val: "false" })
                
        }

    } catch (err) {
        console.error(err)
    }

};

exports.updateProject = async (req, res) => {
    try {
        const pid = req.body.pid;
        const pname = req.body.pname;
        const pstatus = req.body.pstatus;
        const phead = req.body.phead;
        const pdescription = req.body.pdescription;
        const sys_user = req.body.sys_user;
        await ProjectInfo.findOne({ pid: pid }, (err, projectInfo) => {
            projectInfo.pid = pid;

            projectInfo.pname = pname;
            projectInfo.pstatus = pstatus;
            projectInfo.phead = phead;
            projectInfo.pdescription = pdescription;
            projectInfo.createdBy = sys_user,
                projectInfo.updatedBy = sys_user,
                projectInfo.cr_time = new Date(),
                projectInfo.up_date = new Date(),
                projectInfo.save();
                // res.send({ message2: "successfully registered project", val2: "true",val: "false" })
          
                res.send({ message2: " Data updated successfully", val: "false", val2: "true" })
        });

    } catch (err) {
        console.error(err)
        // res.send({ message: err, val: "true",val2: "false" })
          
    }

};


