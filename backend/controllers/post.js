
const models = require('../models');        // importation des modèles sequelize
const Post = models.post;
const fs = require('fs'); // importation du package file system de node, qui donne notamment accès aux fonctions permettant de supprimer les fichiers.


//CREATION D'UN POST
exports.createPost = (req, res, next) => { 
    
    const postObject = JSON.parse(req.body.post); // extrait l'objet JSON
    delete postObject._id; // On enlève l'id
        Post.create({
        ...postObject,         // Opérateur Spread pour copie de tous les éléments de req.body.post
    })
        .then(() => res.status(201).json({
            message: 'Post enregistré !' // Requête traitée avec succès et création d’un document.

        }))
        .catch(error => res.status(400).json({  //Bad Request
            error
        }));
}



//SUPPRESSION D'UN POST
  exports.deletePost = (req, res, next) => { 
     
    Post.destroy ({ where: { _id: req.params.id }}) // callback : Suppression du post avec l'id correspondant
        
        .then(() => res.status(200).json({ message: 'Post supprimé !'})) // Requête traitée avec succès
        .catch(error => res.status(500).json({ error })); // Internal Server Error	
  };



// RECUPERATION DE TOUS LES POSTS
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', 'DESC']]
    })

    .then(        // renvoie un tableau contenant tous les posts dans notre base de données
        (posts) => {        
            console.log(posts) 
            res.status(200).json(posts); // posts retournées dans une promise et envoyée au frontend
        }
    ).catch(
        (error) => {
            res.status(400).json({      // Bad request
                error: error
            });
        }
    );
};


// RECUPERATION DES POSTS D'UN UTILISATEUR DONNE

exports.getUserPosts = (req, res, next) => {
    Post.findAll({
      where: {userId: req.params.id},
      order: [['createdAt', 'DESC']]
    })

    .then(posts => {
        console.log(posts);
        res.status(200).json(posts);
    })
    
    .catch(
        (error) => {
            res.status(400).json({      // Bad request
                error: error
            });
        }
    );
};


// MODIFICATION D'UN POST
exports.modifyPost = (req, res, next) => {
    // éléments de la requète
    const title = req.body.title;
    const text =  req.body.text;
  
    // vérification que tous les champs sont remplis
    if(title === null || title === '' || text === null || text === '') {
        return res.status(400).json({'error': "Les champs 'Titre' et 'texte' sont obligatoires"});
    }
    
  const postObject = req.body;
    
  Post.update({ ...postObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Post modifié !'}))
  .catch(error => res.status(400).json({ error }));
};


