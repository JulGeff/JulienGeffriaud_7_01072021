'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // importation middleware d'authentification
const publicationCtrl = require('../controllers/publication')           // Appel des controllers


router.post('/', publicationCtrl.createPublication);               // Création d'une publication 
//router.delete('/publication', publicationCtrl.deletePublication);         // Suppression d'une publication
router.get('/', publicationCtrl.getAllPublications);               // Récupèration toutes les publications
//router.get('/', publicationCtrl.getUserPublications);             // Récupération d'une publication
//router.put('/publication', publicationCtrl.modifyPublication);            // Modification d'une publication

//AJOUTER module AUTH


module.exports = router; // export pour pouvoir utiliser dans app.js






