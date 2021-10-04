const { Router } = require("express");
const router= Router();

const mysql=require("../connection");
const jwt=require("jsonwebtoken");
const authenticateToken=require("../middleware");

const bcrypt=require('bcrypt')




router.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});



router.get('/',(req,res)=>{
    res.status(200).json('Server on port and database is connected');
});


//ticketCategory
router.get('/user/ticketcategory',(req,res)=>{
    let categories=[];
    mysql.query('SELECT * from ticketcategory',(error,rows,field)=>{
        if(!error){
            for(let i=0 ; i<rows.length;i++){
                categories.push(rows[i]);
            }

            console.log(categories);
            res.status(200).json(categories);
        }else{
            res.json(error);
        }

    })
})


//getting ticket details
router.get('/user/ticket/:Event_ID',authenticateToken,(req,res)=>{

    let array=[];
    let cat=[];
    const{Event_ID}=req.params;
    console.log(req.params);
    mysql.query("Select * from event INNER JOIN ticket on event.Event_ID = ticket.Event_ID WHERE event.Event_ID=?",
    [Event_ID],(error,rows,field)=>{
        if(!error){
        //console.log(rows);
        for(let i=0;i < rows.length ; i++){
            array.push(rows[i]);

        }
       // console.log(cat);
        console.log(array);
        res.send({array, status:200});
        }else{
            console.log(error);
        }
    })
})

//getting booking details from booking table
router.get('/user/booking',authenticateToken,(req,res)=>{
    mysql.query("SELECT * FROM booking",(error,rows,field)=>{
    let array=[];
    if(!error){
        for(let i=0;i<rows.length;i++){
            array.push(rows[i]);
        }
        res.status(200).json(array);
    }
    else{
        console.log(error);
    }
    })
})

//getEvents
router.get('/user/events',authenticateToken,(req,res)=>{
    mysql.query("Select * from event ",(error,rows,field)=>{
        let array =[];

        if(!error){
            for(let i =0; i< rows.length ; i++){
                array.push(rows[i]);
            }

            res.send({array, status:200})
        }else{

            console.log('error');
        }
})
})



//insert into booking table
router.post('/user/booking',authenticateToken,(req,res)=>{
    const{UserID, TicketID,CategoryName,NumberOFTickets,PaymentType,Amount,Event_Name}=req.body;
    mysql.query('INSERT INTO booking(UserID, TicketID,CategoryName,NumberOFTickets,PaymentType,Amount,Event_Name) VALUES(?,?,?,?,?,?,?);',
    [UserID,TicketID,CategoryName,NumberOFTickets,PaymentType,Amount,Event_Name], (error,rows,field)=>{
        if(!error){
            return res.status(200).json({Status:'Ticket Booked'});
        }else{
            console.log(error);
        }
    });

})

//register user api
router.post('/:user',async(req,res)=>{
    const { EmailAddress,password,FName,LName,phoneNumber}=req.body;

    mysql.query('Select Count(*) As cnt, password from user WHERE EmailAddress=? ',[EmailAddress],async(error,rows)=>{
        if(error){
            console.log(error);
        }
        else{
            if(rows[0].cnt > 0){
                res.status(403).json({Status: 'User already exists'});
            }else{
              const hash=await bcrypt.hash(password,10);
              console.log(hash)

                mysql.query('INSERT INTO user(EmailAddress,password,FName,LName,phoneNumber) values(?,?,?,?,?);',
                [EmailAddress,hash,FName,LName,phoneNumber], (error,rows,field)=>{
                if(!error){
                      return res.send({status:200});
                }else{
                  res.send({status:404,error})
                    console.log(error);
                }
                });
            }
        }
    })
});

//login api
let user;
let userName;
router.post('/:user/login',(req,res)=>{
    const{EmailAddress,password}=req.body;

    mysql.query('Select * from user where EmailAddress=?',[EmailAddress],async(error,rows)=>{
      if(!error){
        if(rows.length>0){
          console.log(rows[0].password)
          console.log(password)


          const validPass=await bcrypt.compare(password,rows[0].password)
          console.log(validPass)
          if(validPass)
          {
            const token=jwt.sign({
              EmailAddress: rows[0].email
            }, "secret",
            {
              expiresIn: "1h"
            }
            );
            user=rows[0]['UserID'].toString();
            userName=rows[0]['FName'];
            res.send({
                status: 200,
                message:"Login Sucessfull",
                token:token,
                user,
                userName
              });
        }else{
          res.send({status:442})
        }

        }else{
          res.send({status:442})
        }

      }else{
        res.send({status:442})
      }
    })


})




