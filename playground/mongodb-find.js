//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        return console.log('Unable to connect to mogoDB server');
    }

    console.log('Connected to mongoDB server');

  
    const db = client.db('TodoApp');
    
    // db.collection('Todos').find({
    //     _id:new ObjectID('5c23433fe9b33a1a2ca99efa')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));

    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count: ${count}`);
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });

    db.collection('Users').find({name:'ASiDesigner'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fetch todos',err);
    });
    client.close();
});