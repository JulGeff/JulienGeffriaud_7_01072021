const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // importation middleware d'authentification
const postCtrl = require('../controllers/post')           // Appel des controllers


router.post('/:id', auth, postCtrl.createPost);               // Création d'un post 
router.delete('/:id', auth, postCtrl.deletePost);         // Suppression d'un post
router.get('/', auth, postCtrl.getAllPosts);               // Récupèration tous les posts
router.get('/:id', auth, postCtrl.getUserPosts);             // Récupération d'un post
router.put('/:id', auth, postCtrl.modifyPost);            // Modification d'un post



module.exports = router; // export pour pouvoir utiliser dans app.js






