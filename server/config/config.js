let env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
    let config = require('./config.json');
    let envConfig = config[env];

   Object.keys(envConfig).forEach((key)=>{
    process.env[key] = envConfig[key];
   });
   
}

// if(env === 'development'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp2';
// }else if (env === 'test'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }else{ // production
//     // process.env.PORT = 3000;
//     // process.env.MONGODB_URI = 'mongodb://admin:welcome110@ds145484.mlab.com:45484/todos';
    
// }


