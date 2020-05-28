"use strict";
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const firebase = require("firebase");
const mustAuth = require("./middlewares/mustAuth");
const bearerToken = require("express-bearer-token");

router
  .route("/users")
  .get(mustAuth(), async (req, res) => {
    let searchId= req.params.id
    if (req.user.profile !== 'admin' && searchId !== req.user.id) {
      res.status(403).json({ 'message': 'Permisos insuficientes' })
      return
    }
    let itemList = await User.find().exec();
     
    res.json(itemList);
  })
  .post(async (req, res) => {
    try {
      let auth = await firebase
        .auth()
        .createUserWithEmailAndPassword(req.body.email, req.body.password);
      let userMongoData={
        email: req.body.email,
        _id: auth.user.uid,
        name: req.body.name,
        surname: req.body.surname,
        profile: req.body.profile
      }
      let newItem = await new User(userMongoData).save();

      let createdItem = newItem.toJSON();
      
      res.status(201).json(createdItem);

    } catch (err) {
      return res.status(404).send({
        status: "error",
        message: "esto no funciona ⛈",
        message: err,
      });
    }
  })
  router.route("/users/:id")
  .get( mustAuth(), async(req,res)=>{
    let searchId= req.params.id

    if (req.user.profile !== 'admin' && searchId !== req.user.id) {
      res.status(403).json({ 'message': 'Permisos insuficientes' })
      return
    }

    let foundItem = await User.findById(searchId).exec()    
    if (!foundItem) {
      console.info(searchId, "No encontrado")
      res.status(404).json({ 'message': 'El elemento que intentas obtener no existe' })
      return
    }
    let foundUser = foundItem.toJSON()

    res.json(foundUser)
  })
  .put(mustAuth(), async (req,res)=>{
    let searchId= req.params.id
    let filters = {uid: searchId}
    if(req.user.profile !== 'admin'&& searchId !== req.user.id){
      res.status(403).json({ 'message': 'Permisos insuficientes' })
      return
    }
    let foundItem = await User.findOneAndUpdate(filters,req.body, {new: true}).exec()
    if (!foundItem) {
      res.status(404).json({ 'message': 'El elemento que intentas eliminar no existe' })
      return
    }

    let foundUser = foundItem.toJSON()

    res.json(foundUser)
  })
  .delete(mustAuth(), async (req, res) => {

    let searchId = req.params.id

    if(req.user.profile !== 'admin'&& searchId !== req.user.id){
      res.status(403).json({ 'message': 'Permisos insuficientes' })
      return
    }
    let user = firebase.auth().currentUser;

    user.delete().then(function() {
      user
    }).catch(function(error) {
      res.status(403).json({ 'message': 'No ha sido posible borrar su usuario' })
    });
    let foundItem = await Articles.findOneAndDelete({_id: searchId}).exec()

    if (!foundItem) {
      res.status(404).json({ 'message': 'El elemento que intentas eliminar no existe' })
      return
    }

    res.status(204).json()
  })

module.exports = router;
