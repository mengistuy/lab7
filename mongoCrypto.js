const crypto=require('crypto')
const mongodb=require('mongodb')
const express=require('express')
const app=express();

app.set('view engine','pug')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("homework7");
  dbo.collection("homework7").findOne({}, function(err, result) {
    if (err) throw err;
    dec(result.message);
    db.close();
  });
});

function dec(hash){
var mykey = crypto.createDecipher('aes256', 'asaadsaad');
var decrypted = mykey.update(hash, 'hex', 'utf8')
app.get('/secret',(req,res)=>{
    res.render('index',{title:"Sec",encryptedStr:`Encrypted- ${hash}`, decryptedStr:`Decrypted - ${decrypted}`})
});
console.log(decrypted);
}
app.listen(808)
