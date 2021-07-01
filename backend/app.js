const express = require('express');         // importation application Express
require('dotenv').config()                  // importation dotenv pour sécuriser passwords
const mysql = process.env.MYSQL;            // Sécurisation infos MySQL via dotenv
const bodyParser = require('body-parser');  // importation fonction body parser pour extraction objet json de la demande
const cors = require('cors');               // module CORS
const { Sequelize } = require('sequelize'); // importation application Sequelize pour communiquer avec MySQL




const sequelize = new Sequelize(mysql, { // Connexion à la base de données mySQL
    dialect: 'mysql',
    dialectOptions: {
      // Your mysql2 options here
    }
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

module.exports = app;