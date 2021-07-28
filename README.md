# Bienvenue sur le réseau social interne Groupomania  !

Pour utiliser correctement l'API, veuillez suivre ces instructions :  

Clonez ce repository.

## Configuration
Création de la base de données groupomania  
A la racine du dossier backend créez un fichier .env et copiez-y le contenu ci-dessous

DB_NAME='nom de la base de donnée'  
DB_USER='user mysql'  
DB_PASSWORD='mot de passe mysql'  
DB_HOST= 'localhost' -> laisser tel quel  
DB_DIALECT='mysql' -> laisser tel quel  

TOKENKEY='clé de codage pour les tokens'  

## Backend

**Démarrage du serveur**
Dans le terminal, rendez-vous sur le backend avec la commande :  cd backend  
Depuis le dossier backend : Telechargez et ouvrez Node.js.  
Tapez la commande suivante : "npm start".  
Puis lancez le serveur en tapant la commande : "nodemon server".

## Frontend

**Lancement de sass**
Dans le terminal, démarrez sass avec la commande 'npm run sass'

**Démarrage du serveur**
Dans le terminal, rendez-vous sur le backend avec la commande :  'cd frontend'  
Puis 'npm start' pour avoir accès au serveur de développement.  
L'application s'ouvira automatiquement, sinon rendez-vous sur http://localhost:3000/  
