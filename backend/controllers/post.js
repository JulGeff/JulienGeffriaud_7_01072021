
const Post = require('../models/post');        // importation des modèles sequelize
const fs = require('fs'); // importation du package file system de node, qui donne notamment accès aux fonctions permettant de supprimer les fichiers.



//CREATION D'UN POST
exports.createPost = (req, res, next) => { 
    
    const postObject = JSON.parse(req.body.post); // extrait l'objet JSON
    delete postObject._id; // On enlève l'id
        Post.create({
        ...postObject,         // Opérateur Spread pour copie de tous les éléments de req.body.post
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // on récupère l'url de l'image
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
        Post.findOne({ where: { _id: req.params.id } }) //On récupère le post grâce à son id
      .then(post => {
        const filename = post.imageUrl.split('/images/')[1]; //On utilise le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier 
        fs.unlink(`images/${filename}`, () => { // On utilise la fonction unlink du package fs pour supprimer ce fichier
            Post.destroy ({ where: { _id: req.params.id } } // callback : Suppression du post avec l'id correspondant
            .then(() => res.status(200).json({ message: 'Post supprimé !'})) // Requête traitée avec succès
            .catch(error => res.status(400).json({ error }))); // Bad request
        });
      })
      .catch(error => res.status(500).json({ error })); // Internal Server Error	
  };



// RECUPERATION D'UN POST
exports.getOnepost = (req, res, next) => {
    models.Post.findOne ({ where: { _id: req.params.id } }) // Renvoir le post unique ayant le même _id que le paramètre de la requêt
        .then(post => res.status(200).json(post))   // post retourné dans une promise et envoyé au frontend
        .catch(error => res.status(404).json({        // Ressource non trouvée
            error
        }));
}



// RECUPERATION DE TOUS LES POSTS
exports.getAllPosts = (req, res, next) => {
    Post.findAll().then(        // renvoie un tableau contenant tous les posts dans notre base de données
        (posts) => {         
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



/*
//Modification d'une post
exports.modifypost = (req, res, next) => { 
    const postObject = req.file ? // Si req.file existe
      {
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // On traite la nouvelle image
      } : { ...req.body };  // Sinon on traite l'objet entrant (sans image)
    post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id }) // Mise à jour de la post avec l'id passé en premier argument
      .then(() => res.status(200).json({ message: 'post modifiée !'})) // Requête traitée avec succès
      .catch(error => res.status(400).json({ error })); //Bad Request
  };








// Gestion des likes
exports.likepost = (req, res, next) => {

    const like = req.body.like;

    if (like === 1) { // Option like
        post.updateOne(
            { _id: req.params.id },   //On récupère l'id de la post
            { $inc: { likes: + 1 },   //On incrémente les likes
            $push: { usersLiked: req.body.userId }, _id: req.params.id }) //On ajoute le userID du client à la fin du array usersLikes

            .then(() => res.status(200).json({ message: "like post !" })) // Requête traitée avec succès
            .catch(error => res.status(400).json({ error }))    // Bad request
        

    } else if (like === -1) {      // Option dislike
        post.updateOne(
            { _id: req.params.id },      //On récupère l'id de la post
            { $inc: { dislikes: + 1 },   //On incrémente les dislikes
            $push: { usersDisliked: req.body.userId }, _id: req.params.id }) //On ajoute le userID du client à la fin du array usersDislikes

            .then(() => res.status(200).json({ message: "dislike post !" })) // Requête traitée avec succès
            .catch(error => res.status(400).json({ error }))    // Bad request
        

    } else {        // Option ni like ni dislike
            post.findOne({    //On récupère l'id de la post
            _id: req.params.id // On récupère l'id de la post
            })
            .then(post => { 
                if (post.usersLiked.includes(req.body.userId)) { //On vérifie si user ID présent dans array usersLiked
                post.updateOne(           
                    { _id: req.params.id }, //On récupère l'id de la post
                    { $inc: { likes: -1 },  //On décrémente les likes de la post
                    $pull: { usersLiked: req.body.userId }, _id: req.params.id }) //On supprime le userID du client du array usersLikes
                    .then(() => res.status(200).json({ message: "post not liked anymore !" })) // Requête traitée avec succès
                    .catch(error => res.status(400).json({ error })) } // Bad request

                if (post.usersDisliked.includes(req.body.userId)) { //On vérifie si user ID présent dans array usersDisliked
                post.updateOne(           
                    { _id: req.params.id },   //On récupère l'id de la post
                    { $inc: { dislikes: -1 }, //On décrémente les dislikes de la post
                    $pull: { usersDisliked: req.body.userId }, _id: req.params.id }) //On supprime le userID du client du array usersDislikes
                    .then(() => res.status(200).json({ message: "post not unliked anymore !" })) // Requête traitée avec succès
                    .catch(error => res.status(400).json({ error }))  }     // Bad request
            })
            .catch(error => res.status(404).json({
                error
            }));
}};*/