# Bienvenue sur le réseau social interne Groupomania  !

Pour utiliser correctement l'API, veuillez suivre ces instructions :  

Clonez ce repository.

## Configuration backend
Dans MySQL créez une base de données du nom de votre choix.

**Fichier dotenv**  
A la racine du dossier backend créez un fichier nommé '.env' et copiez-y le contenu ci-dessous :

>DB_NAME='nom de la base de données'  
>DB_USER='user mysql'  
>DB_PASSWORD='mot de passe mysql'  
>DB_HOST= 'localhost' -> laisser tel quel  
>DB_DIALECT='mysql' -> laisser tel quel  
>TOKENKEY='clé de codage pour les tokens'  

## Démarrage backend

**Démarrage du serveur**  
Dans le terminal, installez nodemons erver en tapant les commandes suivantes :   
>cd backend  
>npm install nodemon server  

Puis lancez le serveur en tapant la commande :  
>nodemon server  

## Démarrage frontend

**Lancement de sass**  
Dans le terminal, démarrez sass avec la commande 'npm run sass'

**Démarrage du serveur**  
Dans le terminal, rendez-vous sur le backend avec la commande :  'cd frontend'  
Puis 'npm start' pour avoir accès au serveur de développement.  
L'application s'ouvira automatiquement, sinon rendez-vous sur http://localhost:3000/  

**Droits administrateur**  
 Dans mySQL, taper la commande suivante pour donners les droits admin à un user :  
 >UPDATE user SET isAdmin = 1 WHERE id = "id du user concerné"