const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new Schema(
    {
        _id: {type:String, required:true},
        // std_id: {type:String, required:true},
        std_name: {type:String, required:true},
        std_last: {type:String, required:true},
        date_of_ad: {type:Date, required:false},
        date_of_grad: {type:Date, required:false},
        course: [{
            subj_ID: {type:String, required:true, ref: 'subj'},
            grade_type: {type:String, required:true}
        }],
        pass: {type:String, required:true}
    }, { collection : 'history' }
);

const subjectSchema = new Schema(
    {
        _id: {type:String, required:true},
        // subj_ID: {type:String, required:true, ref:'history'},
        subj_name: {type:String, required:true},
        credit: {type:Number, required:true},
        semester: {type:Number, required:true},
        major: {type:String, required:true},
        type_subj: {type:String, required:true}
    }, { collection : 'all_subj_info' }
);

// Creating model objects
const history = mongoose.model('history', historySchema);
const subj = mongoose.model('subj',subjectSchema)
    
// Exporting our model objects
module.exports = {
    history,
    subj
};