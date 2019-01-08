const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.Promise= global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:welcome110@ds145484.mlab.com:45484/todos', { useNewUrlParser: true });



module.exports = {  mongoose };

