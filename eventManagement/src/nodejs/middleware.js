
const jwt=require("jsonwebtoken");

//middleware
function authenticateToken(req,res,next){

    const bearerHeader= req.headers['authorization'];


    console.log(bearerHeader);
    let token=bearerHeader.split(' ')[1];

    console.log(token);

    if( token !== undefined){
      // console.log(token);
       jwt.verify(token,''+"secret",(err,data)=>{
        if(err){
            console.log(err);
            return res.status(404);
        }else{
            console.log("key varified.");
            data,
            next();
        }
       })

    }else{
        console.log('no token received');
        res.status(403).json({
          Status:  "No token received"
        })
    }

}
module.exports=authenticateToken;
