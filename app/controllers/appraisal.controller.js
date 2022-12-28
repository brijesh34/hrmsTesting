const db = require("../models");
const AppraisalInfo = db.AppraisalInfo;
const EmployeeDetails1 = db.EmployeeDetails1;
const sendEmail3 = require("../../utils/sendEmail3");

const EmployeeDetailsLogin = db.EmployeeDetailsLogin;

exports.getAppraisalPool = async (req, res) => {
        try {
                const tempar = [
                ]

                AppraisalInfo.find({}, (err, appraisalInfo) => {
                        if (err) {
                                console.warn(err)
                                return next(err)
                        }
                        var ar3 = appraisalInfo;
                        ar3.map((data) => {
                                if ((data.status == "submitted") || (data.status == "appraised") || (data.status == "In Process")) {
                                        tempar.push(data)
                                }
                        })

                        res.send(tempar);
                })

        } catch (err) {
                console.error(err)
        }

};


exports.addNewAppraisal = async (req, res) => {
        try {

                const {
                        EmpId,
                        cycle,
                        reviewappariser,
                        HrName,
                        sys_user,
                } = req.body;
                console.log(cycle + ".....................................................line 1059");
                const today = new Date();
                const hour = today.getHours();
                const min = today.getMinutes();
                const sec = today.getSeconds();
                const day = today.getDay();
                const mont = today.getMonth();
                const year = today.getFullYear();
                const oldProject = await AppraisalInfo.findOne({ EmpId });
                const oldUser = await EmployeeDetails1.findOne({ EmpId });
                const oldUser3 = await EmployeeDetails1.findOne({ offId: EmpId });
                const oldUser4 = await EmployeeDetails1.findOne({ offId: reviewappariser });
                const oldUser5 = await EmployeeDetails1.findOne({ offId: HrName });
                const em = oldUser3.offEmail;
                const em2 = oldUser4.offEmail;
                const em3 = oldUser5.offEmail;

                const EmployeeNam = oldUser3.name;
                const ManagerNam = oldUser3.ReportingManager;
                const Designatio = oldUser3.jobType;
                const doh = oldUser3.DoJ;
                const doh_year = doh.getFullYear();
                const exp = (year - doh_year) + (mont - doh.getMonth());
                const departmen = oldUser3.department;
                const experienc = oldUser3.noExp;
                const TotalExperienc = oldUser3.noExp + exp;
                const Lastupdate = new Date();
                if (oldProject && (oldProject.status == "In Process")) {
                        res.send({ message2: " Appraisal is alredy exist, try another", val: false })
                }
                else {

                        console.log("==============line 1089" + em);
                        const appraisalInfo = new AppraisalInfo({
                                aprId: "aprr" + hour + min + sec + day + mont + year,
                                EmployeeName: EmployeeNam,
                                ManagerName: ManagerNam,
                                Designation: Designatio,
                                EmpId: EmpId,
                                doj: doh,

                                department: 'IT',
                                TotalExperience: TotalExperienc,
                                experience: experienc,
                                cycle,
                                reviewappariser,
                                HrName,
                                Lastupdate: Lastupdate,

                                status: "In Process",
                                submission_date: new Date(),

                                createdBy: sys_user,
                                updatedBy: sys_user,
                                cr_time: new Date(),
                                up_date: new Date()
                        });
                        appraisalInfo.save(err => {
                                if (err) {
                                        res.send({ message: "err", val2: true })
                                }
                                else {
                                        sendEmail3(em, "Appraisal  of " + EmpId, em2, em3, "Appraisal is started, Please Chaeck on system");

                                        sendEmail3(em2, "Appraisal  of "+ EmpId, em2, em3, '',"Appraisal is started, Please Chaeck on system")
                                        res.send({ message2: "successfully registered Appraisal", val2: "true",val: "false" })
  
                                }
                        })
                }
        } catch (err) {
                console.error(err)
        }

};


