const mongoose = require('mongoose');
const Schema = mongoose.Schema

const hobby = new Schema({
    name: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model('Hobby', hobby)