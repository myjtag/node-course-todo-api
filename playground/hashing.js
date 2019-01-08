const {SHA256,SHA512} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password= '123abc!';

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     });
// });


let hashedPassword = '$2a$10$dxLBUBnByMmnUeGmwghNnulSsGRqre/nDt8Vrn/JMvclbHk3BB6bq';

bcrypt.compare('123abc',hashedPassword,(err,res)=>{
    console.log(res);
});
// let data = {
//     id:10,
//     text:'ASiDesigner'
// };

// let token = jwt.sign(data,'123abc');
// console.log(token);

// let decoded=jwt.verify(token,'123abc');
// console.log('Decoded ',decoded);

// let message = 'I am user number 3I am user number 3I am user number 3I am user number 3I am user number 3I am user number 3I am user number 3I am user number 3';
// let hash = SHA256(message).toString();
// let hash512 = SHA512(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// console.log(`SHA512`);
// console.log(`Hash: ${hash512}`);

// let data = {
//     id: 4,
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// };


// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();



// if(resultHash === token.hash){
//     console.log('Data was not changed');
// }else{
//     console.log('Data was changed. Do not trust');
// }