'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // importation middleware d'authentification
const commentCtrl = require('../controllers/comment')// Appel des controllers


router.post('/', auth, commentCtrl.createComment);               // Création d'un commentaire
router.get('/', auth, commentCtrl.getAllComments);               // Récupèration des commentaires associés à une publication
router.delete('/', auth, commentCtrl.deleteComment);             // Suppression d'un commentaire
//router.put('/publication', publicationCtrl.modifyPublication); // Modification d'un commentaire

module.exports = router; // export pour pouvoir utiliser dans app.js