exports.updateAppraisal = async (req, res) => {
        try {
                const aprId = req.body.aprId;
                const EmployeeName = req.body.EmployeeName;
                const ManagerName = req.body.ManagerName;
                const Designation = req.body.Designation;
                const EmpId = req.body.EmpId;
                const doj = req.body.doj;
                const status = req.body.status;

                const
                        submission_date = req.body.submission_date;
                const
                        department = req.body.department;
                const
                        TotalExperience = req.body.TotalExperience;
                const
                        experience = req.body.experience;
                const
                        cycle = req.body.cycle;
                const
                        reviewappariser = req.body.reviewappariser;
                const
                        HrName = req.body.HrName;
                const
                        Lastupdate = req.body.Lastupdate;

                // ----------------------Domain and Teachnology----------------------------ab.;
                const
                        Dom_Tech_ER_1 = req.body.Dom_Tech_ER_1;
                const
                        Dom_Tech_EC_1 = req.body.Dom_Tech_EC_1;
                const
                        Dom_Tech_MR_1 = req.body.Dom_Tech_MR_1;
                const
                        Dom_Tech_MC_1 = req.body.Dom_Tech_MC_1;
                //---------------------- Understanding function and Technology-----------------------------------ab.;
                const
                        Un_fun_ER_1 = req.body.Un_fun_ER_1;
                const
                        Un_fun_EC_1 = req.body.Un_fun_EC_1;
                const
                        Un_fun_MR_1 = req.body.Un_fun_MR_1;
                const
                        Un_fun_MC_1 = req.body.Un_fun_MC_1;
                //------------------------------Usage of tools----------------------ab.;
                const
                        Usage_Tools_ER_1 = req.body.Usage_Tools_ER_1;
                const
                        Usage_Tools_EC_1 = req.body.Usage_Tools_EC_1;
                const
                        Usage_Tools_MR_1 = req.body.Usage_Tools_MR_1;
                const
                        Usage_Tools_MC_1 = req.body.Usage_Tools_MC_1;
                // -------------------------Ability to learn Technology---------------------ab.;
                const
                        Ability_learn_ER_1 = req.body.Ability_learn_ER_1;
                const
                        Ability_learn_EC_1 = req.body.Ability_learn_EC_1;
                const
                        Ability_learn_MR_1 = req.body.Ability_learn_MR_1;
                const
                        Ability_learn_MC_1 = req.body.Ability_learn_MC_1;

                const
                        procedure_eqality_ER_2 = req.body.procedure_eqality_ER_2;
                const
                        procedure_eqality_EC_2 = req.body.procedure_eqality_EC_2;
                const
                        procedure_eqality_MC_2 = req.body.procedure_eqality_MC_2;
                const
                        procedure_eqality_MR_2 = req.body.procedure_eqality_MR_2;

                const
                        problem_finding_skill_ER_2 = req.body.problem_finding_skill_ER_2;
                const
                        problem_finding_skill_EC_2 = req.body.problem_finding_skill_EC_2;
                const
                        problem_finding_skill_MR_2 = req.body.problem_finding_skill_MR_2;
                const
                        problem_finding_skill_MC_2 = req.body.problem_finding_skill_MC_2;

                const
                        contribute_mentor_help_ER_3 = req.body.contribute_mentor_help_ER_3;
                const
                        contribute_mentor_help_EC_3 = req.body.contribute_mentor_help_EC_3;
                const
                        contribute_mentor_help_MC_3 = req.body.contribute_mentor_help_MC_3;
                const
                        contribute_mentor_help_MR_3 = req.body.contribute_mentor_help_MR_3;

                const
                        professional_relationship_ER_3 = req.body.professional_relationship_ER_3;
                const
                        professional_relationship_EC_3 = req.body.professional_relationship_EC_3;
                const
                        professional_relationship_MR_3 = req.body.professional_relationship_MR_3;
                const
                        professional_relationship_MC_3 = req.body.professional_relationship_MC_3;

                const
                        challenges_responsibility_ER_4 = req.body.challenges_responsibility_ER_4;
                const
                        challenges_responsibility_EC_4 = req.body.challenges_responsibility_EC_4;
                const
                        challenges_responsibility_MR_4 = req.body.challenges_responsibility_MR_4;
                const
                        challenges_responsibility_MC_4 = req.body.challenges_responsibility_MC_4;

                const
                        Ideas_knowledge_ER_4 = req.body.Ideas_knowledge_ER_4;
                const
                        Ideas_knowledge_EC_4 = req.body.Ideas_knowledge_EC_4;
                const
                        Ideas_knowledge_MR_4 = req.body.Ideas_knowledge_MR_4;
                const
                        Ideas_knowledge_MC_4 = req.body.Ideas_knowledge_MC_4;

                const
                        Listen_understand_info_ER_5 = req.body.Listen_understand_info_ER_5;
                const
                        Listen_understand_info_EC_5 = req.body.Listen_understand_info_EC_5;
                const
                        Listen_understand_info_MR_5 = req.body.Listen_understand_info_MR_5;
                const
                        Listen_understand_info_MC_5 = req.body.Listen_understand_info_MC_5;

                const
                        info_clear_EC_5 = req.body.info_clear_EC_5;
                const
                        info_clear_ER_5 = req.body.info_clear_ER_5;
                const
                        info_clear_MC_5 = req.body.info_clear_MC_5;
                const
                        info_clear_MR_5 = req.body.info_clear_MR_5;

                const
                        Plan_Schedules_ER_6 = req.body.Plan_Schedules_ER_6;
                const
                        Plan_Schedules_EC_6 = req.body.Plan_Schedules_EC_6;
                const
                        Plan_Schedules_MR_6 = req.body.Plan_Schedules_MR_6;
                const
                        Plan_Schedules_MC_6 = req.body.Plan_Schedules_MC_6;

                const
                        Effective_work_EC_6 = req.body.Effective_work_EC_6;
                const
                        Effective_work_ER_6 = req.body.Effective_work_ER_6;
                const
                        Effective_work_MR_6 = req.body.Effective_work_MR_6;
                const
                        Effective_work_MC_6 = req.body.Effective_work_MC_6;

                const
                        Management_ER_6 = req.body.Management_ER_6;
                const
                        Management_EC_6 = req.body.Management_EC_6;
                const
                        Management_MC_6 = req.body.Management_MC_6;
                const
                        Management_MR_6 = req.body.Management_MR_6;

                const
                        accomplishment_ER_6 = req.body.accomplishment_ER_6;
                const
                        accomplishment_MR_6 = req.body.accomplishment_MR_6;
                const
                        accomplishment_EC_6 = req.body.accomplishment_EC_6;
                const
                        accomplishment_MC_6 = req.body.accomplishment_MC_6;

                const
                        customer_relationship_EC_7 = req.body.customer_relationship_EC_7;
                const
                        customer_relationship_ER_7 = req.body.customer_relationship_ER_7;
                const
                        customer_relationship_MC_7 = req.body.customer_relationship_MC_7;
                const
                        customer_relationship_MR_7 = req.body.customer_relationship_MR_7;

                const
                        Depend_reliability_ER_7 = req.body.Depend_reliability_ER_7;
                const
                        Depend_reliability_EC_7 = req.body.Depend_reliability_EC_7;
                const
                        Depend_reliability_MR_7 = req.body.Depend_reliability_MR_7;
                const
                        Depend_reliability_MC_7 = req.body.Depend_reliability_MC_7;

                const
                        policies_EC_7 = req.body.policies_EC_7;
                const
                        policies_ER_7 = req.body.policies_ER_7;
                const
                        policies_MR_7 = req.body.policies_MR_7;
                const
                        policies_MC_7 = req.body.policies_MC_7;

                const
                        Resilience_ER_7 = req.body.Resilience_ER_7;
                const
                        Resilience_EC_7 = req.body.Resilience_EC_7;
                const
                        Resilience_MC_7 = req.body.Resilience_MC_7;
                const
                        Resilience_MR_7 = req.body.Resilience_MR_7;

                const
                        semiannual_EC_8 = req.body.semiannual_EC_8;
                const
                        semiannual_ER_8 = req.body.semiannual_ER_8;
                const
                        semiannual_MC_8 = req.body.semiannual_MC_8;
                const
                        semiannual_MR_8 = req.body.semiannual_MR_8;

                const
                        semiannual2_EC_8 = req.body.semiannual2_EC_8;
                const
                        semiannual2_ER_8 = req.body.semiannual2_ER_8;
                const
                        semiannual2_MC_8 = req.body.semiannual2_MC_8;
                const
                        semiannual2_MR_8 = req.body.semiannual2_MR_8;

                const
                        EC_10_1_3 = req.body.EC_10_1_3;
                const
                        MC_10_1_4 = req.body.MC_10_1_4;

                const
                        EC_10_2_3 = req.body.EC_10_2_3;
                const
                        MC_10_2_4 = req.body.MC_10_2_4;

                const
                        EC_10_3_3 = req.body.EC_10_3_3;
                const
                        MC_10_3_4 = req.body.MC_10_2_4;

                const
                        EC_10_4_3 = req.body.EC_10_4_3;
                const
                        MC_10_4_4 = req.body.MC_10_4_4;

                const
                        EC_10_5_3 = req.body.EC_10_5_3;
                const
                        MC_10_5_4 = req.body.MC_10_5_4;

                const
                        EC_10_6_3 = req.body.EC_10_6_3;
                const
                        MC_10_6_4 = req.body.MC_10_6_4;

                const
                        EC_10_7_3 = req.body.EC_10_7_3;
                const
                        MC_10_7_4 = req.body.MC_10_7_4;

                const
                        EC_10_8_3 = req.body.EC_10_8_3;
                const
                        MC_10_8_4 = req.body.MC_10_8_4;

                const
                        ER_9_1_3 = req.body.ER_9_1_3;
                const
                        EC_9_1_4 = req.body.EC_9_1_3;
                const
                        MR_9_1_5 = req.body.MR_9_1_5;
                const
                        MC_9_1_6 = req.body.MC_9_1_6;

                const
                        ER_9_2_3 = req.body.ER_9_2_3;
                const
                        EC_9_2_4 = req.body.EC_9_2_4;
                const
                        MC_9_2_6 = req.body.MC_9_2_6;
                const
                        MR_9_2_5 = req.body.MR_9_2_5;

                const
                        ER_9_3_3 = req.body.ER_9_3_3;
                const
                        EC_9_3_4 = req.body.EC_9_3_4;
                const
                        MC_9_3_6 = req.body.MC_9_3_6;
                const
                        MR_9_3_5 = req.body.MR_9_3_5;

                const
                        ER_9_4_3 = req.body.ER_9_4_3;
                const
                        EC_9_4_4 = req.body.EC_9_4_4;
                const
                        MC_9_4_6 = req.body.MC_9_4_6;
                const
                        MR_9_4_5 = req.body.MR_9_4_5;

                const
                        TER = req.body.TER;
                const
                        TMR = req.body.TMR;
                const
                        Taverage = req.body.Taverage;
                const
                        TavgMR = req.body.TavgMR;

                const
                        EC_over = req.body.EC_over;
                const
                        MC_over = req.body.MC_over;
                const
                        total_average_ER1 = req.body.total_average_ER1;
                const
                        total_average_MR1 = req.body.total_average_MR1;

                const
                        total_average_ER2 = req.body.total_average_ER2;
                const
                        total_average_MR2 = req.body.total_average_MR2;
                //         const oldUser =  EmployeeDetails1.findOne({offId:email });
                //    console.log("==============line 3163"+ oldUser.offEmail)
                const oldUser3 = await EmployeeDetails1.findOne({ offId: EmpId });
                const oldUser4 = await EmployeeDetails1.findOne({ offId: reviewappariser });
                const oldUser5 = await EmployeeDetails1.findOne({ offId: HrName });
                const em = oldUser3.offEmail;
                const em2 = oldUser4.offEmail;
                const em3 = oldUser5.offEmail;

                await AppraisalInfo.findOne({ aprId: aprId }, (err, AppraisalInfo) => {
                        AppraisalInfo.EmployeeName = EmployeeName,
                                AppraisalInfo.ManagerName = ManagerName,
                                AppraisalInfo.Designation = Designation,
                                AppraisalInfo.EmpId = EmpId,
                                AppraisalInfo.doj = doj,
                                AppraisalInfo.status = status,
                                AppraisalInfo.submission_date = submission_date,
                                AppraisalInfo.department = department,
                                AppraisalInfo.TotalExperience = TotalExperience,
                                AppraisalInfo.experience = experience,
                                AppraisalInfo.cycle = cycle,
                                AppraisalInfo.reviewappariser = reviewappariser,
                                AppraisalInfo.HrName = HrName,
                                AppraisalInfo.Lastupdate = Lastupdate,

                                // ----------------------Domain and Teachnology----------------------------ab.-
                                AppraisalInfo.
                                        Dom_Tech_ER_1 = Dom_Tech_ER_1,
                                AppraisalInfo.
                                        Dom_Tech_EC_1 = Dom_Tech_EC_1,
                                AppraisalInfo.
                                        Dom_Tech_MR_1 = Dom_Tech_MR_1,
                                AppraisalInfo.
                                        Dom_Tech_MC_1 = Dom_Tech_MC_1,

                                //---------------------- Understanding function and Technology-----------------------------------ab. 
                                AppraisalInfo.
                                        Un_fun_ER_1 = Un_fun_ER_1,
                                AppraisalInfo.
                                        Un_fun_EC_1 = Un_fun_EC_1,
                                AppraisalInfo.
                                        Un_fun_MR_1 = Un_fun_MR_1,
                                AppraisalInfo.
                                        Un_fun_MC_1 = Un_fun_MC_1,
                                //------------------------------Usage of tools----------------------ab.-
                                AppraisalInfo.
                                        Usage_Tools_ER_1 = Usage_Tools_ER_1,
                                AppraisalInfo.
                                        Usage_Tools_EC_1 = Usage_Tools_EC_1,
                                AppraisalInfo.
                                        Usage_Tools_MR_1 = Usage_Tools_MR_1,
                                AppraisalInfo.
                                        Usage_Tools_MC_1 = Usage_Tools_MC_1,
                                // -------------------------Ability to learn Technology---------------------ab.-
                                AppraisalInfo.
                                        Ability_learn_ER_1 = Ability_learn_ER_1,
                                AppraisalInfo.
                                        Ability_learn_EC_1 = Ability_learn_EC_1,
                                AppraisalInfo.
                                        Ability_learn_MR_1 = Ability_learn_MR_1,
                                AppraisalInfo.
                                        Ability_learn_MC_1 = Ability_learn_MC_1,

                                AppraisalInfo.
                                        procedure_eqality_ER_2 = procedure_eqality_ER_2,
                                AppraisalInfo.
                                        procedure_eqality_EC_2 = procedure_eqality_EC_2,
                                AppraisalInfo.
                                        procedure_eqality_MC_2 = procedure_eqality_MC_2,
                                AppraisalInfo.
                                        procedure_eqality_MR_2 = procedure_eqality_MR_2,
                                AppraisalInfo.
                                        problem_finding_skill_ER_2 = problem_finding_skill_ER_2,
                                AppraisalInfo.
                                        problem_finding_skill_EC_2 = problem_finding_skill_EC_2,
                                AppraisalInfo.
                                        problem_finding_skill_MR_2 = problem_finding_skill_MR_2,
                                AppraisalInfo.
                                        problem_finding_skill_MC_2 = problem_finding_skill_MC_2,

                                AppraisalInfo.
                                        contribute_mentor_help_ER_3 = contribute_mentor_help_ER_3,
                                AppraisalInfo.
                                        contribute_mentor_help_EC_3 = contribute_mentor_help_EC_3,
                                AppraisalInfo.
                                        contribute_mentor_help_MC_3 = contribute_mentor_help_MC_3,
                                AppraisalInfo.
                                        contribute_mentor_help_MR_3 = contribute_mentor_help_MR_3,
                                AppraisalInfo.
                                        professional_relationship_ER_3 = professional_relationship_ER_3,
                                AppraisalInfo.
                                        professional_relationship_EC_3 = professional_relationship_EC_3,
                                AppraisalInfo.
                                        professional_relationship_MR_3 = professional_relationship_MR_3,
                                AppraisalInfo.
                                        professional_relationship_MC_3 = professional_relationship_MC_3,
                                AppraisalInfo.
                                        challenges_responsibility_ER_4 = challenges_responsibility_ER_4,
                                AppraisalInfo.
                                        challenges_responsibility_EC_4 = challenges_responsibility_EC_4,
                                AppraisalInfo.
                                        challenges_responsibility_MR_4 = challenges_responsibility_MR_4,
                                AppraisalInfo.
                                        challenges_responsibility_MC_4 = challenges_responsibility_MC_4,
                                AppraisalInfo.
                                        Ideas_knowledge_ER_4 = Ideas_knowledge_ER_4,
                                AppraisalInfo.
                                        Ideas_knowledge_EC_4 = Ideas_knowledge_EC_4,
                                AppraisalInfo.
                                        Ideas_knowledge_MR_4 = Ideas_knowledge_MR_4,
                                AppraisalInfo.
                                        Ideas_knowledge_MC_4 = Ideas_knowledge_MC_4,
                                AppraisalInfo.
                                        Listen_understand_info_ER_5 = Listen_understand_info_ER_5,
                                AppraisalInfo.
                                        Listen_understand_info_EC_5 = Listen_understand_info_EC_5,
                                AppraisalInfo.
                                        Listen_understand_info_MR_5 = Listen_understand_info_MR_5,
                                AppraisalInfo.
                                        Listen_understand_info_MC_5 = Listen_understand_info_MC_5,
                                AppraisalInfo.
                                        info_clear_EC_5 = info_clear_EC_5,
                                AppraisalInfo.
                                        info_clear_ER_5 = info_clear_ER_5,
                                AppraisalInfo.
                                        info_clear_MC_5 = info_clear_MC_5,
                                AppraisalInfo.
                                        info_clear_MR_5 = info_clear_MR_5,
                                AppraisalInfo.
                                        Plan_Schedules_ER_6 = Plan_Schedules_ER_6,
                                AppraisalInfo.
                                        Plan_Schedules_EC_6 = Plan_Schedules_EC_6,
                                AppraisalInfo.
                                        Plan_Schedules_MR_6 = Plan_Schedules_MR_6,
                                AppraisalInfo.
                                        Plan_Schedules_MC_6 = Plan_Schedules_MC_6,
                                AppraisalInfo.
                                        Effective_work_EC_6 = Effective_work_EC_6,
                                AppraisalInfo.
                                        Effective_work_ER_6 = Effective_work_ER_6,
                                AppraisalInfo.
                                        Effective_work_MR_6 = Effective_work_MR_6,
                                AppraisalInfo.
                                        Effective_work_MC_6 = Effective_work_MC_6,
                                AppraisalInfo.
                                        Management_ER_6 = Management_ER_6,
                                AppraisalInfo.
                                        Management_EC_6 = Management_EC_6,
                                AppraisalInfo.
                                        Management_MC_6 = Management_MC_6,
                                AppraisalInfo.
                                        Management_MR_6 = Management_MR_6,
                                AppraisalInfo.
                                        accomplishment_ER_6 = accomplishment_ER_6,
                                AppraisalInfo.
                                        accomplishment_MR_6 = accomplishment_MR_6,
                                AppraisalInfo.
                                        accomplishment_EC_6 = accomplishment_EC_6,
                                AppraisalInfo.
                                        accomplishment_MC_6 = accomplishment_MC_6,
                                AppraisalInfo.
                                        customer_relationship_EC_7 = customer_relationship_EC_7,
                                AppraisalInfo.
                                        customer_relationship_ER_7 = customer_relationship_ER_7,
                                AppraisalInfo.
                                        customer_relationship_MC_7 = customer_relationship_MC_7,
                                AppraisalInfo.
                                        customer_relationship_MR_7 = customer_relationship_MR_7,
                                AppraisalInfo.
                                        Depend_reliability_ER_7 = Depend_reliability_ER_7,
                                AppraisalInfo.
                                        Depend_reliability_EC_7 = Depend_reliability_EC_7,
                                AppraisalInfo.
                                        Depend_reliability_MR_7 = Depend_reliability_MR_7,
                                AppraisalInfo.
                                        Depend_reliability_MC_7 = Depend_reliability_MC_7,
                                AppraisalInfo.
                                        policies_EC_7 = policies_EC_7,
                                AppraisalInfo.
                                        policies_ER_7 = policies_ER_7,
                                AppraisalInfo.
                                        policies_MR_7 = policies_MR_7,
                                AppraisalInfo.
                                        policies_MC_7 = policies_MC_7,
                                AppraisalInfo.
                                        Resilience_ER_7 = Resilience_ER_7,
                                AppraisalInfo.
                                        Resilience_EC_7 = Resilience_EC_7,
                                AppraisalInfo.
                                        Resilience_MC_7 = Resilience_MC_7,
                                AppraisalInfo.
                                        Resilience_MR_7 = Resilience_MR_7,
                                AppraisalInfo.
                                        semiannual_EC_8 = semiannual_EC_8,
                                AppraisalInfo.
                                        semiannual_ER_8 = semiannual_ER_8,
                                AppraisalInfo.
                                        semiannual_MC_8 = semiannual_MC_8,
                                AppraisalInfo.
                                        semiannual_MR_8 = semiannual_MR_8,
                                AppraisalInfo.
                                        semiannual2_EC_8 = semiannual2_EC_8,
                                AppraisalInfo.
                                        semiannual2_ER_8 = semiannual2_ER_8,
                                AppraisalInfo.
                                        semiannual2_MC_8 = semiannual2_MC_8,
                                AppraisalInfo.
                                        semiannual2_MR_8 = semiannual2_MR_8,
                                AppraisalInfo.
                                        EC_10_1_3 = EC_10_1_3,
                                AppraisalInfo.
                                        MC_10_1_4 = MC_10_1_4,
                                AppraisalInfo.
                                        EC_10_2_3 = EC_10_2_3,
                                AppraisalInfo.
                                        MC_10_2_4 = MC_10_2_4,
                                AppraisalInfo.
                                        EC_10_3_3 = EC_10_3_3,
                                AppraisalInfo.
                                        MC_10_3_4 = MC_10_2_4,
                                AppraisalInfo.
                                        EC_10_4_3 = EC_10_4_3,
                                AppraisalInfo.
                                        MC_10_4_4 = MC_10_4_4,
                                AppraisalInfo.
                                        EC_10_5_3 = EC_10_5_3,
                                AppraisalInfo.
                                        MC_10_5_4 = MC_10_5_4,
                                AppraisalInfo.
                                        EC_10_6_3 = EC_10_6_3,
                                AppraisalInfo.
                                        MC_10_6_4 = MC_10_6_4,
                                AppraisalInfo.
                                        EC_10_7_3 = EC_10_7_3,
                                AppraisalInfo.
                                        MC_10_7_4 = MC_10_7_4,
                                AppraisalInfo.
                                        EC_10_8_3 = EC_10_8_3,
                                AppraisalInfo.
                                        MC_10_8_4 = MC_10_8_4,
                                AppraisalInfo.
                                        ER_9_1_3 = ER_9_1_3,
                                AppraisalInfo.
                                        EC_9_1_4 = EC_9_1_4,
                                AppraisalInfo.
                                        MR_9_1_5 = MR_9_1_5,
                                AppraisalInfo.
                                        MC_9_1_6 = MC_9_1_6,
                                AppraisalInfo.
                                        ER_9_2_3 = ER_9_2_3,
                                AppraisalInfo.
                                        EC_9_2_4 = EC_9_2_4,
                                AppraisalInfo.
                                        MC_9_2_6 = MC_9_2_6,
                                AppraisalInfo.
                                        MR_9_2_5 = MR_9_2_5,
                                AppraisalInfo.
                                        ER_9_3_3 = ER_9_3_3,
                                AppraisalInfo.
                                        EC_9_3_4 = EC_9_3_4,
                                AppraisalInfo.
                                        MC_9_3_6 = MC_9_3_6,
                                AppraisalInfo.
                                        MR_9_3_5 = MR_9_3_5,
                                AppraisalInfo.
                                        ER_9_4_3 = ER_9_4_3,
                                AppraisalInfo.
                                        EC_9_4_4 = EC_9_4_4,
                                AppraisalInfo.
                                        MC_9_4_6 = MC_9_4_6,
                                AppraisalInfo.
                                        MR_9_4_5 = MR_9_4_5,
                                AppraisalInfo.
                                        TER = TER,
                                AppraisalInfo.
                                        TMR = TMR,
                                AppraisalInfo.
                                        Taverage = Taverage,
                                AppraisalInfo.
                                        TavgMR = TavgMR,
                                AppraisalInfo.
                                        EC_over = EC_over,
                                AppraisalInfo.
                                        MC_over = MC_over,
                                AppraisalInfo.
                                        total_average_ER1 = total_average_ER1,
                                AppraisalInfo.
                                        total_average_MR1 = total_average_MR1,
                                AppraisalInfo.
                                        total_average_ER2 = total_average_ER2,
                                AppraisalInfo.
                                        total_average_MR2 = total_average_MR2,
                                AppraisalInfo.save();
                        sendEmail3(em, "Appraisal  of " + EmpId, em2, em3, "Appraisal Information Updated, Please Chaeck on system");
                       if(status=="submitted"){
                        res.send({ message2: "data successfully submitted ", val2: "true",val: "false" })
                       }
                       else{
                        res.send({ message2: "data successfully saved ", val2: "true",val: "false" })
  
                       }

                });
        } catch (err) {
                console.error(err)
        }

};


