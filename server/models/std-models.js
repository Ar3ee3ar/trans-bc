const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new Schema(
    {
        _id: {type:Number, required:true},
        std_id: {type:String, required:true},
        std_name: {type:String, required:true},
        std_last: {type:String, required:true},
        date_of_ad: {type:Date, required:true},
        date_of_grad: {type:Date, required:false},
        course: [{
            subj_ID: {type:String, required:true},
            grade_type: {type:String, required:true}
        }]
    }
);

module.exports = mongoose.model('history', historySchema,'history')