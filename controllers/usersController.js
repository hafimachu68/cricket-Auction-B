const Player=require('../Models/PlayerModels')
const Group=require('../Models/groupModels');
const team = require('../Models/teamModels');
const Groupt = require('../Models/teamgModels');





const getAllPlayersData = (req, res) => {
    Player.find().then((response) => {
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




const getSinglePlayerData = async (req, res) => {
    try {
        const result = await Player.findOne({ _id: req.query.playerId })
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

const addToGroup = (req, res) => {
    const { playerName, role, basepoint, image,bidpoint, group } = req.body;

   Group.findOneAndUpdate(
        { groupName: group }, // Find the group by name
        { $push: { players: { playerName, role, basepoint, image,bidpoint } } }, // Add Player data to the group
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
        { $push: { teams: { teamName, basepoint, budget, image,price } } }, // Add Player data to the group
        { upsert: true, new: true } // Create the group if it doesn't exist
    )
    .then((group) => {
        res.status(201).json({ message: 'team data added to group successfully', group });
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

const deletePlayerFromGroup = (req, res) => {
    const { groupId, playerId } = req.params;
    Group.findByIdAndUpdate(groupId, { $pull: { players: { _id:  playerId } } })
        .then(() => {
            res.status(200).json({ message: 'Player deleted from group successfully' });
        })
        .catch((error) => {
            console.error('Error deleting Player from group:', error);
            res.status(500).json({ error: 'Server error' });
        });
};

const deleteFromTeam = (req, res) => {
    const { groupId, teamId } = req.params;
    Groupt.findByIdAndUpdate(groupId, { $pull: { teams: { _id: teamId } } })
        .then(() => {
            res.status(200).json({ message: 'Player deleted from group successfully' });
        })
        .catch((error) => {
            console.error('Error deleting Player from group:', error);
            res.status(500).json({ error: 'Server error' });
        });
};


module.exports = { getAllPlayersData, getSinglePlayerData,addToGroup,getGroups,deletePlayerFromGroup,getAllteamsData,getteamCourtData,addToTeam,getteams,deleteFromTeam}