const mongoose = require('mongoose');


const WhitelistSchema = new mongoose.Schema({

    licencePlatenumber: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
} , {timestamps:true})


module.exports = mongoose.model('whitelist' , WhitelistSchema)