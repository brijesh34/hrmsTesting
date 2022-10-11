const db = require("../models");
const ProjectInfo = db.ProjectInfo;
// const ProjectInfo=db.ProjectInfo;
exports.projectInfo = async (req, res) => {
    try {
        ProjectInfo.find({}, (err, projectInfo) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(projectInfo);
            //res.json(employeedetails);
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
             pname, pstatus, phead, pdescription ,sys_user} = req.body;
             const today = new Date();
        const hour=today.getHours();
        const min=today.getMinutes();
      const sec=today.getSeconds();
      const day=today.getDay();
      const mont=today.getMonth();
      const year=today.getFullYear(); 
        const oldProject = await ProjectInfo.findOne({pname:pname});
        if (oldProject) {
            // return res.sendStatus(409).sendStatus("project is already existed");
            res.send({ message2: " Project is alredy exist, try another", val: false })
        }
        else {
            const projectInfo = new ProjectInfo({
                pid:"proj"+hour+min+sec+day+mont+year,
                 pname, pstatus, phead, pdescription,
                createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()
            });
            projectInfo.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    console.log("line no----------------------->399")
                    res.send({ message: "successfully registered project", val2: true })
                }
            })
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
const sys_user=req.body.sys_user;
        await ProjectInfo.findOne({ pid: pid }, (err, projectInfo) => {
            projectInfo.pid = pid;

            projectInfo.pname = pname;
            projectInfo.pstatus = pstatus;
            projectInfo.phead = phead;
            projectInfo.pdescription = pdescription;
            projectInfo.createdBy=sys_user,
            projectInfo.updatedBy=sys_user,
            projectInfo.cr_time=new Date(),
            projectInfo.up_date=new Date(),
            projectInfo.save();
            // res.send("Project info updated");
            res.send({ message: " Data updated successfully", val: false , val2: true})
        });

    } catch (err) {
        console.error(err)
    }

};


