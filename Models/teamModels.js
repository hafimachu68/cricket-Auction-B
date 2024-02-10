const mongoose=require('mongoose')

const teamSchema=mongoose.Schema({
    teamName: {
        type:String,
        required:true
    },
    basepoint:  {
        type:String,
        required:true
    },
    budget:  {
        type:String,
        required:true
    },
    teamPic:{
        type:String,
        required:true
    }
    ,
    timeStamp:{
        type:Date,
        default:new Date()
    }
})
const team=mongoose.model('team',teamSchema)
module.exports=team