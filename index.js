//install and import express , cors , mongoose

//import express from "express"
const express= require ("express")
const cors= require ("cors")
const mongoose= require ("mongoose")
const res = require("express/lib/response")
//import cors from "cors"
//import mongoose from "mongoose"

//configure
const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//create database by mongoose
mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser:true,
    useUnifiedTopology: true
},()=>{
    console.log("DB connected")




})
//schema
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
///model
const User=new mongoose.model("User",userSchema)
//routes

app.post("/login",(req,res)=>{
    //res.send("my Api  login")

const{email, password}=req.body
User.findOne({email:email},(err,user)=>{
    if(user){
        if(password===user.password){
            res.send({message:"Login successfully",user:user})
        }
            else{
                res.send({message:"password didn't match"})
            }}
        else{

            
            res.send({message:"user not registered"})
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

app.listen(9002,()=>{
    console.log("BE started at port 9002")
})

