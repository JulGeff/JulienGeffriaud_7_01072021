# Bienvenue sur le réseau social interne Groupomania  !

Pour utiliser correctement l'API, veuillez suivre ces instructions :  

Clonez ce repository.

## Configuration backend
Dans MySQL créez une base de données du nom de votre choix.  
Les tables seront créées automatiquement au démarrage du serveur backend.

- **Fichier dotenv**  
A la racine du dossier backend créez un fichier nommé '.env', copiez-y le contenu ci-dessous,   
et renseignez les champs comme indiqué, en laissant bien les apostrophes :  

>DB_NAME='nom de la base de données'  
>DB_USER='user MySQL'  
>DB_PASSWORD='mot de passe MySQL'  
>DB_HOST= 'localhost' -> laisser tel quel  
>DB_DIALECT='mysql' -> laisser tel quel  
>TOKENKEY='clé de codage pour les tokens'  

- **Fichier config.json**  
Dans le fichier config/config.json, renseignez les champs suivants :  
>"username": "user MySQL",  
>"password": "mot de passe MySQL",  
>"database": "nom de la base de données",  

## Démarrage backend  

**Démarrage du serveur**  
Dans le terminal, installez nodemon server en tapant les commandes suivantes :   
>cd backend  
>npm install nodemon server  

Puis lancez le serveur en tapant la commande :  
>nodemon server  

## Démarrage frontend

- **Lancement de sass**  
Dans le terminal, démarrez sass avec la commande  
>npm run sass  

- **Démarrage du serveur**  
Dans le terminal, lancez le serveur en tapant les commandes :  
>cd frontend  
>npm start  

L'application s'ouvira automatiquement, sinon rendez-vous sur http://localhost:3000/  

- **Droits administrateur**  
 Dans MySQL, taper la commande suivante pour donners les droits admin à un user :  
 >UPDATE users SET isAdmin = 1 WHERE id = "id du user concerné"
