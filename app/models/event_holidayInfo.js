const mongoose = require("mongoose");

const evntsSchema = new mongoose.Schema({
    event_id: String,
    event_name: String,

    event_type: String,
event_detail:String,
event_date:Date,
   createdBy:String,
   updatedBy:String,
   cr_time:Date,
   up_date:Date
    

})


const EventsInfo = new mongoose.model("EventsInfo", evntsSchema);
module.exports = EventsInfo;
