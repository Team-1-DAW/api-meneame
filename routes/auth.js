const express = require("express");
const router = express.Router();
const User = require("../models/users");
const firebase = require("firebase");
const jwt = require('jsonwebtoken')
const bearerToken = require('express-bearer-token')

router.route('auth/login')
  .post(async(req,res)=>{
    let auth= await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)

    let userMongo = await User.findById()

    let payload ={
      id: auth.user.uid,
      profile: 
    }

  })