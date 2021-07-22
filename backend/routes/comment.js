'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // importation middleware d'authentification
const publicationCtrl = require('../controllers/comment')           // Appel des controllers


router.post('/', auth, publicationCtrl.createComment);               // Création d'un commentaire
router.get('/', auth, publicationCtrl.getAllComments);               // Récupèration toutes les publications
//router.delete('/publication', publicationCtrl.deletePublication);         // Suppression d'une publication

//router.get('/', publicationCtrl.getUserPublications);             // Récupération d'une publication
//router.put('/publication', publicationCtrl.modifyPublication);            // Modification d'une publication




module.exports = router; // export pour pouvoir utiliser dans app.js






