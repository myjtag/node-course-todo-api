const mongoose = require('mongoose');

let Todo = mongoose.model('Todo',{
    text:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    compeleted:{
        type: Boolean,
        default: false
    },
    comeletedAt:{
        type: Number,
        default: null
    }
});

module.exports = {Todo};

