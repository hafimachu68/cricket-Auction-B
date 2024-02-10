const courts=require('../Models/courtModels')
const COURT_SHEDULES = require("../Models/courtSheduleModels");
const ObjectId=require('mongoose').Types.ObjectId
const Group=require('../Models/groupModels');
const team = require('../Models/teamModels');
const Groupt = require('../Models/teamgModels');





const getAllcourtsData = (req, res) => {
    courts.find().then((response) => {
        res.status(200).json(response)
    })
        .catch(err => {
            res.status(500).json(err)
        })
};
const getAllteamsData = (req, res) => {
    team.find().then((response) => {
        res.status(200).json(response)
    })
        .catch(err => {
            res.status(500).json(err)
        })
};

// const getlatestUpdetedData=(req,res)=>{
//     try {
//         COURT_SHEDULE.find({courtId:req.query.courtId})
//         .sort({date:-1})
//         .limit(1)
//         .select("date"
//         .then((response)=>{
//             let latestDate=new Date(response[0]?.date);
//             res.status(200).json({minDate:latestDate})

//         })
//         )
//     } catch (error) {
//         res.status(500).json(error);

//     }

// }



const getSingleCourtData = async (req, res) => {
    try {
        const result = await courts.findOne({ _id: req.query.courtId })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


};
const getteamCourtData = async (req, res) => {
    try {
        const result = await team.findOne({ _id: req.query.teamId })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


};
const dayWiseTimeSlot=(req,res)=>{
    let currentHour=new Date(req.query.date).getHours()
    
    let currentDate=new Date(new Date(req.query.date).setUTCHours(0,0,0,0))
    COURT_SHEDULES.aggregate([{
       $match:{courtId:new ObjectId(req.query.courtId),
        date:currentDate,
        'slot.id':{$gt:currentHour+1}
    }
    },
    {
        $lookup:{
            from:'courts',
            localField:'courtId',
            foreignField:'_id',
            as:'court'    
     },
    },
        {$project:{
        court:{$arrayElemAt:['$court',0]},
        _id:1,
        date:1,
        slot:1,
        cost:1,
        bookedBy:1

    },
},
]).then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json("no response")

    })

}

const getMybookingsData=(req,res)=>{

    const currentDate=new Date()
    const slotHour=currentDate.getHours()
    currentDate.setUTCHours(0,0,0,0);

    COURT_SHEDULES.aggregate([
        {
            $match: {
                bookedBy: new ObjectId(req.userId),
              $expr:{
                $or:[
                    {$gt:['$date',currentDate]},
                    {$and:[
                        {$eq:['$date',currentDate]},
                        {$gte:['$slot.id',slotHour]}
                    ]

                    },
                ],
              },   
            },
         },
         {
             $lookup:{
                from:'courts',
                localField:'courtId',
                foreignField:'_id',
                as:'courts'

             }
         },{
            $project:{
                _id:1,
                date:1,
                slot:1,
                courtData:{$arrayElemAt:['$courts',0]}
            }
         }

    ]).then((response)=>{
        console.log(response);
        res.status(200).json(response)
    })




}



const addToGroup = (req, res) => {
    const { courtName, location, about, image,price, group } = req.body;

   Group.findOneAndUpdate(
        { groupName: group }, // Find the group by name
        { $push: { courts: { courtName, location, about, image,price } } }, // Add court data to the group
        { upsert: true, new: true } // Create the group if it doesn't exist
    )
    .then((group) => {
        res.status(201).json({ message: 'Court data added to group successfully', group });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
};

const addToTeam= (req, res) => {
    const { teamName, basepoint, budget, image,price, group } = req.body;

   Groupt.findOneAndUpdate(
        { groupName: group }, // Find the group by name
        { $push: { teams: { teamName, basepoint, budget, image,price } } }, // Add court data to the group
        { upsert: true, new: true } // Create the group if it doesn't exist
    )
    .then((group) => {
        res.status(201).json({ message: 'Court data added to group successfully', group });
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
};



const getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
const getteams = async (req, res) => {
    try {
        const groups = await Groupt.find();
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteCourtFromGroup = (req, res) => {
    const { groupId, courtId } = req.params;
    Group.findByIdAndUpdate(groupId, { $pull: { courts: { _id: courtId } } })
        .then(() => {
            res.status(200).json({ message: 'Court deleted from group successfully' });
        })
        .catch((error) => {
            console.error('Error deleting court from group:', error);
            res.status(500).json({ error: 'Server error' });
        });
};
const deleteFromTeam = (req, res) => {
    const { groupId, teamId } = req.params;
    Groupt.findByIdAndUpdate(groupId, { $pull: { courts: { _id: teamId } } })
        .then(() => {
            res.status(200).json({ message: 'Court deleted from group successfully' });
        })
        .catch((error) => {
            console.error('Error deleting court from group:', error);
            res.status(500).json({ error: 'Server error' });
        });
};


module.exports = { getAllcourtsData, getSingleCourtData,dayWiseTimeSlot,getMybookingsData,addToGroup,getGroups,deleteCourtFromGroup,getAllteamsData,getteamCourtData,addToTeam,getteams,deleteFromTeam}