const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res)=>{
//     console.log(res);
// });

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()
// Todo.findOneAndRemove({_id:'5c288e3bb35d5000170ba238'}).then((todo)=>{
//     console.log(todo);
// });

Todo.findByIdAndRemove('5c288e3bb35d5000170ba238').then((todo)=>{
    console.log(todo);
});