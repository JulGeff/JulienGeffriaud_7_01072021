'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // importation middleware d'authentification
const publicationCtrl = require('../controllers/publication')           // Appel des controllers

router.post('/', publicationCtrl.createPublication);               // Création d'une publication 
router.delete('/', publicationCtrl.deletePublication);                  // Suppression d'une publication
router.get('/', publicationCtrl.getAllPublications);               // Récupèration toutes les publications
router.get('/selected', publicationCtrl.getOnePublication);             // Récupération d'une publication
router.get('/user', publicationCtrl.getUserPublications);             // Récupération de toutes le spublications d'un user donné
router.put('/', publicationCtrl.editPublication);            // Modification d'une publication


module.exports = router; // export pour pouvoir utiliser dans app.js






