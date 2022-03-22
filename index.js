//install and import express , cors , mongoose

//import express from "express"
var nodemailer = require('nodemailer');
const express= require ("express")
const cors= require ("cors")
const mongoose= require ("mongoose")
const multer=require('multer')
//const res = require("express/lib/response")
//import cors from "cors"
//import mongoose from "mongoose"

//configure
const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



app.use('/images',express.static('images'));
//app.use('/images',express.static('images'));
const fileStorageEngine=multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
     // cb(null,Date.now()+ '--'+ file.originalname)
     cb(null, file.originalname)
  // cb(null,"brijesh.jpg")    
}
})

const upload=multer({storage:fileStorageEngine});

//let profile;
 //////////////////////////////////////
            //   Employeee filles//
    /////////////////////////////////////////
//     app.post('/employeefiles', upload.fields([{ name: 'highschoolPic', maxCount: 1 }, { name: 'intermediatePic', maxCount: 1 },
// { name: 'graduationPic', maxCount: 1 }, { name: 'postgraduationPic', maxCount: 1 },
// { name: 'aadharPic', maxCount: 1 }, { name: 'bankPic', maxCount: 1 },
// { name: 'panPic', maxCount: 1 }, { name: 'imagePic', maxCount: 1 }, { name: 'otherfile', maxCount: 1 }
// ]), (req,res,next)=>{
    app.post('/employeefiles', upload.single("highschoolPic"), (req,res)=>{
      //   profile=(req.file)?req.file.filename:null;
//console.log(profile);
console.log(req.data);
res.send("single file uploadede successfully");
})
app.post("/multiple",upload.array("images",3),
(req,res)=>{
    console.log(req.files);
    res.send("multiple files upload success");
});



//create database by mongoose
mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser:true,
    useUnifiedTopology: true
},()=>{
    console.log("DB connected")




});
//schema
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})


///Employeee Entry form
const userSchema1=new mongoose.Schema({
    name:String,
    fname:String,
    email:String,
    gender:String,
    offEmail:String,
    offPassword:String,
    offId:String,
    address:String,
    aadhar:String,
    pan:String,
    bankAccount:Number,
    Country:String,
    state:String,
    city:String,
    pincode:Number,
    highestDegree:String,
    lastCollege:String,
    
    
})
///model
const User=new mongoose.model("User",userSchema)
//const User1=new mongoose.model("User",userSchema1)

///model of employee
const EmployeeDetails=new mongoose.model("EmployeeDetails",userSchema1);

// EmployeeDetails.find({}, function(err,user)
// {
//     if(err)console.warn(err)
//     console.warn(user);
    
// })


//routes

app.post("/sendPasswordResetLink",(req,res)=>{
    //res.send("my Api  login")

const{email}=req.body
EmployeeDetails.findOne({email:email},(err,employeedetails)=>{
    if(employeedetails){
        if(email===employeedetails.email){
            var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'brijesh@inevitableinfotech.com',
    pass: 'tjkmzhpqktqvtitq'
  }
});
var data= Math.floor(Math.random() * (8000 - 1000)+1000) ;
var mailOptions = {
  from: 'brijesh@inevitableinfotech.com',
  to: email,
  subject: 'Otp for Reset Password',
  text: JSON.stringify(data)
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
res.send({message:"Check Otp on your email",val:data,vemail:employeedetails.email})
            
        }
            else{
                res.send({message:" please recheck email and enter again",val:false})
            }}
        else{

            
            res.send({message:" please recheck email and enter again",val:false})
        }
    
})


})

app.post("/login",(req,res)=>{
    //res.send("my Api  login")

const{email, name}=req.body
EmployeeDetails.findOne({email:email},(err,employeedetails)=>{
    if(employeedetails){
        if(name===employeedetails.name){
            res.send({message:"Login successfully",user:employeedetails,val:true})
        }
            else{
                res.send({message:"Invalid credentials, please recheck and enter again",val:false})
            }}
        else{

            
            res.send({message:"Invalid credentials, please recheck and enter again",val:false})
        }
    
})


})
app.post("/register",(req,res)=>{
//    res.send("my Api register")
//console.log(req.body)
const{name, email, password}=req.body
//for checking user already registerd or not
User.findOne({email:email}, (err, user)=>{
    if(user){
        res.send({message:"user already registerd"})
    }
    else{
        const user=new User({
            name,
            email,
            password
        })
        user.save(err=>{
            if(err){
                res.send(err)
            }
            else{

                res.send({message:"Successfully Resitered"})
            }
        })
    }
})


})


app.post("/employeedetailsform",(req,res)=>{
    
    const{
        name,
        fname,
        email,
        gender,
        offEmail,
        offPassword,
        offId,
        address,
        aadhar,
        pan,
        bankAccount,
        Country,
        state,
        city,
        pincode,
        highestDegree,
        lastCollege
           
    }=req.body
            const user=new EmployeeDetails({
                name,
                fname,
                email,
                gender,
                offEmail,
                offPassword,
                offId,
                address,
                aadhar,
                pan,
                bankAccount,
                Country,
                state,
                city,
                pincode,
                highestDegree,
                lastCollege,
        
            
            });
            
        //console.log(req.file);
       // res.send("single file uploadede successfully")
            user.save(err=>{
                if(err){
                    res.send(err)
                }
                
                else{
    
                    res.send({message:"Successfully Resitered"})
                }
            })
        }
   // })
    
    
    //}
    )
    

    app.post("/employeeDetails",(req,res,next)=>{
        EmployeeDetails.find(function(err,employeedetails){
            if(err){
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails);
            res.json(employeedetails);
        })
    })
   


    app.get("/employeeDetail",(req,res,next)=>{
        EmployeeDetails.find({},(err,employeedetails)=>{
            if(err){
                console.warn(err)
                return next(err)
            }
          //  console.warn(employeedetails);
            res.json(employeedetails);
        })
    })
   
//     app.get("/employeeDetail",async (req,res,next)=>{
//         EmployeeDetails.find({},(err,employeedetails)=>{
//             if(err){
//                 console.warn(err)
//                 return next(err)
//             }
//             console.warn(employeedetails);
// //res.json(employeedetails);
//             res.send(employeedetails);
//         })
//     })
   
        
/* UPDATE BOOK */
// app.put("/update", async(req,res)=>{
//     const newFoodName =req.body.newFoodName;
//     const newpass =req.body.newpass;
   
//     const id=req.body.id;
//     try{
//         await EmployeeDetails.findById(id,(err,employeedetails)=>{
//             employeedetails.name=newFoodName;
//             employeedetails.offPassword=newpass;
            
//             employeedetails.save();
//             res.send("update");
//         });
//     }
//     catch(err){
//         console.log(err);
//     }
// })  


///2nd update
app.put("/update", async(req,res)=>{
    const newFoodName =req.body.password;
    // const newpass =req.body.newpass;
   
    const id=req.body.id;
    try{
        await EmployeeDetails.findById(id,(err,employeedetails)=>{
            employeedetails.name=newFoodName;
           // employeedetails.offPassword=newpass;
            
            employeedetails.save();
            res.send("Password updated");
        });
    }
    catch(err){
        console.log(err);
    }
})  

  /* DELETE BOOK */
  app.delete('/delete/:id', async(req, res)=> {
      const id=req.params.id;
    await EmployeeDetails.findByIdAndRemove(id).exec();
    res.send("deleted");
  });
app.listen(9005,()=>{
    console.log("BE started at port 9005")
})