exports.cancelAppraisal = async (req, res) => {
        try {
                const l_id = req.params.id;
                const eid = req.body.eid;
                const mess = req.body.message;
                const oldUser = await EmployeeDetailsLogin.findOne({ emp_id: eid });
                const oldUser2 = await EmployeeDetailsLogin.findOne({ emp_id: l_id });

                await AppraisalInfo.deleteOne({ EmpId: eid });

                res.send("deleted");

        } catch (err) {
                console.error(err)
        }

};



exports.editByEmployee = async (req, res) => {
        try {
                const id = req.body.id;
                const aprId = req.body.aprId;
                const EmployeeName = req.body.EmployeeName;
                const ManagerName = req.body.ManagerName;
                const Designation = req.body.Designation;
                const EmpId = req.body.EmpId;
                const doj = req.body.doj;
                const status = req.body.status;

                const
                        submission_date = req.body.submission_date;
                const
                        department = req.body.department;
                const
                        TotalExperience = req.body.TotalExperience;
                const
                        experience = req.body.experience;
                const
                        cycle = req.body.cycle;
                const
                        reviewappariser = req.body.reviewappariser;
                const
                        HrName = req.body.HrName;
                const
                        Lastupdate = req.body.Lastupdate;

                // ----------------------Domain and Teachnology----------------------------ab.;
                const
                        Dom_Tech_ER_1 = req.body.Dom_Tech_ER_1;
                const
                        Dom_Tech_EC_1 = req.body.Dom_Tech_EC_1;
                const
                        Dom_Tech_MR_1 = req.body.Dom_Tech_MR_1;
                const
                        Dom_Tech_MC_1 = req.body.Dom_Tech_MC_1;
                //---------------------- Understanding function and Technology-----------------------------------ab.;
                const
                        Un_fun_ER_1 = req.body.Un_fun_ER_1;
                const
                        Un_fun_EC_1 = req.body.Un_fun_EC_1;
                const
                        Un_fun_MR_1 = req.body.Un_fun_MR_1;
                const
                        Un_fun_MC_1 = req.body.Un_fun_MC_1;
                //------------------------------Usage of tools----------------------ab.;
                const
                        Usage_Tools_ER_1 = req.body.Usage_Tools_ER_1;
                const
                        Usage_Tools_EC_1 = req.body.Usage_Tools_EC_1;
                const
                        Usage_Tools_MR_1 = req.body.Usage_Tools_MR_1;
                const
                        Usage_Tools_MC_1 = req.body.Usage_Tools_MC_1;
                // -------------------------Ability to learn Technology---------------------ab.;
                const
                        Ability_learn_ER_1 = req.body.Ability_learn_ER_1;
                const
                        Ability_learn_EC_1 = req.body.Ability_learn_EC_1;
                const
                        Ability_learn_MR_1 = req.body.Ability_learn_MR_1;
                const
                        Ability_learn_MC_1 = req.body.Ability_learn_MC_1;

                const
                        procedure_eqality_ER_2 = req.body.procedure_eqality_ER_2;
                const
                        procedure_eqality_EC_2 = req.body.procedure_eqality_EC_2;
                const
                        procedure_eqality_MC_2 = req.body.procedure_eqality_MC_2;
                const
                        procedure_eqality_MR_2 = req.body.procedure_eqality_MR_2;

                const
                        problem_finding_skill_ER_2 = req.body.problem_finding_skill_ER_2;
                const
                        problem_finding_skill_EC_2 = req.body.problem_finding_skill_EC_2;
                const
                        problem_finding_skill_MR_2 = req.body.problem_finding_skill_MR_2;
                const
                        problem_finding_skill_MC_2 = req.body.problem_finding_skill_MC_2;

                const
                        contribute_mentor_help_ER_3 = req.body.contribute_mentor_help_ER_3;
                const
                        contribute_mentor_help_EC_3 = req.body.contribute_mentor_help_EC_3;
                const
                        contribute_mentor_help_MC_3 = req.body.contribute_mentor_help_MC_3;
                const
                        contribute_mentor_help_MR_3 = req.body.contribute_mentor_help_MR_3;

                const
                        professional_relationship_ER_3 = req.body.professional_relationship_ER_3;
                const
                        professional_relationship_EC_3 = req.body.professional_relationship_EC_3;
                const
                        professional_relationship_MR_3 = req.body.professional_relationship_MR_3;
                const
                        professional_relationship_MC_3 = req.body.professional_relationship_MC_3;

                const
                        challenges_responsibility_ER_4 = req.body.challenges_responsibility_ER_4;
                const
                        challenges_responsibility_EC_4 = req.body.challenges_responsibility_EC_4;
                const
                        challenges_responsibility_MR_4 = req.body.challenges_responsibility_MR_4;
                const
                        challenges_responsibility_MC_4 = req.body.challenges_responsibility_MC_4;

                const
                        Ideas_knowledge_ER_4 = req.body.Ideas_knowledge_ER_4;
                const
                        Ideas_knowledge_EC_4 = req.body.Ideas_knowledge_EC_4;
                const
                        Ideas_knowledge_MR_4 = req.body.Ideas_knowledge_MR_4;
                const
                        Ideas_knowledge_MC_4 = req.body.Ideas_knowledge_MC_4;

                const
                        Listen_understand_info_ER_5 = req.body.Listen_understand_info_ER_5;
                const
                        Listen_understand_info_EC_5 = req.body.Listen_understand_info_EC_5;
                const
                        Listen_understand_info_MR_5 = req.body.Listen_understand_info_MR_5;
                const
                        Listen_understand_info_MC_5 = req.body.Listen_understand_info_MC_5;

                const
                        info_clear_EC_5 = req.body.info_clear_EC_5;
                const
                        info_clear_ER_5 = req.body.info_clear_ER_5;
                const
                        info_clear_MC_5 = req.body.info_clear_MC_5;
                const
                        info_clear_MR_5 = req.body.info_clear_MR_5;

                const
                        Plan_Schedules_ER_6 = req.body.Plan_Schedules_ER_6;
                const
                        Plan_Schedules_EC_6 = req.body.Plan_Schedules_EC_6;
                const
                        Plan_Schedules_MR_6 = req.body.Plan_Schedules_MR_6;
                const
                        Plan_Schedules_MC_6 = req.body.Plan_Schedules_MC_6;

                const
                        Effective_work_EC_6 = req.body.Effective_work_EC_6;
                const
                        Effective_work_ER_6 = req.body.Effective_work_ER_6;
                const
                        Effective_work_MR_6 = req.body.Effective_work_MR_6;
                const
                        Effective_work_MC_6 = req.body.Effective_work_MC_6;

                const
                        Management_ER_6 = req.body.Management_ER_6;
                const
                        Management_EC_6 = req.body.Management_EC_6;
                const
                        Management_MC_6 = req.body.Management_MC_6;
                const
                        Management_MR_6 = req.body.Management_MR_6;

                const
                        accomplishment_ER_6 = req.body.accomplishment_ER_6;
                const
                        accomplishment_MR_6 = req.body.accomplishment_MR_6;
                const
                        accomplishment_EC_6 = req.body.accomplishment_EC_6;
                const
                        accomplishment_MC_6 = req.body.accomplishment_MC_6;

                const
                        customer_relationship_EC_7 = req.body.customer_relationship_EC_7;
                const
                        customer_relationship_ER_7 = req.body.customer_relationship_ER_7;
                const
                        customer_relationship_MC_7 = req.body.customer_relationship_MC_7;
                const
                        customer_relationship_MR_7 = req.body.customer_relationship_MR_7;

                const
                        Depend_reliability_ER_7 = req.body.Depend_reliability_ER_7;
                const
                        Depend_reliability_EC_7 = req.body.Depend_reliability_EC_7;
                const
                        Depend_reliability_MR_7 = req.body.Depend_reliability_MR_7;
                const
                        Depend_reliability_MC_7 = req.body.Depend_reliability_MC_7;

                const
                        policies_EC_7 = req.body.policies_EC_7;
                const
                        policies_ER_7 = req.body.policies_ER_7;
                const
                        policies_MR_7 = req.body.policies_MR_7;
                const
                        policies_MC_7 = req.body.policies_MC_7;

                const
                        Resilience_ER_7 = req.body.Resilience_ER_7;
                const
                        Resilience_EC_7 = req.body.Resilience_EC_7;
                const
                        Resilience_MC_7 = req.body.Resilience_MC_7;
                const
                        Resilience_MR_7 = req.body.Resilience_MR_7;

                const
                        semiannual_EC_8 = req.body.semiannual_EC_8;
                const
                        semiannual_ER_8 = req.body.semiannual_ER_8;
                const
                        semiannual_MC_8 = req.body.semiannual_MC_8;
                const
                        semiannual_MR_8 = req.body.semiannual_MR_8;

                const
                        semiannual2_EC_8 = req.body.semiannual2_EC_8;
                const
                        semiannual2_ER_8 = req.body.semiannual2_ER_8;
                const
                        semiannual2_MC_8 = req.body.semiannual2_MC_8;
                const
                        semiannual2_MR_8 = req.body.semiannual2_MR_8;

                const
                        EC_10_1_3 = req.body.EC_10_1_3;
                const
                        MC_10_1_4 = req.body.MC_10_1_4;

                const
                        EC_10_2_3 = req.body.EC_10_2_3;
                const
                        MC_10_2_4 = req.body.MC_10_2_4;

                const
                        EC_10_3_3 = req.body.EC_10_3_3;
                const
                        MC_10_3_4 = req.body.MC_10_2_4;

                const
                        EC_10_4_3 = req.body.EC_10_4_3;
                const
                        MC_10_4_4 = req.body.MC_10_4_4;

                const
                        EC_10_5_3 = req.body.EC_10_5_3;
                const
                        MC_10_5_4 = req.body.MC_10_5_4;

                const
                        EC_10_6_3 = req.body.EC_10_6_3;
                const
                        MC_10_6_4 = req.body.MC_10_6_4;

                const
                        EC_10_7_3 = req.body.EC_10_7_3;
                const
                        MC_10_7_4 = req.body.MC_10_7_4;

                const
                        EC_10_8_3 = req.body.EC_10_8_3;
                const
                        MC_10_8_4 = req.body.MC_10_8_4;

                const
                        ER_9_1_3 = req.body.ER_9_1_3;
                const
                        EC_9_1_4 = req.body.EC_9_1_3;
                const
                        MR_9_1_5 = req.body.MR_9_1_5;
                const
                        MC_9_1_6 = req.body.MC_9_1_6;

                const
                        ER_9_2_3 = req.body.ER_9_2_3;
                const
                        EC_9_2_4 = req.body.EC_9_2_4;
                const
                        MC_9_2_6 = req.body.MC_9_2_6;
                const
                        MR_9_2_5 = req.body.MR_9_2_5;

                const
                        ER_9_3_3 = req.body.ER_9_3_3;
                const
                        EC_9_3_4 = req.body.EC_9_3_4;
                const
                        MC_9_3_6 = req.body.MC_9_3_6;
                const
                        MR_9_3_5 = req.body.MR_9_3_5;

                const
                        ER_9_4_3 = req.body.ER_9_4_3;
                const
                        EC_9_4_4 = req.body.EC_9_4_4;
                const
                        MC_9_4_6 = req.body.MC_9_4_6;
                const
                        MR_9_4_5 = req.body.MR_9_4_5;

                const
                        TER = req.body.TER;
                const
                        TMR = req.body.TMR;
                const
                        Taverage = req.body.Taverage;
                const
                        TavgMR = req.body.TavgMR;

                const
                        EC_over = req.body.EC_over;
                const
                        MC_over = req.body.MC_over;
                const
                        total_average_ER1 = req.body.total_average_ER1;
                const
                        total_average_MR1 = req.body.total_average_MR1;

                const
                        total_average_ER2 = req.body.total_average_ER2;
                const
                        total_average_MR2 = req.body.total_average_MR2;
                const oldUser3 = await EmployeeDetails1.findOne({ offId: EmpId });
                const oldUser4 = await EmployeeDetails1.findOne({ offId: reviewappariser });
                const oldUser5 = await EmployeeDetails1.findOne({ offId: HrName });
                const em = oldUser3.offEmail;
                const em2 = oldUser4.offEmail;
                const em3 = oldUser5.offEmail;

                await AppraisalInfo.findOne({ aprId: aprId }, (err, AppraisalInfo) => {
                        AppraisalInfo.EmployeeName = EmployeeName,
                                AppraisalInfo.ManagerName = ManagerName,
                                AppraisalInfo.Designation = Designation,
                                AppraisalInfo.EmpId = EmpId,
                                AppraisalInfo.doj = doj,
                                AppraisalInfo.status = status,
                                AppraisalInfo.submission_date = submission_date,
                                AppraisalInfo.department = department,
                                AppraisalInfo.TotalExperience = TotalExperience,
                                AppraisalInfo.experience = experience,
                                AppraisalInfo.cycle = cycle,
                                AppraisalInfo.reviewappariser = reviewappariser,
                                AppraisalInfo.HrName = HrName,
                                AppraisalInfo.Lastupdate = Lastupdate,

                                // ----------------------Domain and Teachnology----------------------------ab.-
                                AppraisalInfo.
                                        Dom_Tech_ER_1 = Dom_Tech_ER_1,
                                AppraisalInfo.
                                        Dom_Tech_EC_1 = Dom_Tech_EC_1,
                                AppraisalInfo.
                                        Dom_Tech_MR_1 = Dom_Tech_MR_1,
                                AppraisalInfo.
                                        Dom_Tech_MC_1 = Dom_Tech_MC_1,

                                //---------------------- Understanding function and Technology-----------------------------------ab. 
                                AppraisalInfo.
                                        Un_fun_ER_1 = Un_fun_ER_1,
                                AppraisalInfo.
                                        Un_fun_EC_1 = Un_fun_EC_1,
                                AppraisalInfo.
                                        Un_fun_MR_1 = Un_fun_MR_1,
                                AppraisalInfo.
                                        Un_fun_MC_1 = Un_fun_MC_1,
                                //------------------------------Usage of tools----------------------ab.-
                                AppraisalInfo.
                                        Usage_Tools_ER_1 = Usage_Tools_ER_1,
                                AppraisalInfo.
                                        Usage_Tools_EC_1 = Usage_Tools_EC_1,
                                AppraisalInfo.
                                        Usage_Tools_MR_1 = Usage_Tools_MR_1,
                                AppraisalInfo.
                                        Usage_Tools_MC_1 = Usage_Tools_MC_1,
                                // -------------------------Ability to learn Technology---------------------ab.-
                                AppraisalInfo.
                                        Ability_learn_ER_1 = Ability_learn_ER_1,
                                AppraisalInfo.
                                        Ability_learn_EC_1 = Ability_learn_EC_1,
                                AppraisalInfo.
                                        Ability_learn_MR_1 = Ability_learn_MR_1,
                                AppraisalInfo.
                                        Ability_learn_MC_1 = Ability_learn_MC_1,

                                AppraisalInfo.
                                        procedure_eqality_ER_2 = procedure_eqality_ER_2,
                                AppraisalInfo.
                                        procedure_eqality_EC_2 = procedure_eqality_EC_2,
                                AppraisalInfo.
                                        procedure_eqality_MC_2 = procedure_eqality_MC_2,
                                AppraisalInfo.
                                        procedure_eqality_MR_2 = procedure_eqality_MR_2,
                                AppraisalInfo.
                                        problem_finding_skill_ER_2 = problem_finding_skill_ER_2,
                                AppraisalInfo.
                                        problem_finding_skill_EC_2 = problem_finding_skill_EC_2,
                                AppraisalInfo.
                                        problem_finding_skill_MR_2 = problem_finding_skill_MR_2,
                                AppraisalInfo.
                                        problem_finding_skill_MC_2 = problem_finding_skill_MC_2,

                                AppraisalInfo.
                                        contribute_mentor_help_ER_3 = contribute_mentor_help_ER_3,
                                AppraisalInfo.
                                        contribute_mentor_help_EC_3 = contribute_mentor_help_EC_3,
                                AppraisalInfo.
                                        contribute_mentor_help_MC_3 = contribute_mentor_help_MC_3,
                                AppraisalInfo.
                                        contribute_mentor_help_MR_3 = contribute_mentor_help_MR_3,
                                AppraisalInfo.
                                        professional_relationship_ER_3 = professional_relationship_ER_3,
                                AppraisalInfo.
                                        professional_relationship_EC_3 = professional_relationship_EC_3,
                                AppraisalInfo.
                                        professional_relationship_MR_3 = professional_relationship_MR_3,
                                AppraisalInfo.
                                        professional_relationship_MC_3 = professional_relationship_MC_3,
                                AppraisalInfo.
                                        challenges_responsibility_ER_4 = challenges_responsibility_ER_4,
                                AppraisalInfo.
                                        challenges_responsibility_EC_4 = challenges_responsibility_EC_4,
                                AppraisalInfo.
                                        challenges_responsibility_MR_4 = challenges_responsibility_MR_4,
                                AppraisalInfo.
                                        challenges_responsibility_MC_4 = challenges_responsibility_MC_4,
                                AppraisalInfo.
                                        Ideas_knowledge_ER_4 = Ideas_knowledge_ER_4,
                                AppraisalInfo.
                                        Ideas_knowledge_EC_4 = Ideas_knowledge_EC_4,
                                AppraisalInfo.
                                        Ideas_knowledge_MR_4 = Ideas_knowledge_MR_4,
                                AppraisalInfo.
                                        Ideas_knowledge_MC_4 = Ideas_knowledge_MC_4,
                                AppraisalInfo.
                                        Listen_understand_info_ER_5 = Listen_understand_info_ER_5,
                                AppraisalInfo.
                                        Listen_understand_info_EC_5 = Listen_understand_info_EC_5,
                                AppraisalInfo.
                                        Listen_understand_info_MR_5 = Listen_understand_info_MR_5,
                                AppraisalInfo.
                                        Listen_understand_info_MC_5 = Listen_understand_info_MC_5,
                                AppraisalInfo.
                                        info_clear_EC_5 = info_clear_EC_5,
                                AppraisalInfo.
                                        info_clear_ER_5 = info_clear_ER_5,
                                AppraisalInfo.
                                        info_clear_MC_5 = info_clear_MC_5,
                                AppraisalInfo.
                                        info_clear_MR_5 = info_clear_MR_5,
                                AppraisalInfo.
                                        Plan_Schedules_ER_6 = Plan_Schedules_ER_6,
                                AppraisalInfo.
                                        Plan_Schedules_EC_6 = Plan_Schedules_EC_6,
                                AppraisalInfo.
                                        Plan_Schedules_MR_6 = Plan_Schedules_MR_6,
                                AppraisalInfo.
                                        Plan_Schedules_MC_6 = Plan_Schedules_MC_6,
                                AppraisalInfo.
                                        Effective_work_EC_6 = Effective_work_EC_6,
                                AppraisalInfo.
                                        Effective_work_ER_6 = Effective_work_ER_6,
                                AppraisalInfo.
                                        Effective_work_MR_6 = Effective_work_MR_6,
                                AppraisalInfo.
                                        Effective_work_MC_6 = Effective_work_MC_6,
                                AppraisalInfo.
                                        Management_ER_6 = Management_ER_6,
                                AppraisalInfo.
                                        Management_EC_6 = Management_EC_6,
                                AppraisalInfo.
                                        Management_MC_6 = Management_MC_6,
                                AppraisalInfo.
                                        Management_MR_6 = Management_MR_6,
                                AppraisalInfo.
                                        accomplishment_ER_6 = accomplishment_ER_6,
                                AppraisalInfo.
                                        accomplishment_MR_6 = accomplishment_MR_6,
                                AppraisalInfo.
                                        accomplishment_EC_6 = accomplishment_EC_6,
                                AppraisalInfo.
                                        accomplishment_MC_6 = accomplishment_MC_6,
                                AppraisalInfo.
                                        customer_relationship_EC_7 = customer_relationship_EC_7,
                                AppraisalInfo.
                                        customer_relationship_ER_7 = customer_relationship_ER_7,
                                AppraisalInfo.
                                        customer_relationship_MC_7 = customer_relationship_MC_7,
                                AppraisalInfo.
                                        customer_relationship_MR_7 = customer_relationship_MR_7,
                                AppraisalInfo.
                                        Depend_reliability_ER_7 = Depend_reliability_ER_7,
                                AppraisalInfo.
                                        Depend_reliability_EC_7 = Depend_reliability_EC_7,
                                AppraisalInfo.
                                        Depend_reliability_MR_7 = Depend_reliability_MR_7,
                                AppraisalInfo.
                                        Depend_reliability_MC_7 = Depend_reliability_MC_7,
                                AppraisalInfo.
                                        policies_EC_7 = policies_EC_7,
                                AppraisalInfo.
                                        policies_ER_7 = policies_ER_7,
                                AppraisalInfo.
                                        policies_MR_7 = policies_MR_7,
                                AppraisalInfo.
                                        policies_MC_7 = policies_MC_7,
                                AppraisalInfo.
                                        Resilience_ER_7 = Resilience_ER_7,
                                AppraisalInfo.
                                        Resilience_EC_7 = Resilience_EC_7,
                                AppraisalInfo.
                                        Resilience_MC_7 = Resilience_MC_7,
                                AppraisalInfo.
                                        Resilience_MR_7 = Resilience_MR_7,
                                AppraisalInfo.
                                        semiannual_EC_8 = semiannual_EC_8,
                                AppraisalInfo.
                                        semiannual_ER_8 = semiannual_ER_8,
                                AppraisalInfo.
                                        semiannual_MC_8 = semiannual_MC_8,
                                AppraisalInfo.
                                        semiannual_MR_8 = semiannual_MR_8,
                                AppraisalInfo.
                                        semiannual2_EC_8 = semiannual2_EC_8,
                                AppraisalInfo.
                                        semiannual2_ER_8 = semiannual2_ER_8,
                                AppraisalInfo.
                                        semiannual2_MC_8 = semiannual2_MC_8,
                                AppraisalInfo.
                                        semiannual2_MR_8 = semiannual2_MR_8,
                                AppraisalInfo.
                                        EC_10_1_3 = EC_10_1_3,
                                AppraisalInfo.
                                        MC_10_1_4 = MC_10_1_4,
                                AppraisalInfo.
                                        EC_10_2_3 = EC_10_2_3,
                                AppraisalInfo.
                                        MC_10_2_4 = MC_10_2_4,
                                AppraisalInfo.
                                        EC_10_3_3 = EC_10_3_3,
                                AppraisalInfo.
                                        MC_10_3_4 = MC_10_2_4,
                                AppraisalInfo.
                                        EC_10_4_3 = EC_10_4_3,
                                AppraisalInfo.
                                        MC_10_4_4 = MC_10_4_4,
                                AppraisalInfo.
                                        EC_10_5_3 = EC_10_5_3,
                                AppraisalInfo.
                                        MC_10_5_4 = MC_10_5_4,
                                AppraisalInfo.
                                        EC_10_6_3 = EC_10_6_3,
                                AppraisalInfo.
                                        MC_10_6_4 = MC_10_6_4,
                                AppraisalInfo.
                                        EC_10_7_3 = EC_10_7_3,
                                AppraisalInfo.
                                        MC_10_7_4 = MC_10_7_4,
                                AppraisalInfo.
                                        EC_10_8_3 = EC_10_8_3,
                                AppraisalInfo.
                                        MC_10_8_4 = MC_10_8_4,
                                AppraisalInfo.
                                        ER_9_1_3 = ER_9_1_3,
                                AppraisalInfo.
                                        EC_9_1_4 = EC_9_1_4,
                                AppraisalInfo.
                                        MR_9_1_5 = MR_9_1_5,
                                AppraisalInfo.
                                        MC_9_1_6 = MC_9_1_6,
                                AppraisalInfo.
                                        ER_9_2_3 = ER_9_2_3,
                                AppraisalInfo.
                                        EC_9_2_4 = EC_9_2_4,
                                AppraisalInfo.
                                        MC_9_2_6 = MC_9_2_6,
                                AppraisalInfo.
                                        MR_9_2_5 = MR_9_2_5,
                                AppraisalInfo.
                                        ER_9_3_3 = ER_9_3_3,
                                AppraisalInfo.
                                        EC_9_3_4 = EC_9_3_4,
                                AppraisalInfo.
                                        MC_9_3_6 = MC_9_3_6,
                                AppraisalInfo.
                                        MR_9_3_5 = MR_9_3_5,
                                AppraisalInfo.
                                        ER_9_4_3 = ER_9_4_3,
                                AppraisalInfo.
                                        EC_9_4_4 = EC_9_4_4,
                                AppraisalInfo.
                                        MC_9_4_6 = MC_9_4_6,
                                AppraisalInfo.
                                        MR_9_4_5 = MR_9_4_5,
                                AppraisalInfo.
                                        TER = TER,
                                AppraisalInfo.
                                        TMR = TMR,
                                AppraisalInfo.
                                        Taverage = Taverage,
                                AppraisalInfo.
                                        TavgMR = TavgMR,
                                AppraisalInfo.
                                        EC_over = EC_over,
                                AppraisalInfo.
                                        MC_over = MC_over,
                                AppraisalInfo.
                                        total_average_ER1 = total_average_ER1,
                                AppraisalInfo.
                                        total_average_MR1 = total_average_MR1,
                                AppraisalInfo.
                                        total_average_ER2 = total_average_ER2,
                                AppraisalInfo.
                                        total_average_MR2 = total_average_MR2,
                                AppraisalInfo.save();
                        sendEmail3(em, "Appraisal  of " + EmpId, em2, em3, "Appraisal Information Updated, Please Chaeck on system");

                        if(status=="submitted"){
                                res.send({ message2: "data successfully submitted ", val2: "true",val: "false" })
                               }
                               else{
                                res.send({ message2: "data successfully saved ", val2: "true",val: "false" })
          
                               }
                });
        } catch (err) {
                console.error(err)
        }

};



