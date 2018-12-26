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
    

    //deleteMany
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((res)=>{
    //     console.log(res);
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((res)=>{
    //     console.log(res);
    // });
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({compeleted:false}).then((res)=>{
    //     console.log(res);
    // });

    db.collection('Users').deleteMany({name:'ASiDesigner'});

    db.collection('Users').findOneAndDelete({_id:new ObjectID('5c233fbab02e9f0c089ee474')}).then((res)=>{
        console.log(JSON.stringify(res),undefined,2);
    });
    client.close();
});