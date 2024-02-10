const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    courts: [{
        courtName: String,
        location: String,
        about: String,
        image: String,
        price:String
    }]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
