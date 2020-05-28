const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/users");
const firebase = require("firebase");
const jwt = require('jsonwebtoken')
const bearerToken = require('express-bearer-token');
const config = require('../config')

router.route('/auth/login')
  .post(async(req,res)=>{
    try{
    let auth= await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)

    let userMongo = await User.findById(auth.user.uid).exec() 
    console.log(userMongo)

    let payload ={
      id: auth.user.uid,
      profile: userMongo.profile,
      email: userMongo.email
    };
    let token = jwt.sign(payload, config.jwtKey)
    
    if (!token) {
      res.status(500).json({ 'message': 'No ha sido posible iniciar sesión con el usuario. Inténtalo más tarde' })
      return
    }
    res.json({ 'token': token })
  } catch(e) {
    console.error(e)
    res.status(401).json({ message: e.message });
  }
  })

  module.exports= router