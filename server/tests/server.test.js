const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {todos,populateTodos,users,populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos',()=>{
    it('Should create a new todo',(done)=>{
        let text = 'Test todo text!!';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                   return done(err);
                }

                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('Should not creat todo with invalid body data',(done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=> done(e));
            });
    });

});

describe('GET /todos',()=>{
    it('Should get all todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});


describe('GET /todos/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('Should return 404 if todo not found',(done)=>{
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids',(done)=>{
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});


describe('DELTE todos/:id',()=>{
    it('Should remove a todo',(done)=>{
        let hexID = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.doc._id).toBe(hexID);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.findById(hexID).then((doc)=>{
                    expect(doc).toBeFalsy();
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('should return 404 if todo not found',(done)=>{
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });


    it('should return 404 if object id is invalid',(done)=>{
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});


describe('PATCH /todos/:id',()=>{

    it('should update the todo',(done)=>{
        //grab id of first item
        let hexID = todos[0]._id.toHexString();
        let text = 'This should be the new text';
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                compeleted:true,
                text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text);
                expect(typeof res.body.todo.compeletedAt).toBe('number');
                expect(res.body.todo.compeleted).toBe(true);
            })
            .end(done);
        //update text, set compeleted true
        //200
        //text is changed, compelted is true, compeletedAt is a mmber .toBeA
    });

    it('should clear compeletedat when todo is not compeleted',(done)=>{
        let hexID = todos[1]._id.toHexString();
        let text = 'This should be the new text 2';
        request(app)
        .patch(`/todos/${hexID}`)
        .send({
            compeleted:false,
            text
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.compeletedAt).toBeFalsy();
            expect(res.body.todo.compeleted).toBe(false);
        })
        .end(done);

    });
});

describe('GET /users/me',()=>{

    it('should return user if authenticated',(done)=>{
        request(app)
            .get('/users/me')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });


    it('should return 401 if not authenticated',(done)=>{
        request(app)
            .get('/users/me')
            //.set('',users[0].tokens[0].token)
            .expect(401)
            // .expect((res)=>{
            //      expect(res.body).toBeNull();
            // })
            .end(done);
    });
});


describe('POST /users',()=>{

    it('Should create a user',(done)=>{
        let email = 'eaxmpl@example.com';
        let password = '123mnb!';

        request(app)
            .post('/users')
            .send({email,password})
            .expect(200)
            .expect((res)=>{
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err)=>{
                if(err){
                    return done(err);
                }
                User.findOne({email}).then((user)=>{
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('should return validation erros if request invalid',(done)=>{
        //invalid email and password
        request(app)
            .post('/users')
            .send({email:'ali',password:'123'})
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use ',(done)=>{
        //email that already taken
        request(app)
            .post('/users')
            .send({email: users[0].email,password: '123asdc!'})
            .expect(400)
            .end(done);
    });
});


describe('POST /users/login',()=>{

    it('should login user and return auth token',(done)=>{
        request(app)
            .post('/users/login')
            .send({
                email:users[1].email,
                password:users[1].password
            })
            .expect(200)
            .expect((res)=>{
                expect(res.headers['x-auth']).toBeTruthy();
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                User.findById(users[1]._id).then((user)=>{
                    // expect(user.tokens[0]).toInclude({
                    //     access:'auth',
                    //     token: res.headers['x-auth']
                    // });
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('Should reject invalid login',(done)=>{
        request(app)
            .post('/users/login')
            .send({
                email:users[1].email,
                password:users[1].password + '1'
            })
            .expect(400)
            .expect((res)=>{
                expect(res.headers['x-auth']).toBeFalsy();
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e)=> done(e));
            });
    });
});

describe('DELET /users/me/token',()=>{
    it('should remove auth token on logout',(done)=>{

        request(app)
            .delete('/users/me/token')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                User.findById(users[0]._id).then((user)=>{
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e)=> done(e));
            });
    });
});