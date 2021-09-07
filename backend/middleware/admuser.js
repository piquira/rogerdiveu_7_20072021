const jwt = require('jsonwebtoken');
const db = require("../config/dataB");

// syntaxe à utiliser pour insérer une ligne sans renseigner les colonnes ordre de la requête 
//SELECT  permet d'afficher des données directement sélectionner toutes les colonnes avec *
//SELECT  permet de sélectionner des données à partir d'une table avec la clause FORM 
//La clause WHERE "où" permet de restreindre les résultats selon des critères de recherche
//trier vos données ajouter ORDER BY tri  à votre requête après les critères de sélection de WHERE  s'il y en a
//utilisez le mot DESC, l'ordre est inversé : plus grand nombre d'abord, date la plus récente d'abord
//DELETE commande pour supprimer des données avec La clause WHERE restreindre les résultats selon des critères de recherche
//UPDATE commande pour modifier avec SET choix des colonnes et WHERE pour le choix précis

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    db.query('SELECT * FROM user WHERE id = ?', req.params.id, (error, result) => {
        if ((result[0].id === userId) || result.isAdmin === 1) {
            next();
        } else {
            res.status(403).json({ message: "Non autorisé" });
        }
    });

};