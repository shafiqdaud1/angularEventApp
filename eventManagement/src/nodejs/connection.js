var mysql=require("mysql");

var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"eventmanagement"
});

connection.connect((err)=>{
    if(!err){
        console.log('Connection successful');
    }
    else{
        console.log('Connection failed');
    }
})

module.exports=connection;