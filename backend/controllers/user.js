'use strict'

const bcrypt = require('bcrypt');        // importation du package de cryptage de mdp bcrypt
const User = require('../models/user');     // importation des modèles sequelize
const Publication = require('../models/publication');

const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');     // importation package pour création et vérification des tokens
require('dotenv').config()               // importation dotenv pour sécuriser passwords
const TokenKey = process.env.TOKENKEY;   // Récupération de la clé de cryptage des tokens via dotenv


//CREATION D'UN COMPTE UTILISATEUR
exports.signup = (req, res, next) => {
    
  bcrypt.hash(req.body.password, 10)    // On crypte le mot de passe (algorithme exécuté 10 fois) / asynchrone
  
        .then(hash => {   
            const newUser = User.create({           // modèle sequelize
              lastName : req.body.lastName,
              firstName : req.body.firstName,
              email: req.body.email,
              password: hash,                  // On enregistre le mdp crypté plutôt que le mdp simple
             
              })
              

        .then((newUser )=> res.status(201).json({ message: 'created' })) // Requête traitée avec succès et création d’un document
        .catch(error => 
          res.status(400).json({ error })); // Bad Request*/
        
      })
    .catch(error => { 
      console.log("erreur 500")
      res.status(500).json({ error })}); // Erreur interne du serveur
  };


//CONNEXION AU COMPTE UTILISATEUR
exports.login = (req, res, next) => {
 
    User.findOne ({ 
      where: {  email: req.body.email } })   // On utilise le modèle sequelize User pour vérifier que l'email rentré correspond à un email de la bas de données
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // Unauthorized	
        }
        bcrypt.compare(req.body.password, user.password)  // On tuilise la fonction compare de bcrypt pour comparer les passwords
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' }); // Unauthorized
            }
            res.status(200).json({ // Requête traitée avec succès / Renvoie le token au frontend
              token: jwt.sign(
                { 
                    id: user.id, 
                    email: user.email,
                    isAdmin : user.isAdmin
                },
                TokenKey,            // récupère la chaîne secrète d'encodage de notre token via dotenv
                { expiresIn: '24h' }    // A MODIFIER EXPIRATION QUAND LOGOUT ??
              ),
              isAdmin : user.isAdmin,
              loggedIn : true,
              
            });
          })
          .catch(error => res.status(500).json({ error })); 	// Erreur interne du serveur
      })
      .catch(error => res.status(500).json({ error })); // Erreur interne du serveur
  };


// RECUPERATION DE TOUS LES PROFILS UTILSATEURS
exports.getAllUsers = (req, res, next) => {
  User.findAll({
    attributes: ['firstName', 'lastName', 'email', 'updatedAt','id','isAdmin'],
    order: [['lastName', 'ASC']]
})
  .then(users => {
     
      res.status(200).json({data: users});
  })
  .catch(error => res.status(400).json({ error }));
};


// RECUPERATION DU PROFIL D'UN UTILISATEUR
exports.getOneUser = (req, res, next) => {

  const token = req.headers.authorization; // On extrait le token du header Authorization de la requête entrante. 
  const decodedToken = jwt.verify(token, TokenKey); // On utilise la fonction verify de jsonwebtoken pour décoder notre token
  const id = decodedToken.id; // on extrait le user id de notre token
    User.findOne ({ 
        attributes: ['firstName', 'lastName', 'email', 'createdAt', 'id'],
        where: {  id: id }   
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
  };

//SUPPRESSION D'UN PROFIL UTILSATEUR
exports.deleteUser = (req, res, next) => {
   
    const userId = req.query.id; 
          Comment.destroy({where: {userId: userId}})
      .then(() => 
        Publication.destroy({where: {userId: userId}})
            .then(() =>
                User.destroy ({ 
                  where: {  id: userId }   
              })
            .then(user => res.status(200).json(user))
            .catch(error => res.status(500).json(error))
          ))}


//MODIFICATION DU PROFIL UTILISATEUR
exports.editUser = (req, res, next) => {

  const token = req.headers.authorization; // On extrait le token du header Authorization de la requête entrante. 
  console.log(req.headers)
  const decodedToken = jwt.verify(token, TokenKey); // On utilise la fonction verify de jsonwebtoken pour décoder notre token
  const id = decodedToken.id; // on extrait le user id de notre token

  // vérification que tous les champs sont remplis
  //if(firstName === null || firstName === '' || lastName === null ||lastName === '') {
  //    return res.status(400).json({'error': "Les champs 'nom' et 'prénom' doivent être remplis "});
  //} else {

User.update(
   {firstName : req.body.firstName,
    lastName : req.body.lastName
    }, { where: {id: id} })
.then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
.catch(error => res.status(400).json({ error }));
}



