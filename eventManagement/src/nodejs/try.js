const express=require('express');
const app=express();
var cors = require('cors');


app.use(cors());

//setting
app.set('port',process.env.PORT ||4000);

//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/user'));

//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});














////DELETE
//con.connect(function(err){
//    if(err) throw err;
//    console.log("connected");
//    var sql="DELETE FROM user WHERE FName='Khan'";
//    con.query(sql,function(err,result){
//        if(err) throw err;
//        console.log("one value deleted");
//    });
//});


//////INSERT
//con.connect(function(err){
//    if(err) throw err;
//    console.log("connected");
//    var sql="INSERT INTO events(Description,DateTime,address) VALUES ? ";
//    var values=[
//        ['Home Coming','2021-08-25 13:54:18','Qaddafi stadium Lahore'],
//        ['New Year Night','2022-01-01 00:00:00','National stadium Karachi'],
//        ['JOB FAIR','2021-07-16 13:54:18','Alhamra Art']
//    ];
//    con.query(sql,[values],function(err,result){
//        if(err) throw err;
//        console.log("multiple records added");
//    });
//});

//
//var mysql=require("mysql");
//var connection=mysql.createConnection({
//    host:"localhost",
//    user:"root",
//    password:"",
//    database:"mydb"
//});
//
////Create Table
//
//connection.connect(function(err){
//    if(err) throw err;
//    console.log("connected");
//    var sql=("Create TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, Email VARCHAR(255), Password VARCHAR(255), Name VARCHAR(255), phoneNumber INT(255))")
//    connection.query(sql,function(err,result){
//        if(err) throw err;
//        console.log("new table created");
//    });
//});


//alter table
//
//con.connect(function(err){
//    if(err) throw err;
//    console.log("connected");
//    var sql="ALTER TABLE events ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY"
//    con.query(sql,function(err,result){
//        if(err) throw err;
//        console.log("new column added");
//    });
//});
