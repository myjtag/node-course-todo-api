require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res)=>{
    let todo = new Todo({
        text: req.body.text,
        _creator:req.user._id
    });
    console.log(req.body);

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',authenticate,(req,res)=>{
    Todo.find({
        _creator:req.user._id
    }).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

//GET /todos/1234
app.get('/todos/:id',authenticate,(req,res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findOne({
        _id:id,
        _creator: req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});

    }).catch((e)=>{
        res.status(400).send();
    });
});


app.delete('/todos/:id',authenticate,(req,res)=>{
    
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id
    }).then((doc)=>{
        if(!doc){
            return res.status(404).send();
        }

        res.send({doc});

    }).catch((e)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id',authenticate,(req,res)=>{
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
    
    Todo.findOneAndUpdate({
        _id:id,
        _creator:req.user._id
    }
        ,{$set:body},{new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e)=> res.status(400).send());
});

app.post('/users/',(req,res)=>{
    
    let body = _.pick(req.body,['email','password']);
    console.log(body);
    let user = new User(body);
 
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send();
    });
});


app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

app.post('/users/login',(req,res)=>{

    let body = _.pick(req.body,['email','password']);
    let email = _.pick(req.body,'email');
    

    User.findByCredentials(body.email,body.password).then((user)=>{
        user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
        
    }).catch((e)=>{
        res.status(400).send();
    });

});


app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();
    })
});

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};