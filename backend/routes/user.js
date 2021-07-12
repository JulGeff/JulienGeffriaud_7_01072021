const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/auth/signup', userCtrl.signup);        // Création d'un compte user
router.post('/auth/login', userCtrl.login);          // Connexion à un compte user
//router.delete('/delete', userCtrl.deleteUser);  // Suppression d'un user

module.exports = router;  // export pour pouvoir utiliser dans app.js