//updating available tickets after booking
router.put('/user/ticket/:TicketID',(req,res)=>{
    let array=[];
    const{TicketID} = req.params;
    mysql.query('Select * from ticket Where TicketID =?',
    [TicketID],(error,rows,field)=>{
        if(!error){
            const{TicketsAvailable}=req.body;
            const{TicketID}=req.params;
            mysql.query('Update ticket set TicketsAvailable=? where TicketID =?',[TicketsAvailable,TicketID],(error,rows,field)=>{
                if(!error){
                    res.status(200).send({status: 'Column updated'});
                }else{
                    console.log("lag gaye");
                }
            })
            }



    });
});

router.put('/:user/:UserID',(req,res)=>{
    const{UserID}=req.params;
    const {EmailAddress,password,FName,LName,phoneNumber}=req.body;
    console.log(req.body);
    mysql.query('update user set EmailAddress=?, password=?, FName=?, LName=?,phoneNumber=? where UserID = ? ;',
     [EmailAddress,password,FName,LName,phoneNumber,UserID],(error,rows,field)=>{
        if(!error){
            res.json({Status: 'User Updated'});
        }else{
            console.log(error);
        }
     });
});


//deleting booking
router.delete('/user/Booking/:bookingID',(req,res)=>{
    const {bookingID}=req.params;
    mysql.query('Delete from booking where bookingID = ?; ',[bookingID],(error,rows,field)=>{
        if(!error){
            console.log("123");
            res.json({Status: 'User Deleted'});
        }else{
            res.json({Status: error});
        }
    });
});


//getCartDetails()
router.get('/user/cart/:UserID',(req,res)=>{
    const{UserID}=req.params;
    let array=[];
    mysql.query("Select * from cart WHERE UserID =?",[UserID],(error,rows)=>{
        if(!error){
            for(let i=0;i< rows.length;i++){
                array.push(rows[i]);
            }
            console.log(array);
            res.status(200).json(array);
        }
    });
});


//delete cart
router.delete('/user/cart/:CartID',(req,res)=>{
    const{CartID}=req.params;
    mysql.query("DELETE FROM cart where CartID = ?",[CartID],(error,rows,field)=>{
    if(!error){
        res.status(200).send();

    }else{
        res.status(404).send();
    }
    })
});

//insert into cart
router.post('/user/cart',(req,res)=>{
    const{Event_Name,Price,AvailTickets,CategoryName,UserID}=req.body;
    mysql.query("Select Count(*) as cnt from cart WHERE Event_Name=? AND CategoryName=? AND UserID=?",[Event_Name,CategoryName,UserID],(error,rows)=>{
        if(error){
            console.log(error);
        }else{
            if(rows[0].cnt>0){
                res.status(404).send('product already exists');
            }else{
                mysql.query('INSERT INTO cart(Event_Name, Price, CategoryName,AvailTickets,UserID) VALUES (?,?,?,?,?)',
                    [Event_Name,Price,CategoryName,AvailTickets,UserID],(error,rows,field)=>{
                        if(!error){
                            return res.status(200).json({Status: 'success'});
                        }
                        else{
                            console.log(error);
                        }
                    });
            }
        }
    });

});

//////////////ADMIN SIDE API////////////////////////////////////////

//getAdmminLogin

router.post("/user/admin",(req,res)=>{
  const{adminEmail, adminPass}=req.body;
  mysql.query("Select * from admin where adminEmail=? and adminPass=?",[adminEmail,adminPass],(error,rows)=>{
    if(rows.length>0){
      const token=jwt.sign({
        EmailAddress: rows[0].email
    }, "secret",
    {
        expiresIn: "1h"
    }
    );
    console.log(token);

      res.send({
        status: 200,
        token: token
      });

    }else{
      res.send({status:403});
    }
  })
})



//getUser
router.get('/user/userData',authenticateToken,(req,res)=>{
  let array=[];
  mysql.query("Select * from user",(error,result,field)=>{
    if(error){
      console.log(error)
    }else{
      for(let i=0;i<result.length;i++){
        array.push(result[i]);
      }
      res.send({
        array,
        status:200
      });
    }
  })
})

//getEvents
router.get('/user/AdminEvent',authenticateToken,(req,res)=>{
  mysql.query("Select * from event",(error,result)=>{
    let array=[];
    if(error){
      console.log(error);
    }else{
     // console.log(result);
     for(let i=0; i < result.length ; i++ ){
       array.push(result[i]);
     }

     res.send({
        array,
        status:200
    });

    }
  })
})
//getTickets
router.get('/user/AdminTickets',authenticateToken,(req,res)=>{
  mysql.query("Select * from ticket",(error,result)=>{
    let array=[];
    if(error){

      console.log(error);
    }else{
      for(let i=0;i<result.length;i++){
        array.push(result[i])
      }
      res.send({array,status:200});
    }
  })
})

