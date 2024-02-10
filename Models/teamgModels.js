const mongoose = require('mongoose');

const tgroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    teams: [{
        teamName: String,
        basepoint: String,
        budget: String,
        image: String,
        price:String
    }]
});

const Groupt = mongoose.model('Groupt', tgroupSchema);

module.exports = Groupt;
