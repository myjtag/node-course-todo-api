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
    compeletedAt:{
        type: Number,
        default: null
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
});

module.exports = {Todo};

