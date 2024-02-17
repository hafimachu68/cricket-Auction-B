const mongoose=require('mongoose')

const PlayerSchema=mongoose.Schema({
    PlayerName: {
        type:String,
        required:true
    },
    code:  {
        type:String,
        required:true
    },
   role:  {
        type:String,
        required:true
    },

    basepoint:{
        type:String,
        required:true
    },
    
   team:  {
        type:String,
        required:true
    },
    CourtPic:{
        type:String,
        required:true
    }
    ,
    timeStamp:{
        type:Date,
        default:new Date()
    }
})
const Player=mongoose.model('Player',PlayerSchema)
module.exports=Player