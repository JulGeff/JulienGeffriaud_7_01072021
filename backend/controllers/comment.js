'use strict'

const User = require('../models/user');     // importation des modèles sequelize
const Publication = require('../models/publication');

const Comment = require('../models/comment');
const fs = require('fs'); // importation du package file system de node, qui donne notamment accès aux fonctions permettant de supprimer les fichiers.
const jwt = require('jsonwebtoken');  // importation package pour création et vérification des tokens
require('dotenv').config()            // importation dotenv pour sécuriser passwords
const TokenKey = process.env.TOKENKEY;// Récupération de la clé de cryptage des tokens via dotenv

//CREATION D'UN COMMENTAIRE
exports.createComment = (req, res, next) => { 
    if (req.body.comment == null) {
        return res.status(400).json({ 'error': 'Ce champ ne peut être vide' });
      }

    const newComment = 
        Comment.create({
            userId : req.body.id,
            publicationId : req.body.publicationId,
            comment : req.body.comment
                
    })
        .then((newComment) => res.status(201).json({
            message: 'Commentaire enregistré !' // Requête traitée avec succès et création d’un document.

        }))
        .catch(error => res.status(400).json({  //Bad Request
            error
        }));
}


// RECUPERATION DE TOUS LES COMMENTAIRES LIES A UNE PUBLICATION
exports.getAllComments = (req, res, next) => {
    const publicationId = req.query.publicationId
    Comment.findAll({
        attributes: ['comment', 'updatedAt','userId','id'], //on ne remonte que certains attibuts de la table publications
        where: {
            publicationId: publicationId //On filtre sur l'id de la publication
          },
        include: { //on inclue les données firstName et lastName de la table MySQL users associée
            model: User,
            attributes:['firstName', 'lastName']
        },
        order: [['updatedAt', 'DESC']] //Tri des données sur le champ udpatedAt par ordre décroissant
    })

    .then((comments) => {res.status(200).json(comments);})  // renvoie un tableau contenant toutes les publications dans notre base de données
    .catch((error) => {res.status(400).json({error: error });
        }
    );
};

//SUPPRESSION D'UN COMMENTAIRE
  exports.deleteComment = (req, res, next) => { 
     
    Comment.destroy ({ where: { id: req.query.commentId }}) // callback : Suppression de la publication avec l'id correspondant
        
        .then(() => res.status(200).json({ message: 'Publication supprimée !'})) // Requête traitée avec succès
        .catch(error => res.status(500).json({ error })); // Internal Server Error	
  };
