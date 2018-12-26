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
    
    // db.collection('Todos').findOneAndUpdate({
    //     _id:new ObjectID('5c236b20e9b33a2430f0763b')},{
    //         $set:{
    //             compeleted: true
    //         }
    //     },{
    //         returnOriginal:false
    //     }).then((res)=>{
    //         console.log(res);
    //     });

    db.collection('Users').findOneAndUpdate({ _id : 123},{
        $set:{
            name: 'ASiDesigner',
        },
        $inc:{
            age:1
        }
    },{
        returnOriginal:false
    }).then((res)=>{
        console.log(res);
    })


    client.close();
});