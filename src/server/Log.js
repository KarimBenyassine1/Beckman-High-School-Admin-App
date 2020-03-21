const mongoose = require('mongoose');


const LogSchema = mongoose.Schema({
    id: {
        type: Date.now()
    },
    username: {
    type: String,
    required: true
    },
    password: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model('Log', LogSchema);