//getTicketCategory
router.get('/user/AdminTicketCategory',authenticateToken,(req,res)=>{
  mysql.query("Select * from ticketcategory",(error,result)=>{
    let array=[];
    if(error){
      console.log(error)
    }else{
      for(let i=0;i<result.length;i++){
        array.push(result[i])
      }
      res.send({array, status:200});
    }
  })
})
//addCategory
router.post('/user/addCat',authenticateToken,(req,res)=>{
  const{CategoryName}=req.body;
  mysql.query('Select * from ticketcategory where CategoryName=?',[CategoryName],(error,result)=>{
    if(result.length>0){
      res.send({
        message:"123123123",
        status:422
      })
      console.log('category already exists')
    }else{
      mysql.query("INSERT INTO ticketcategory(CategoryName) VALUES(?)",[CategoryName],(error,rows)=>{
        if(!error){
          res.send({
            status:200,
            message:"123123123",
          });
      }else{
          res.send(error);
      }

      })
    }
  })

})

//deleteCategory
router.delete('/user/catDel/:CategoryName',authenticateToken,(req,res)=>{
  const{CategoryName}=req.params;
  console.log(CategoryName)
  mysql.query('Delete from ticketcategory where CategoryName=?',[CategoryName],(error,result)=>{
    if(error){
      res.send(error)
      console.log(error);
    }else{
      res.send({status:200});
    }
  })
})

//delete events
router.delete('/user/eventDel/:EventID',authenticateToken,(req,res)=>{

  const{EventID}=req.params;
  mysql.query("Delete from event where Event_ID=? ",[EventID],(error,result,field)=>{
    if(error){
      res.send(error);
      console.log(error);
    }else
      res.send({status:200});
  });
})

//delete users
router.delete('/user/userDel/:userID',authenticateToken,(req,res)=>{

  const{userID}=req.params;
  mysql.query("Delete from user where UserID=?",[userID],(error,result)=>{
    if(error){
      res.send(error)
      console.log(error)
    }else{
      res.send({status:200});
    }
  })
})
//delete Ticket
router.delete('/user/ticketDel/:TicketID',authenticateToken,(req,res)=>{
  const{TicketID}=req.params;
  mysql.query("Delete from ticket where TicketID=?",[TicketID],(error,result)=>{
    if(error){
      res.send(error);
      console.log(error)
    }else{
      res.send({status:200})
      console.log("done");
    }
  })
})


//addEvent
router.post('/admin/addEvent',authenticateToken,(req,res)=>{
  const{Event_Name, Description,Location,DateTime}=req.body;
  mysql.query('INSERT INTO event(Event_Name,Description,Location,DateTime) VALUES(?,?,?,?);',
  [Event_Name,Description,Location,DateTime]  , (error,rows,field)=>{
      if(!error){
          return res.json({Status:200});
      }else{
          console.log(error);
      }
  });

})

//updateEvent
router.put('/admin/updateEvent/:Event_ID',authenticateToken,(req,res)=>{
  const{Event_ID}=req.params;

  const {Event_Name,Description,Location,DateTime}=req.body;
  console.log(req.body);
  mysql.query('Update event set Event_Name=?,Description=?,Location=?,DateTime=?  where Event_ID=? ',[Event_Name,Description,Location,DateTime,Event_ID],(error,rows,field)=>{
    console.log(Event_Name);
    if(!error){
          res.send({status: 200});
      }else{

          console.log(error);
      }
   });
});



//addTicket

router.post('/admin/addTicket',authenticateToken,(req,res)=>{
  const{Event_ID,price,TicketsAvailable,CategoryName }=req.body;

  mysql.query("Insert into ticket(Event_ID,price,TicketsAvailable,CategoryName) Values(?,?,?,?);",[Event_ID,price,TicketsAvailable,CategoryName],(error,rows)=>{
    if(!error){
      return res.json({Status:200})
    }else{
      res.json(error)

      console.log(error);
    }
  })
})

//updateTicket
router.put('/admin/updateTicket/:TicketID',authenticateToken,(req,res)=>{
  const{TicketID}=req.params;
  console.log(req.params)
  const{price,TicketsAvailable}=req.body;
  mysql.query("Update ticket set price=?, TicketsAvailable=? where TicketID=?",[price,TicketsAvailable,TicketID],(error,result)=>{
    if(error){
      res.send(error);

      console.log(error)
    }else{
      console.log(TicketID)
      console.log(price);
      console.log(TicketsAvailable);
      res.json({Status:200});
    }

  })
})





module.exports=router;
