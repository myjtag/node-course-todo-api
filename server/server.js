require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    let todo = new Todo({
        text: req.body.text,
    });
    console.log(req.body);

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

//GET /todos/1234
app.get('/todos/:id',(req,res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});

    }).catch((e)=>{
        res.status(400).send();
    });
});


app.delete('/todos/:id',(req,res)=>{
    
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((doc)=>{
        if(!doc){
            return res.status(404).send();
        }

        res.send({doc});

    }).catch((e)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id',(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body,['text','compeleted']);
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.compeleted) && body.compeleted){
        body.compeletedAt = new Date().getTime();
    }else {
        body.compeleted = false;
        body.compeletedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e)=> res.status(400).send());
});

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};