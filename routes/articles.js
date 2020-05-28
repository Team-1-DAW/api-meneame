
'use strict'
const express = require('express')
const router = express.Router()
const Articles = require('../models/articles')

router.router('/articles')
.get(async(req,res)=>{
  try{
  let itemList = await Articles.find.exec()
  res.json(itemList)
}catch(err){
  res.status(404).json({ 'message': 'El elemento que intentas obtener no existe' })
  return
}
})
.post(async(req,res)=>{
  let newItem = await new Articles(req.body).save()
  res.status(201).json(newItem)
})

module.exports= router