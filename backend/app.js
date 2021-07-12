const express = require('express');         // importation application Express
require('dotenv').config()                  // importation dotenv pour sécuriser passwords
const mysqlTable = process.env.MYSQLTABLE;
const mysqlUsername = process.env.MYSQLUSERNAME;     
const mysqlPassword = process.env.MYSQLPASSWORD; 

const bodyParser = require('body-parser');  // importation fonction body parser pour extraction objet json de la demande
const cors = require('cors');               // module CORS
const { Sequelize } = require('sequelize'); // importation application Sequelize pour communiquer avec MySQL
    
const userRoutes = require('./routes/user');   // Importation routeur users
const postRoutes = require('./routes/posts');   // Importation routeur posts


const sequelize = new Sequelize(mysqlTable, mysqlUsername, mysqlPassword, { // Connexion à la base de données mySQL
  host : 'localhost',
  dialect: 'mysql'
  })



const app = express();      // application Express
app.use(bodyParser.json()); // Enregistrement body parser
app.use(cors());            // module CORS

app.use((req, res, next) => {  // Ajout headers pour résoudre les erreurs CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoyer des requêtes avec les méthodes mentionnées 
    next();
  });


app.use('/api/auth', userRoutes)      // Enregistrement routeur users
app.use('/api/posts', postRoutes)      // Enregistrement routeur posts
module.exports = app;