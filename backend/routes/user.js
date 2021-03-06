'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // importation middleware d'authentification
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);                    // Création d'un compte user
router.post('/login', userCtrl.login);                      // Connexion à un compte user
router.get('/users', auth, userCtrl.getAllUsers);           // Récupération de tous les users
router.get('/user', auth, userCtrl.getOneUser);             // Récupération d'un user donné
router.delete('/user', auth, userCtrl.deleteUser);          // Suppression d'un user donné
router.put('/user', auth, userCtrl.editUser);               // Modification d'un user

module.exports = router;  // export pour pouvoir utiliser dans app.js