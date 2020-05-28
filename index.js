const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080
const config = require('./config')
const { json } = require('express');
const firebase = require('firebase');
const mongoose = require('mongoose');

app.use(json())
app.use(cors())

/* const articlesRoute= require('./routes/articles') */
const usersRoute= require('./routes/users')
/* const authRoute= require('./routes/auth') */

/* app.use(articlesRoute) */
app.use(usersRoute)
/* app.use(authRoute) */

firebase.initializeApp(config.firebaseConfig)

async function connectDatabase() {
  let db = mongoose.connection;
  
  try {
    await mongoose.connect(config.mongoConfig, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("Imposible conectar a la base de datos");
    console.log(err);
  }
}

async function init() {
  await connectDatabase();
  app.listen(PORT, () => console.log(`Conectado al puerto ${PORT}`));
}

init();