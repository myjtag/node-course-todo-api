//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        return console.log('Unable to connect to mogoDB server');
    }

    console.log('Connected to mongoDB server');

    //const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text:'Some thing to do',
    //     compeleted:false,

    // },(err,res)=>{
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }

    //     console.log(JSON.stringify(res.ops,undefined,2));

    // });

    //Insert new doc into Users (name,age,location)
    const db = client.db('TodoApp');
    
    // db.collection('Users').insertOne({
    //     name:'ASiDesigner',
    //     age:36,
    //     location:'shiraz'
    // },(err,res)=>{
    //     if(err){
    //         return console.log('Unable to insert Users',err);
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    //     console.log(res.ops[0]._id.getTimestamp());
    // });

    client.close();
});