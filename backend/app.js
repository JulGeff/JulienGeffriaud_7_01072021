'use strict'

const express = require('express');         // importation application Express

const bodyParser = require('body-parser');  // importation fonction body parser pour extraction objet json de la demande
const cors = require('cors');               // module CORS
const { Sequelize } = require('sequelize'); // importation application Sequelize pour communiquer avec MySQL
    
const userRoutes = require('./routes/user');   // Importation routeur users
const publicationRoutes = require('./routes/publication');   // Importation routeur posts
const commentRoutes = require('./routes/comment');   // Importation routeur posts

// Associations des tables de la base de données
const User = require('./models/user');
const Publication = require('./models/publication');
const Comment = require('./models/comment');
const { options } = require('./routes/user');
Publication.belongsTo(User, { Constraints: true, onDelete: 'CASCADE'}); // Si on supprime un user, on supprime ses message //
User.hasMany(Publication);
Comment.belongsTo(User, { Constraints: true, onDelete: 'CASCADE'});
Comment.belongsTo(Publication, { Constraints: true, onDelete: 'CASCADE'}); // Si on supprime un message, on supprime ses réponses //

const app = express();      // application Express
app.use(bodyParser.json()); // Enregistrement body parser
app.use(cors());            // module CORS

app.use((req, res, next) => {  // Ajout headers pour résoudre les erreurs CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoyer des requêtes avec les méthodes mentionnées 
    next();
  });

sequelize //On synchronise l'API avec la base de données
.sync()  
// .sync (false)run it just in the first time after changing the database, this command will re-draw the database
.then(() => app.listen(8080))
.catch(err => console.log(err));

app.use('/api/auth', userRoutes)      // Enregistrement routeur users
app.use('/api/publication', publicationRoutes)    // Enregistrement routeur publications
app.use('/api/comment', commentRoutes)    // Enregistrement routeur publications
module.exports = app;