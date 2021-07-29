'use strict'
const User = require('../models/user');     // importation du modèle sequelize User
const Publication = require('../models/publication');// importation du modèles sequelize Publication
const Comment = require('../models/comment');// importation du modèle sequelize Comment
const fs = require('fs'); // importation du package file system de node, qui donne notamment accès aux fonctions permettant de supprimer les fichiers.
const jwt = require('jsonwebtoken');  // importation package pour création et vérification des tokens
require('dotenv').config()            // importation dotenv pour sécuriser passwords
const TokenKey = process.env.TOKENKEY;// Récupération de la clé de cryptage des tokens via dotenv


//CREATION D'UNE PUBLICATION
exports.createPublication = (req, res, next) => { 
    const newPublication = //On crée la publication dans la base de données avec les champs envoyés dans la requête post axios
        Publication.create({
            userId : req.body.id,
            title : req.body.title,
            content : req.body.content
            
    })
        .then((newPublication) => res.status(201).json({
            message: 'Publication enregistrée !' // Requête traitée avec succès et création d’un document.

        }))
        .catch(error => res.status(400).json({error}));
    }


// RECUPERATION DE TOUTES LES PUBLICATIONS
exports.getAllPublications = (req, res, next) => {
    Publication.findAll({
        attributes: ['title', 'content', 'updatedAt','id','userId'],
        include: {                              //on inclue les données firstName et lastName de la table MySQL users associée
            model: User,
            attributes:['firstName', 'lastName']
        },
        order: [['updatedAt', 'DESC']],   //Tri des données sur le champ udpatedAt par ordre décroissant
    })
    .then(       // renvoie un tableau contenant toutes les publications dans notre base de données
        (publications) => {res.status(200).json(publications)}) // publications retournées dans une promise et envoyée au frontend
    .catch(
        (error) => {res.status(400).json({error: error});
        }
    );
};


// RECUPERATION D'UNE PUBLICATION DONNEE
exports.getOnePublication = (req, res, next) => {
    const publicationId = req.query.publicationId;
    Publication.findOne ({    
        where: {  id: publicationId },   
        include: {model: User},
    })
        .then(publication => res.status(200).json(publication))
        .catch(error => res.status(500).json(error))
};


// RECUPERATION DES PUBLICATIONS D'UN USER DONNE
exports.getUserPublications = (req, res, next) => {
    const userId = req.query.userId
    Publication.findAll({
      where: {userId: req.query.id},
      include: {model: User}, //on inclue les données de la table MySQL users associée
      order: [['updatedAt', 'DESC']] //Tri des données sur le champ udpatedAt par ordre décroissant
    })

    .then(publications => {
        res.status(200).json(publications)})
    .catch((error) => {res.status(400).json({error: error});
        }
    );
};


//SUPPRESSION D'UNE PUBLICATION
 exports.deletePublication = (req, res, next) => { 
    Comment.destroy({where: {publicationId: req.query.id}}) //On supprime d'abord tous les commentaires associés à la publication
    .then(() => 
      Publication.destroy({ where: {id: req.query.id} }) // On supprime la publication
    .then(() => res.status(200).json({ message: 'Article supprimé !'})))
    .catch(error => res.status(400).json({ error }));
};


// MODIFICATION D'UNE PUBLICATION
exports.editPublication = (req, res, next) => {
    Publication.update(
        {title : req.body.title,
        content :  req.body.content
         }, { where: {id: req.body.publicationId} })
     .then(() => res.status(200).json({ message: 'Publication modifiée !'}))
     .catch(error => res.status(400).json({ error }));
     }
     


  
  
