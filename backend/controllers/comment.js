const db = require("../config/dataB");
const Comment = require("../models/comment");
//mysql propose une alternative à INSERT INTO...VALUES pourinsérer des données dans une table
//INSERT INTO...SET syntaxe à utiliser pour insérer une ligne sans renseigner les colonnes ordre de la requête 
//SELECT  permet d'afficher des données directement sélectionner toutes les colonnes avec *
//SELECT  permet de sélectionner des données à partir d'une table avec la clause FORM 
//La clause WHERE "où" permet de restreindre les résultats selon des critères de recherche
//trier vos données ajouter ORDER BY tri  à votre requête après les critères de sélection de WHERE  s'il y en a
//utilisez le mot DESC, l'ordre est inversé : plus grand nombre d'abord, date la plus récente d'abord
//DELETE commande pour supprimer des données avec La clause WHERE restreindre les résultats selon des critères de recherche
//UPDATE commande pour modifier avec SET choix des colonnes et WHERE pour le choix précis
//jointure externe permet de sélectionner également les lignes pour lesquelles il n'y a pas de correspondance dans une des tables jointes.
//jointure par la gauche LEFT JOIN ou LEFT OUTER JOIN,on veut toutes les lignes de la table de gauche sauf restrictions WHERE
//Les alias AS sont souvent utilisés avec les jointures. Ils permettent de renommer les tables.
// ORDER BY trier les résultats et DESC pour un tri décroissant

//Créer un commentaire
exports.createComment = (req, res, next) => {
    const content = req.body.content;
    const comment = new Comment({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        content: req.body.content,
    });
    if (!content) {
        return res.status(400).json({ message: "Le titre ne peux pas être vide" });
    } else {
        db.query('INSERT INTO comment SET ?', comment, (error, result) => {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.status(200).json({ result });
            }
        });
    }
};
// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    let comment_id = req.params.id;
    db.query('DELETE FROM comment WHERE id = ?', comment_id, (error, result) => {
        if (error) return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" });
        return res.status(200).json(result);
    });
};
//rechercher les commentaires
exports.getAllComment = (req, res, next) => {  
    db.query('SELECT comment.content, comment.dateCreate, comment.id, comment.post_id, comment.user_id, user.username FROM comment INNER JOIN post ON post.id = comment.post_id LEFT JOIN user ON user.id = comment.user_id WHERE post.id= ? ORDER BY dateCreate DESC', req.params.id, (error, result) => {
        if (error) return res.status(400).json({ error: "Les commentaires n'ont pu être affiché" });
        return res.status(200).json(result);
    });
};
//rechercher un commentaire
exports.getOneComment = (req, res, next) => {
    db.query('SELECT comment.content, comment.id, user_id, isAdmin FROM comment INNER JOIN user ON user.id = comment.user_id WHERE comment.id = ?', req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossibilité d'afficher ce commentaire" });
        }
        return res.status(200).json(result);
    });
};