exports.getSelfAppraisal = async (req, res) => {
        try {
                const id = req.params.id;
                const tempar = [
                ]

                AppraisalInfo.find({ EmpId: id }, (err, appraisalInfo) => {
                        if (err) {
                                console.warn(err)
                                return next(err)
                        }
                        var ar3 = appraisalInfo;
                        ar3.map((data) => {
                                if ((data.status == "submitted") || (data.status == "appraised") || (data.status == "In Process")) {
                                        tempar.push(data)
                                }
                        })

                        // console.warn(appraisalInfo);
                        //res.json(employeedetails);
                        res.send(tempar);
                })

        } catch (err) {
                console.error(err)
        }

};


exports.appraisalDetailManager = async (req, res) => {
        try {

                const id = req.params.id;
                const tempar = [
                ]

                AppraisalInfo.find({ reviewappariser: id }, (err, appraisalInfo) => {
                        if (err) {
                                console.warn(err)
                                return next(err)
                        }
                        var ar3 = appraisalInfo;
                        ar3.map((data) => {
                                if ((data.status == "submitted") || (data.status == "appraised")) {
                                        tempar.push(data)
                                }
                        })

                        res.send(tempar);
                })

        } catch (err) {
                console.error(err)
        }

};

exports.editByReportingPerson = async (req, res) => {
        try {
                const id = req.body.id;
                const aprId = req.body.aprId;
                const EmployeeName = req.body.EmployeeName;
                const ManagerName = req.body.ManagerName;
                const Designation = req.body.Designation;
                const EmpId = req.body.EmpId;
                const doj = req.body.doj;
                const status = req.body.status;

                const
                        submission_date = req.body.submission_date;
                const
                        department = req.body.department;
                const
                        TotalExperience = req.body.TotalExperience;
                const
                        experience = req.body.experience;
                const
                        cycle = req.body.cycle;
                const
                        reviewappariser = req.body.reviewappariser;
                const
                        HrName = req.body.HrName;
                const
                        Lastupdate = req.body.Lastupdate;

                // ----------------------Domain and Teachnology----------------------------ab.;
                const
                        Dom_Tech_ER_1 = req.body.Dom_Tech_ER_1;
                const
                        Dom_Tech_EC_1 = req.body.Dom_Tech_EC_1;
                const
                        Dom_Tech_MR_1 = req.body.Dom_Tech_MR_1;
                const
                        Dom_Tech_MC_1 = req.body.Dom_Tech_MC_1;
                //---------------------- Understanding function and Technology-----------------------------------ab.;
                const
                        Un_fun_ER_1 = req.body.Un_fun_ER_1;
                const
                        Un_fun_EC_1 = req.body.Un_fun_EC_1;
                const
                        Un_fun_MR_1 = req.body.Un_fun_MR_1;
                const
                        Un_fun_MC_1 = req.body.Un_fun_MC_1;
                //------------------------------Usage of tools----------------------ab.;
                const
                        Usage_Tools_ER_1 = req.body.Usage_Tools_ER_1;
                const
                        Usage_Tools_EC_1 = req.body.Usage_Tools_EC_1;
                const
                        Usage_Tools_MR_1 = req.body.Usage_Tools_MR_1;
                const
                        Usage_Tools_MC_1 = req.body.Usage_Tools_MC_1;
                // -------------------------Ability to learn Technology---------------------ab.;
                const
                        Ability_learn_ER_1 = req.body.Ability_learn_ER_1;
                const
                        Ability_learn_EC_1 = req.body.Ability_learn_EC_1;
                const
                        Ability_learn_MR_1 = req.body.Ability_learn_MR_1;
                const
                        Ability_learn_MC_1 = req.body.Ability_learn_MC_1;

                const
                        procedure_eqality_ER_2 = req.body.procedure_eqality_ER_2;
                const
                        procedure_eqality_EC_2 = req.body.procedure_eqality_EC_2;
                const
                        procedure_eqality_MC_2 = req.body.procedure_eqality_MC_2;
                const
                        procedure_eqality_MR_2 = req.body.procedure_eqality_MR_2;

                const
                        problem_finding_skill_ER_2 = req.body.problem_finding_skill_ER_2;
                const
                        problem_finding_skill_EC_2 = req.body.problem_finding_skill_EC_2;
                const
                        problem_finding_skill_MR_2 = req.body.problem_finding_skill_MR_2;
                const
                        problem_finding_skill_MC_2 = req.body.problem_finding_skill_MC_2;

                const
                        contribute_mentor_help_ER_3 = req.body.contribute_mentor_help_ER_3;
                const
                        contribute_mentor_help_EC_3 = req.body.contribute_mentor_help_EC_3;
                const
                        contribute_mentor_help_MC_3 = req.body.contribute_mentor_help_MC_3;
                const
                        contribute_mentor_help_MR_3 = req.body.contribute_mentor_help_MR_3;

                const
                        professional_relationship_ER_3 = req.body.professional_relationship_ER_3;
                const
                        professional_relationship_EC_3 = req.body.professional_relationship_EC_3;
                const
                        professional_relationship_MR_3 = req.body.professional_relationship_MR_3;
                const
                        professional_relationship_MC_3 = req.body.professional_relationship_MC_3;

                const
                        challenges_responsibility_ER_4 = req.body.challenges_responsibility_ER_4;
                const
                        challenges_responsibility_EC_4 = req.body.challenges_responsibility_EC_4;
                const
                        challenges_responsibility_MR_4 = req.body.challenges_responsibility_MR_4;
                const
                        challenges_responsibility_MC_4 = req.body.challenges_responsibility_MC_4;

                const
                        Ideas_knowledge_ER_4 = req.body.Ideas_knowledge_ER_4;
                const
                        Ideas_knowledge_EC_4 = req.body.Ideas_knowledge_EC_4;
                const
                        Ideas_knowledge_MR_4 = req.body.Ideas_knowledge_MR_4;
                const
                        Ideas_knowledge_MC_4 = req.body.Ideas_knowledge_MC_4;

                const
                        Listen_understand_info_ER_5 = req.body.Listen_understand_info_ER_5;
                const
                        Listen_understand_info_EC_5 = req.body.Listen_understand_info_EC_5;
                const
                        Listen_understand_info_MR_5 = req.body.Listen_understand_info_MR_5;
                const
                        Listen_understand_info_MC_5 = req.body.Listen_understand_info_MC_5;

                const
                        info_clear_EC_5 = req.body.info_clear_EC_5;
                const
                        info_clear_ER_5 = req.body.info_clear_ER_5;
                const
                        info_clear_MC_5 = req.body.info_clear_MC_5;
                const
                        info_clear_MR_5 = req.body.info_clear_MR_5;

                const
                        Plan_Schedules_ER_6 = req.body.Plan_Schedules_ER_6;
                const
                        Plan_Schedules_EC_6 = req.body.Plan_Schedules_EC_6;
                const
                        Plan_Schedules_MR_6 = req.body.Plan_Schedules_MR_6;
                const
                        Plan_Schedules_MC_6 = req.body.Plan_Schedules_MC_6;

                const
                        Effective_work_EC_6 = req.body.Effective_work_EC_6;
                const
                        Effective_work_ER_6 = req.body.Effective_work_ER_6;
                const
                        Effective_work_MR_6 = req.body.Effective_work_MR_6;
                const
                        Effective_work_MC_6 = req.body.Effective_work_MC_6;

                const
                        Management_ER_6 = req.body.Management_ER_6;
                const
                        Management_EC_6 = req.body.Management_EC_6;
                const
                        Management_MC_6 = req.body.Management_MC_6;
                const
                        Management_MR_6 = req.body.Management_MR_6;

                const
                        accomplishment_ER_6 = req.body.accomplishment_ER_6;
                const
                        accomplishment_MR_6 = req.body.accomplishment_MR_6;
                const
                        accomplishment_EC_6 = req.body.accomplishment_EC_6;
                const
                        accomplishment_MC_6 = req.body.accomplishment_MC_6;

                const
                        customer_relationship_EC_7 = req.body.customer_relationship_EC_7;
                const
                        customer_relationship_ER_7 = req.body.customer_relationship_ER_7;
                const
                        customer_relationship_MC_7 = req.body.customer_relationship_MC_7;
                const
                        customer_relationship_MR_7 = req.body.customer_relationship_MR_7;

                const
                        Depend_reliability_ER_7 = req.body.Depend_reliability_ER_7;
                const
                        Depend_reliability_EC_7 = req.body.Depend_reliability_EC_7;
                const
                        Depend_reliability_MR_7 = req.body.Depend_reliability_MR_7;
                const
                        Depend_reliability_MC_7 = req.body.Depend_reliability_MC_7;

                const
                        policies_EC_7 = req.body.policies_EC_7;
                const
                        policies_ER_7 = req.body.policies_ER_7;
                const
                        policies_MR_7 = req.body.policies_MR_7;
                const
                        policies_MC_7 = req.body.policies_MC_7;

                const
                        Resilience_ER_7 = req.body.Resilience_ER_7;
                const
                        Resilience_EC_7 = req.body.Resilience_EC_7;
                const
                        Resilience_MC_7 = req.body.Resilience_MC_7;
                const
                        Resilience_MR_7 = req.body.Resilience_MR_7;

                const
                        semiannual_EC_8 = req.body.semiannual_EC_8;
                const
                        semiannual_ER_8 = req.body.semiannual_ER_8;
                const
                        semiannual_MC_8 = req.body.semiannual_MC_8;
                const
                        semiannual_MR_8 = req.body.semiannual_MR_8;

                const
                        semiannual2_EC_8 = req.body.semiannual2_EC_8;
                const
                        semiannual2_ER_8 = req.body.semiannual2_ER_8;
                const
                        semiannual2_MC_8 = req.body.semiannual2_MC_8;
                const
                        semiannual2_MR_8 = req.body.semiannual2_MR_8;

                const
                        EC_10_1_3 = req.body.EC_10_1_3;
                const
                        MC_10_1_4 = req.body.MC_10_1_4;

                const
                        EC_10_2_3 = req.body.EC_10_2_3;
                const
                        MC_10_2_4 = req.body.MC_10_2_4;

                const
                        EC_10_3_3 = req.body.EC_10_3_3;
                const
                        MC_10_3_4 = req.body.MC_10_2_4;

                const
                        EC_10_4_3 = req.body.EC_10_4_3;
                const
                        MC_10_4_4 = req.body.MC_10_4_4;

                const
                        EC_10_5_3 = req.body.EC_10_5_3;
                const
                        MC_10_5_4 = req.body.MC_10_5_4;

                const
                        EC_10_6_3 = req.body.EC_10_6_3;
                const
                        MC_10_6_4 = req.body.MC_10_6_4;

                const
                        EC_10_7_3 = req.body.EC_10_7_3;
                const
                        MC_10_7_4 = req.body.MC_10_7_4;

                const
                        EC_10_8_3 = req.body.EC_10_8_3;
                const
                        MC_10_8_4 = req.body.MC_10_8_4;

                const
                        ER_9_1_3 = req.body.ER_9_1_3;
                const
                        EC_9_1_4 = req.body.EC_9_1_3;
                const
                        MR_9_1_5 = req.body.MR_9_1_5;
                const
                        MC_9_1_6 = req.body.MC_9_1_6;

                const
                        ER_9_2_3 = req.body.ER_9_2_3;
                const
                        EC_9_2_4 = req.body.EC_9_2_4;
                const
                        MC_9_2_6 = req.body.MC_9_2_6;
                const
                        MR_9_2_5 = req.body.MR_9_2_5;

                const
                        ER_9_3_3 = req.body.ER_9_3_3;
                const
                        EC_9_3_4 = req.body.EC_9_3_4;
                const
                        MC_9_3_6 = req.body.MC_9_3_6;
                const
                        MR_9_3_5 = req.body.MR_9_3_5;

                const
                        ER_9_4_3 = req.body.ER_9_4_3;
                const
                        EC_9_4_4 = req.body.EC_9_4_4;
                const
                        MC_9_4_6 = req.body.MC_9_4_6;
                const
                        MR_9_4_5 = req.body.MR_9_4_5;

                const
                        TER = req.body.TER;
                const
                        TMR = req.body.TMR;
                const
                        Taverage = req.body.Taverage;
                const
                        TavgMR = req.body.TavgMR;

                const
                        EC_over = req.body.EC_over;
                const
                        MC_over = req.body.MC_over;
                const
                        total_average_ER1 = req.body.total_average_ER1;
                const
                        total_average_MR1 = req.body.total_average_MR1;

                const
                        total_average_ER2 = req.body.total_average_ER2;
                const
                        total_average_MR2 = req.body.total_average_MR2;
                const oldUser3 = await EmployeeDetails1.findOne({ offId: EmpId });
                const oldUser4 = await EmployeeDetails1.findOne({ offId: reviewappariser });
                const oldUser5 = await EmployeeDetails1.findOne({ offId: HrName });
                const em = oldUser3.offEmail;
                const em2 = oldUser4.offEmail;
                const em3 = oldUser5.offEmail;

                await AppraisalInfo.findOne({ aprId: aprId }, (err, AppraisalInfo) => {
                        AppraisalInfo.EmployeeName = EmployeeName,
                                AppraisalInfo.ManagerName = ManagerName,
                                AppraisalInfo.Designation = Designation,
                                AppraisalInfo.EmpId = EmpId,
                                AppraisalInfo.doj = doj,
                                AppraisalInfo.status = status,
                                AppraisalInfo.submission_date = submission_date,
                                AppraisalInfo.department = department,
                                AppraisalInfo.TotalExperience = TotalExperience,
                                AppraisalInfo.experience = experience,
                                AppraisalInfo.cycle = cycle,
                                AppraisalInfo.reviewappariser = reviewappariser,
                                AppraisalInfo.HrName = HrName,
                                AppraisalInfo.Lastupdate = Lastupdate,

                                // ----------------------Domain and Teachnology----------------------------ab.-
                                AppraisalInfo.
                                        Dom_Tech_ER_1 = Dom_Tech_ER_1,
                                AppraisalInfo.
                                        Dom_Tech_EC_1 = Dom_Tech_EC_1,
                                AppraisalInfo.
                                        Dom_Tech_MR_1 = Dom_Tech_MR_1,
                                AppraisalInfo.
                                        Dom_Tech_MC_1 = Dom_Tech_MC_1,

                                //---------------------- Understanding function and Technology-----------------------------------ab. 
                                AppraisalInfo.
                                        Un_fun_ER_1 = Un_fun_ER_1,
                                AppraisalInfo.
                                        Un_fun_EC_1 = Un_fun_EC_1,
                                AppraisalInfo.
                                        Un_fun_MR_1 = Un_fun_MR_1,
                                AppraisalInfo.
                                        Un_fun_MC_1 = Un_fun_MC_1,
                                //------------------------------Usage of tools----------------------ab.-
                                AppraisalInfo.
                                        Usage_Tools_ER_1 = Usage_Tools_ER_1,
                                AppraisalInfo.
                                        Usage_Tools_EC_1 = Usage_Tools_EC_1,
                                AppraisalInfo.
                                        Usage_Tools_MR_1 = Usage_Tools_MR_1,
                                AppraisalInfo.
                                        Usage_Tools_MC_1 = Usage_Tools_MC_1,
                                // -------------------------Ability to learn Technology---------------------ab.-
                                AppraisalInfo.
                                        Ability_learn_ER_1 = Ability_learn_ER_1,
                                AppraisalInfo.
                                        Ability_learn_EC_1 = Ability_learn_EC_1,
                                AppraisalInfo.
                                        Ability_learn_MR_1 = Ability_learn_MR_1,
                                AppraisalInfo.
                                        Ability_learn_MC_1 = Ability_learn_MC_1,

                                AppraisalInfo.
                                        procedure_eqality_ER_2 = procedure_eqality_ER_2,
                                AppraisalInfo.
                                        procedure_eqality_EC_2 = procedure_eqality_EC_2,
                                AppraisalInfo.
                                        procedure_eqality_MC_2 = procedure_eqality_MC_2,
                                AppraisalInfo.
                                        procedure_eqality_MR_2 = procedure_eqality_MR_2,
                                AppraisalInfo.
                                        problem_finding_skill_ER_2 = problem_finding_skill_ER_2,
                                AppraisalInfo.
                                        problem_finding_skill_EC_2 = problem_finding_skill_EC_2,
                                AppraisalInfo.
                                        problem_finding_skill_MR_2 = problem_finding_skill_MR_2,
                                AppraisalInfo.
                                        problem_finding_skill_MC_2 = problem_finding_skill_MC_2,

                                AppraisalInfo.
                                        contribute_mentor_help_ER_3 = contribute_mentor_help_ER_3,
                                AppraisalInfo.
                                        contribute_mentor_help_EC_3 = contribute_mentor_help_EC_3,
                                AppraisalInfo.
                                        contribute_mentor_help_MC_3 = contribute_mentor_help_MC_3,
                                AppraisalInfo.
                                        contribute_mentor_help_MR_3 = contribute_mentor_help_MR_3,
                                AppraisalInfo.
                                        professional_relationship_ER_3 = professional_relationship_ER_3,
                                AppraisalInfo.
                                        professional_relationship_EC_3 = professional_relationship_EC_3,
                                AppraisalInfo.
                                        professional_relationship_MR_3 = professional_relationship_MR_3,
                                AppraisalInfo.
                                        professional_relationship_MC_3 = professional_relationship_MC_3,
                                AppraisalInfo.
                                        challenges_responsibility_ER_4 = challenges_responsibility_ER_4,
                                AppraisalInfo.
                                        challenges_responsibility_EC_4 = challenges_responsibility_EC_4,
                                AppraisalInfo.
                                        challenges_responsibility_MR_4 = challenges_responsibility_MR_4,
                                AppraisalInfo.
                                        challenges_responsibility_MC_4 = challenges_responsibility_MC_4,
                                AppraisalInfo.
                                        Ideas_knowledge_ER_4 = Ideas_knowledge_ER_4,
                                AppraisalInfo.
                                        Ideas_knowledge_EC_4 = Ideas_knowledge_EC_4,
                                AppraisalInfo.
                                        Ideas_knowledge_MR_4 = Ideas_knowledge_MR_4,
                                AppraisalInfo.
                                        Ideas_knowledge_MC_4 = Ideas_knowledge_MC_4,
                                AppraisalInfo.
                                        Listen_understand_info_ER_5 = Listen_understand_info_ER_5,
                                AppraisalInfo.
                                        Listen_understand_info_EC_5 = Listen_understand_info_EC_5,
                                AppraisalInfo.
                                        Listen_understand_info_MR_5 = Listen_understand_info_MR_5,
                                AppraisalInfo.
                                        Listen_understand_info_MC_5 = Listen_understand_info_MC_5,
                                AppraisalInfo.
                                        info_clear_EC_5 = info_clear_EC_5,
                                AppraisalInfo.
                                        info_clear_ER_5 = info_clear_ER_5,
                                AppraisalInfo.
                                        info_clear_MC_5 = info_clear_MC_5,
                                AppraisalInfo.
                                        info_clear_MR_5 = info_clear_MR_5,
                                AppraisalInfo.
                                        Plan_Schedules_ER_6 = Plan_Schedules_ER_6,
                                AppraisalInfo.
                                        Plan_Schedules_EC_6 = Plan_Schedules_EC_6,
                                AppraisalInfo.
                                        Plan_Schedules_MR_6 = Plan_Schedules_MR_6,
                                AppraisalInfo.
                                        Plan_Schedules_MC_6 = Plan_Schedules_MC_6,
                                AppraisalInfo.
                                        Effective_work_EC_6 = Effective_work_EC_6,
                                AppraisalInfo.
                                        Effective_work_ER_6 = Effective_work_ER_6,
                                AppraisalInfo.
                                        Effective_work_MR_6 = Effective_work_MR_6,
                                AppraisalInfo.
                                        Effective_work_MC_6 = Effective_work_MC_6,
                                AppraisalInfo.
                                        Management_ER_6 = Management_ER_6,
                                AppraisalInfo.
                                        Management_EC_6 = Management_EC_6,
                                AppraisalInfo.
                                        Management_MC_6 = Management_MC_6,
                                AppraisalInfo.
                                        Management_MR_6 = Management_MR_6,
                                AppraisalInfo.
                                        accomplishment_ER_6 = accomplishment_ER_6,
                                AppraisalInfo.
                                        accomplishment_MR_6 = accomplishment_MR_6,
                                AppraisalInfo.
                                        accomplishment_EC_6 = accomplishment_EC_6,
                                AppraisalInfo.
                                        accomplishment_MC_6 = accomplishment_MC_6,
                                AppraisalInfo.
                                        customer_relationship_EC_7 = customer_relationship_EC_7,
                                AppraisalInfo.
                                        customer_relationship_ER_7 = customer_relationship_ER_7,
                                AppraisalInfo.
                                        customer_relationship_MC_7 = customer_relationship_MC_7,
                                AppraisalInfo.
                                        customer_relationship_MR_7 = customer_relationship_MR_7,
                                AppraisalInfo.
                                        Depend_reliability_ER_7 = Depend_reliability_ER_7,
                                AppraisalInfo.
                                        Depend_reliability_EC_7 = Depend_reliability_EC_7,
                                AppraisalInfo.
                                        Depend_reliability_MR_7 = Depend_reliability_MR_7,
                                AppraisalInfo.
                                        Depend_reliability_MC_7 = Depend_reliability_MC_7,
                                AppraisalInfo.
                                        policies_EC_7 = policies_EC_7,
                                AppraisalInfo.
                                        policies_ER_7 = policies_ER_7,
                                AppraisalInfo.
                                        policies_MR_7 = policies_MR_7,
                                AppraisalInfo.
                                        policies_MC_7 = policies_MC_7,
                                AppraisalInfo.
                                        Resilience_ER_7 = Resilience_ER_7,
                                AppraisalInfo.
                                        Resilience_EC_7 = Resilience_EC_7,
                                AppraisalInfo.
                                        Resilience_MC_7 = Resilience_MC_7,
                                AppraisalInfo.
                                        Resilience_MR_7 = Resilience_MR_7,
                                AppraisalInfo.
                                        semiannual_EC_8 = semiannual_EC_8,
                                AppraisalInfo.
                                        semiannual_ER_8 = semiannual_ER_8,
                                AppraisalInfo.
                                        semiannual_MC_8 = semiannual_MC_8,
                                AppraisalInfo.
                                        semiannual_MR_8 = semiannual_MR_8,
                                AppraisalInfo.
                                        semiannual2_EC_8 = semiannual2_EC_8,
                                AppraisalInfo.
                                        semiannual2_ER_8 = semiannual2_ER_8,
                                AppraisalInfo.
                                        semiannual2_MC_8 = semiannual2_MC_8,
                                AppraisalInfo.
                                        semiannual2_MR_8 = semiannual2_MR_8,
                                AppraisalInfo.
                                        EC_10_1_3 = EC_10_1_3,
                                AppraisalInfo.
                                        MC_10_1_4 = MC_10_1_4,
                                AppraisalInfo.
                                        EC_10_2_3 = EC_10_2_3,
                                AppraisalInfo.
                                        MC_10_2_4 = MC_10_2_4,
                                AppraisalInfo.
                                        EC_10_3_3 = EC_10_3_3,
                                AppraisalInfo.
                                        MC_10_3_4 = MC_10_2_4,
                                AppraisalInfo.
                                        EC_10_4_3 = EC_10_4_3,
                                AppraisalInfo.
                                        MC_10_4_4 = MC_10_4_4,
                                AppraisalInfo.
                                        EC_10_5_3 = EC_10_5_3,
                                AppraisalInfo.
                                        MC_10_5_4 = MC_10_5_4,
                                AppraisalInfo.
                                        EC_10_6_3 = EC_10_6_3,
                                AppraisalInfo.
                                        MC_10_6_4 = MC_10_6_4,
                                AppraisalInfo.
                                        EC_10_7_3 = EC_10_7_3,
                                AppraisalInfo.
                                        MC_10_7_4 = MC_10_7_4,
                                AppraisalInfo.
                                        EC_10_8_3 = EC_10_8_3,
                                AppraisalInfo.
                                        MC_10_8_4 = MC_10_8_4,
                                AppraisalInfo.
                                        ER_9_1_3 = ER_9_1_3,
                                AppraisalInfo.
                                        EC_9_1_4 = EC_9_1_4,
                                AppraisalInfo.
                                        MR_9_1_5 = MR_9_1_5,
                                AppraisalInfo.
                                        MC_9_1_6 = MC_9_1_6,
                                AppraisalInfo.
                                        ER_9_2_3 = ER_9_2_3,
                                AppraisalInfo.
                                        EC_9_2_4 = EC_9_2_4,
                                AppraisalInfo.
                                        MC_9_2_6 = MC_9_2_6,
                                AppraisalInfo.
                                        MR_9_2_5 = MR_9_2_5,
                                AppraisalInfo.
                                        ER_9_3_3 = ER_9_3_3,
                                AppraisalInfo.
                                        EC_9_3_4 = EC_9_3_4,
                                AppraisalInfo.
                                        MC_9_3_6 = MC_9_3_6,
                                AppraisalInfo.
                                        MR_9_3_5 = MR_9_3_5,
                                AppraisalInfo.
                                        ER_9_4_3 = ER_9_4_3,
                                AppraisalInfo.
                                        EC_9_4_4 = EC_9_4_4,
                                AppraisalInfo.
                                        MC_9_4_6 = MC_9_4_6,
                                AppraisalInfo.
                                        MR_9_4_5 = MR_9_4_5,
                                AppraisalInfo.
                                        TER = TER,
                                AppraisalInfo.
                                        TMR = TMR,
                                AppraisalInfo.
                                        Taverage = Taverage,
                                AppraisalInfo.
                                        TavgMR = TavgMR,
                                AppraisalInfo.
                                        EC_over = EC_over,
                                AppraisalInfo.
                                        MC_over = MC_over,
                                AppraisalInfo.
                                        total_average_ER1 = total_average_ER1,
                                AppraisalInfo.
                                        total_average_MR1 = total_average_MR1,
                                AppraisalInfo.
                                        total_average_ER2 = total_average_ER2,
                                AppraisalInfo.
                                        total_average_MR2 = total_average_MR2,
                                AppraisalInfo.save();
                        sendEmail3(em, "Appraisal  of " + EmpId, em2, em3, "Appraisal Information Updated, Please Chaeck on system");

                        if(status=="submitted"){
                                res.send({ message2: "data successfully  saved", val2: "true",val: "false" })
                               }
                               else{
                                res.send({ message2: "data successfully submitted ", val2: "true",val: "false" })
          
                               }
                });
        } catch (err) {
                console.error(err)
        }

};

