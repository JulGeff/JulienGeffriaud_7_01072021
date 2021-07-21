'use strict'

const models = require('../models');        // importation des modèles sequelize
const Publication = models.publication;
const fs = require('fs'); // importation du package file system de node, qui donne notamment accès aux fonctions permettant de supprimer les fichiers.
const jwt = require('jsonwebtoken');  // importation package pour création et vérification des tokens
require('dotenv').config()            // importation dotenv pour sécuriser passwords
const TokenKey = process.env.TOKENKEY;// Récupération de la clé de cryptage des tokens via dotenv

//CREATION D'UN COMMENTAIRE
exports.createComment = (req, res, next) => { 

    const token = req.headers.authorization; // On extrait le token du header Authorization de la requête entrante. 
    const decodedToken = jwt.verify(token, TokenKey); // On utilise la fonction verify de jsonwebtoken pour décoder notre token
    const id = decodedToken.id; // on extrait le user id de notre token
    const newComment = 
        Comment.create({
            userId : id,
            PublicationId : req.body.publicationId,
            comment : req.body.comment
                
    })
        .then((newComment) => res.status(201).json({
            message: 'Commentaire enregistré !' // Requête traitée avec succès et création d’un document.

        }))
        .catch(error => res.status(400).json({  //Bad Request
            error
        }));
}

/*
// RECUPERATION DE TOUTES LES PUBLICATIONS
exports.getAllPublications = (req, res, next) => {
    Publication.findAll({
        order: [['createdAt', 'DESC']]
    })

    .then(        // renvoie un tableau contenant toutes les publications dans notre base de données
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


/*

//SUPPRESSION D'UNE PUBLICATION
  exports.deletePublication = (req, res, next) => { 
     
    Publication.destroy ({ where: { _id: req.params.id }}) // callback : Suppression de la publication avec l'id correspondant
        
        .then(() => res.status(200).json({ message: 'Publication supprimée !'})) // Requête traitée avec succès
        .catch(error => res.status(500).json({ error })); // Internal Server Error	
  };





// RECUPERATION DES PUBLICATIONS D'UN UTILISATEUR DONNE

exports.getUserPublications = (req, res, next) => {
    Publication.findAll({
      where: {id: req.params.id},
      order: [['createdAt', 'DESC']]
    })

    .then(publications => {
        console.log(publications);
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


// MODIFICATION D'UNE PUBLICATION
exports.modifyPublication = (req, res, next) => {
    // éléments de la requète
    const title = req.body.title;
    const content =  req.body.content;
  
    // vérification que tous les champs sont remplis
    if(title === null || title === '' || content === null || content === '') {
        return res.status(400).json({'error': "Les champs 'Titre' et 'texte' sont obligatoires"});
    }
    
  const publicationObject = req.body;
    
  Publication.update({ ...publicationObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Publication modifiée !'}))
  .catch(error => res.status(400).json({ error }));
};


*/