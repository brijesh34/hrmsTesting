const mongoose = require("mongoose");

const userSchema12=new mongoose.Schema({
    aprId:String,
    EmployeeName: String,
    ManagerName: String,
    Designation: String,
    EmpId: String,
    doj: Date,

    department: String,
    TotalExperience:Number,
    experience: Number,
    cycle: String,
    reviewappariser: String,
    HrName: String,
    Lastupdate: Date,
    status:String,
    submission_date:String,
    // ----------------------Domain and Teachnology-------------------------------
    Dom_Tech_ER_1:Number,
    Dom_Tech_EC_1:String,
    Dom_Tech_MR_1:Number,
    Dom_Tech_MC_1:String,
    //---------------------- Understanding function and Technology------------------------------------- 
    Un_fun_ER_1:Number,
    Un_fun_EC_1:String,
    Un_fun_MR_1:Number,
    Un_fun_MC_1:String,
    //------------------------------Usage of tools-------------------------
    Usage_Tools_ER_1:Number,
    Usage_Tools_EC_1:String,
    Usage_Tools_MR_1:Number,
    Usage_Tools_MC_1:String,
    // -------------------------Ability to learn Technology------------------------
    Ability_learn_ER_1:Number,
    Ability_learn_EC_1:String,
    Ability_learn_MR_1:Number,
    Ability_learn_MC_1:String,

    procedure_eqality_ER_2:Number,
    procedure_eqality_EC_2:String,
    procedure_eqality_MC_2:String,
    procedure_eqality_MR_2:Number,



    problem_finding_skill_ER_2:Number,
    problem_finding_skill_EC_2:String,
    problem_finding_skill_MR_2:Number,
    problem_finding_skill_MC_2:String,


    contribute_mentor_help_ER_3:Number,
    contribute_mentor_help_EC_3:String,
    contribute_mentor_help_MC_3:String,
    contribute_mentor_help_MR_3:Number,

    professional_relationship_ER_3:Number,
    professional_relationship_EC_3:String,
    professional_relationship_MR_3:Number,
    professional_relationship_MC_3:String,



    challenges_responsibility_ER_4:Number,
    challenges_responsibility_EC_4:String,
    challenges_responsibility_MR_4:Number,
    challenges_responsibility_MC_4:String,

    Ideas_knowledge_ER_4:Number,
    Ideas_knowledge_EC_4:String,
    Ideas_knowledge_MR_4:Number,
    Ideas_knowledge_MC_4:String,

    Listen_understand_info_ER_5:Number,
    Listen_understand_info_EC_5:String,
    Listen_understand_info_MR_5:Number,
    Listen_understand_info_MC_5:String,

    info_clear_EC_5:String,
    info_clear_ER_5:Number,
    info_clear_MC_5:String,
    info_clear_MR_5:Number,

    Plan_Schedules_ER_6:Number,
    Plan_Schedules_EC_6:String,
    Plan_Schedules_MR_6:Number,
    Plan_Schedules_MC_6:String,


    Effective_work_EC_6:String,
    Effective_work_ER_6:Number,
    Effective_work_MR_6:Number,
    Effective_work_MC_6:String,

    Management_ER_6:Number,
    Management_EC_6:String,
    Management_MC_6:String,
    Management_MR_6:Number,

    accomplishment_ER_6:Number,
    accomplishment_MR_6:Number,
    accomplishment_EC_6:String,
    accomplishment_MC_6:String,


    customer_relationship_EC_7:String,
    customer_relationship_ER_7:Number,
    customer_relationship_MC_7:String,
    customer_relationship_MR_7:Number,

    Depend_reliability_ER_7:Number,
    Depend_reliability_EC_7:String,
    Depend_reliability_MR_7:Number,
    Depend_reliability_MC_7:String,

    policies_EC_7:String,
    policies_ER_7:Number,
    policies_MR_7:Number,
    policies_MC_7:String,

    Resilience_ER_7:Number,
    Resilience_EC_7:String,
    Resilience_MC_7:String,
    Resilience_MR_7:Number,

    semiannual_EC_8:String,
    semiannual_ER_8:Number,
    semiannual_MC_8:String,
    semiannual_MR_8:Number,

    semiannual2_EC_8:String,
    semiannual2_ER_8:Number,
    semiannual2_MC_8:String,
    semiannual2_MR_8:Number,

    EC_10_1_3: String,
    MC_10_1_4: String,
    EC_10_2_3: String,
    MC_10_2_4: String,
    EC_10_3_3: String,
    MC_10_3_4: String,
    EC_10_4_3: String,
    MC_10_4_4: String,
    EC_10_5_3: String,
    MC_10_5_4: String,
    EC_10_6_3: String,
    MC_10_6_4: String,
    EC_10_7_3: String,
    MC_10_7_4: String,
    EC_10_8_3: String,
    MC_10_8_4: String,
    ER_9_1_3: String,
    EC_9_1_4: String,
    MR_9_1_5: String,
    MC_9_1_6: String,
    ER_9_2_3: String,
    EC_9_2_4: String,
    MC_9_2_6: String,
    MR_9_2_5: String,
    ER_9_3_3: String,
    EC_9_3_4: String,
    MC_9_3_6: String,
    MR_9_3_5: String,
    ER_9_4_3: String,
    EC_9_4_4: String,
    MC_9_4_6: String,
    MR_9_4_5: String,
TER:String,
TMR:String,
Taverage:String,
TavgMR:String,
EC_over:String,
MC_over:String,

    total_average_ER1: Number,
    total_average_MR1: Number,
    total_average_ER2: Number,
    total_average_MR2: Number,

})
const AppraisalInfo = new mongoose.model("AppraisalInfo", userSchema12);

module.exports = AppraisalInfo;
