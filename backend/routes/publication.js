'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // importation middleware d'authentification
const publicationCtrl = require('../controllers/publication')           // Appel des controllers


router.post('/', auth, publicationCtrl.createPublication);               // Création d'une publication 
router.delete('/', auth, publicationCtrl.deletePublication);                  // Suppression d'une publication
router.get('/', auth, publicationCtrl.getAllPublications);               // Récupèration toutes les publications
router.get('/selected', auth, publicationCtrl.getOnePublication);             // Récupération d'une publication
router.get('/user', auth, publicationCtrl.getUserPublications);             // Récupération de toutes le spublications d'un user donné
//router.put('/publication', publicationCtrl.modifyPublication);            // Modification d'une publication


module.exports = router; // export pour pouvoir utiliser dans app.js






