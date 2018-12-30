const mongoose = require('mongoose');

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://admin:welcome110@ds145484.mlab.com:45484/todos' || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });


module.exports = {  mongoose };