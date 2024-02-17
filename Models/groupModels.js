const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    players: [{
        playerName: String,
        role: String,
        basepoint: String,
        image: String,
       bidpoint:String
    }]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
