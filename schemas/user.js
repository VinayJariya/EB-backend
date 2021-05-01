const mongoose = require('mongoose');
const Schema = mongoose.Schema

const user = new Schema({
    username: {
        type: String,
        require: true
    }, 
    password: {
        type: String,
        require: true
    }, 
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['Super User', 'Normal User'],
        default: 'Normal User'
    },
    firstName: {
        type: String,
        require: true
    }, 
    lastName: {
        type: String,
        require: true
    },
    hobbies: [{
        type: Schema.Types.ObjectId,
        ref: 'Hobby'
    }]
})


module.exports = mongoose.model('User', user)