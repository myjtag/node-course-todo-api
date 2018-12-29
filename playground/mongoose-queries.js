const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//let id = "5c272db9b51ddd0804eec776";

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todo',todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log("ID not found");
//     }
//     console.log('Todo by ID',todo);
// }).catch((e)=>console.log(e));
let id = "5c238ee8d057f4177c866be8";

User.findById(id).then((user)=>{
    if(!user){
        return console.log('User not found');
    }
    console.log(JSON.stringify(user,undefined,2));

},(e)=>console.log(e));