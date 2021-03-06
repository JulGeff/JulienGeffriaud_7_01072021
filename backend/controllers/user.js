'use strict'

const bcrypt = require('bcrypt');        // importation du package de cryptage de mdp bcrypt
const User = require('../models/user');     // importation des modèles sequelize
const Publication = require('../models/publication');

const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');     // importation package pour création et vérification des tokens
require('dotenv').config()               // importation dotenv pour sécuriser passwords
const TokenKey = process.env.TOKENKEY;   // Récupération de la clé de cryptage des tokens via dotenv

//REGEX
const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ ///regex : le mot de passe doit contenir au moins 8 caractères, 1 lettre, 1 chiffre et 1 caractère spécial


//CREATION D'UN COMPTE UTILISATEUR
exports.signup = (req, res, next) => {
    
  if (req.body.email == null || req.body.password == null || req.body.lastName == null || req.body.firstName == null) {
    return res.status(400).json({ 'error': 'Ces champs ne peuvent être vides' });
  } 
  if (!regexEmail.test(req.body.email)) {
      return res.status(400).json({ 'error': 'Email au mauvais format' });
  }
  if (!regexPassword.test(req.body.password)) {
      return res.status(400).json({ 'error': 'Le mot de passe doit contenir au moins 8 caractères, 1 lettre, 1 chiffre et 1 caractère spécial' });
  }   

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
                { expiresIn: '24h' }    
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

    User.findOne ({ 
        attributes: ['firstName', 'lastName', 'email', 'createdAt', 'id'],
        where: {  id: req.query.id }   
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
  };

//SUPPRESSION D'UN PROFIL UTILSATEUR
exports.deleteUser = (req, res, next) => {
   
      Comment.destroy({where: {userId: req.query.id}}) //On supprime d'abord tous les commentaires associés aux publications du user
      .then(() => 
        Publication.destroy({where: {userId: req.query.id}}) //On supprime les publications du user
            .then(() =>
                User.destroy ({     //On supprime le user
                  where: {  id: req.query.id }   
              })
            .then(user => res.status(200).json(user))
            .catch(error => res.status(500).json(error))
          ))}


//MODIFICATION DU PROFIL UTILISATEUR
exports.editUser = (req, res, next) => {
  if (req.body.lastName == null || req.body.firstName == null) {
    return res.status(400).json({ 'error': 'Ces champs ne peuvent être vides' });
  }

    User.update(
    {firstName : req.body.firstName,
      lastName : req.body.lastName
      }, { where: {id: req.query.id} })
  .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
  .catch(error => res.status(400).json({ error }));
  }



