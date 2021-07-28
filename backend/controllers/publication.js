'use strict'
const User = require('../models/user');     // importation des modèles sequelize
const Publication = require('../models/publication');
const Comment = require('../models/comment');
const fs = require('fs'); // importation du package file system de node, qui donne notamment accès aux fonctions permettant de supprimer les fichiers.
const jwt = require('jsonwebtoken');  // importation package pour création et vérification des tokens
require('dotenv').config()            // importation dotenv pour sécuriser passwords
const TokenKey = process.env.TOKENKEY;// Récupération de la clé de cryptage des tokens via dotenv

//CREATION D'UNE PUBLICATION
exports.createPublication = (req, res, next) => { 

    const token = req.headers.authorization; // On extrait le token du header Authorization de la requête entrante. 
    const decodedToken = jwt.verify(token, TokenKey); // On utilise la fonction verify de jsonwebtoken pour décoder notre token
    const id = decodedToken.id; // on extrait le user id de notre token
    console.log(id);
  

    const newPublication = 
        Publication.create({
            userId : id,
            title : req.body.title,
            content : req.body.content
            
    })
        .then((newPublication) => res.status(201).json({
            message: 'Publication enregistrée !' // Requête traitée avec succès et création d’un document.

        }))
        .catch(error => res.status(400).json({  //Bad Request
            error
        }));
}

// RECUPERATION DE TOUTES LES PUBLICATIONS
exports.getAllPublications = (req, res, next) => {
    Publication.findAll({
        attributes: ['title', 'content', 'createdAt','id','userId'],
        include: {
            model: User,
            attributes:['firstName', 'lastName']
        },
        order: [['createdAt', 'DESC']],
        
    })
    .then(       // renvoie un tableau contenant toutes les publications dans notre base de données
        (publications) => {        
            res.status(200).json(publications); // publications retournées dans une promise et envoyée au frontend
        }
    ).catch(
        (error) => {
            res.status(400).json({      // Bad request
                error: error
            });
        }
    );
};


// RECUPERATION D'UNE PUBLICATION DONNEE
exports.getOnePublication = (req, res, next) => {

   const publicationId = req.query.publicationId;
      Publication.findOne ({ 
               
          where: {  id: publicationId },   
          include: {
            model: User,
       
          },
      })
          .then(publication => res.status(200).json(publication))
          .catch(error => res.status(500).json(error))
    };


// RECUPERATION DES PUBLICATIONS D'UN USER DONNE
exports.getUserPublications = (req, res, next) => {
const userId = req.query.userId
    Publication.findAll({
      where: {userId: userId},
      include: {
        model: User,
   
      },
      order: [['createdAt', 'DESC']]
    })

    .then(publications => {
        res.status(200).json(publications);
    })
    
    .catch(
        (error) => {
            res.status(400).json({      // Bad request
                error: error
            });
        }
    );
};


//SUPPRESSION D'UNE PUBLICATION
 exports.deletePublication = (req, res, next) => { 
    Comment.destroy({where: {publicationId: req.query.id}})
    .then(() => 
      Publication.destroy({ where: {id: req.query.id} })
      .then(() => res.status(200).json({ message: 'Article supprimé !'}))
    )
  .catch(error => res.status(400).json({ error }));
};




// MODIFICATION D'UNE PUBLICATION
exports.editPublication = (req, res, next) => {

    Publication.update(
        {title : req.body.title,
        content :  req.body.content
         }, { where: {id: req.body.id} })
     .then(() => res.status(200).json({ message: 'Publication modifiée !'}))
     .catch(error => res.status(400).json({ error }));
     }
     


  
  