exports.appraisalDetailStatus = async (req, res) => {
        try {
                const id = req.params.id;
                var user2;
                const oldUser = await AppraisalInfo.findOne({ reviewappariser: id });

                const oldUser2 = await AppraisalInfo.findOne({ EmpId: id });
                if (oldUser) {
                        user2 = id
                }
                else {
                        user2 = ""
                }
                await AppraisalInfo.find({ EmpId: id }, (err, appraisalInfo) => {
                        if (err) {
                                console.warn(err)
                                // return next(err)
                                res.send({ user: "" });
                        }
                        else {
                                var as;
                                if (oldUser2) {
                                        as = oldUser2.EmpId;
                                        console.warn(oldUser2.EmpId + "--------------------------line 2216");

                                }
                                else {
                                        as = ""
                                }


                                res.send({ user: as, user2: user2 });
                        }
                })
        } catch (err) {
                console.error(err)
        }

};


exports.appraisalDetailStatusPersonal = async (req, res) => {
        try {
                const id = req.params.id;
                var user2;
                const oldUser = await AppraisalInfo.findOne({ reviewappariser: id });

                const oldUser2 = await AppraisalInfo.findOne({ EmpId: id });
                if (oldUser) {
                        user2 = id
                }
                else {
                        user2 = ""
                }
                await AppraisalInfo.find({ EmpId: id }, (err, appraisalInfo) => {
                        if (err) {
                                console.warn(err)
                                // return next(err)
                                res.send({ user: "" });
                        }
                        else {
                                var as;
                                if (oldUser2) {
                                        as = oldUser2.status;
                                        console.warn(oldUser2.EmpId + "--------------------------line 2216");

                                }
                                else {
                                        as = ""
                                }


                                res.send({ user: as, user2: user2, user3: oldUser2 });
                        }
                })
        } catch (err) {
                console.error(err)
        }

};

