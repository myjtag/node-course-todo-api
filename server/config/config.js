let env = process.env.NODE_ENV || 'development';


if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://admin:welcome110@ds145484.mlab.com:45484/todos';
}else if (env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}else{
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://admin:welcome110@ds145484.mlab.com:45484/todos';

}

