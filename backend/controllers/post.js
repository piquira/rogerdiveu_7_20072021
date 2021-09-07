//______________________Logique métier de nos routes des sauces pour chaque crud
//Import modèle
const db = require("../config/dataB");
const Post = require("../models/post");
//fs « système de fichiers » donne accès aux fonctions pour modifier le système de fichiers, y compris pour supprimer les fichiers.
const fs = require('fs');

/*___________POST le frontend envoie les données vers le backend création de l'objet
résoudre l'URL complète de notre image. utilisons req.protocol
le premier segment (dans notre cas 'http' ). ajouter '://' , puis utiliser req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ).
ajouter '/images/' et le nom de fichier  */

/*fonction QUERY « requête ». Une requête, c’est un ordre pour rechercher, calculer et afficher des informations présentes dans une table de données
répondant à un ou plusieurs critères précis.
mysql propose une alternative à INSERT INTO...VALUES pourinsérer des données dans une table
INSERT INTO...SET syntaxe à utiliser pour insérer une ligne sans renseigner les colonnes ordre de la requête 
SELECT  permet d'afficher des données directement sélectionner toutes les colonnes avec *
SELECT  permet de sélectionner des données à partir d'une table avec la clause FORM 
La clause WHERE "où" permet de restreindre les résultats selon des critères de recherche
trier vos données ajouter ORDER BY tri  à votre requête après les critères de sélection de WHERE  s'il y en a
utilisez le mot DESC, l'ordre est inversé : plus grand nombre d'abord, date la plus récente d'abord
DELETE commande pour supprimer des données avec La clause WHERE restreindre les résultats selon des critères de recherche
UPDATE commande pour modifier avec SET choix des colonnes et WHERE pour le choix précis
jointure externe permet de sélectionner également les lignes pour lesquelles il n'y a pas de correspondance dans une des tables jointes.
jointure par la gauche LEFT JOIN ou LEFT OUTER JOIN,on veut toutes les lignes de la table de gauche sauf restrictions WHERE
Les alias AS sont souvent utilisés avec les jointures. Ils permettent de renommer les tables.
ORDER BY trier les résultats et DESC pour un tri décroissant
INNER JOIN jointure pour associer 2 tables et avec ON jointure des deux colonnes des deux tables
sous requêtes comme avec getonepost   */

// Création d'un nouveau post
exports.createPost = (req, res, next) => {
  let image = "";
  if (req.file) {
      image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
      user_id: req.body.user_id,
      title: title,
      content: content,
      image: image
  });
  if (!title && !content && !image) {
      return res.status(400).json({ message: "Le titre doit être renseigné" });
  } else {
    db.query('INSERT INTO post SET ?', post, (error, result) => {
          if (error) {
              return res.status(400).json({ error: error });
          }
          return res.status(201).json({ message: "Article créé" });
      });
  }
};

//Route pour modifier l'article
exports.modifyPost = (req, res, next) => {
  let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  if (req.file) {
      image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  db.query('SELECT * FROM post WHERE id = ?', req.params.id,  (error, rows, fields) => {
      if (error) {
          return res.status(500).json({ error: "base de donnée" });
      } else {
          if (rows[0].image) {
              const filename = rows[0].image.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                db.query('UPDATE post SET content = ? , image= ? , title = ?  WHERE id = ?' [req.body.content, req.body.title, image, req.params.id], (error, result) => {
                      if (error) {
                          return res.status(400).json({ error: "L'article n'a pas été modifié" });
                      }
                      return res.status(200).json(result);
                  });
              });
          } else {
            db.query('UPDATE post SET content = ? , image= ? , title = ?  WHERE id = ?', [req.body.content, req.body.title, image, req.params.id], (error, result) => {
                  if (error) {
                      return res.status(400).json({ error: "L'article n'a pas été modifié" });
                  }
                  return res.status(200).json(result);
              });
          }
      }
  });
};

/* Partie métier servant à supprimer un article On recherche l'article par rapport a son Id
récupèrer également son image et à l'aide de fs.unlink() on supprime l'image puis le post
à l'aide de (deletePost) */
exports.deletePost = (req, res, next) => {
    db.query('SELECT * FROM post WHERE id = ?', req.params.id, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "base de donnée" });
        } else {
            if (rows[0].image) {
                const filename = rows[0].image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    db.query('DELETE FROM post WHERE id = ?', req.params.id, (error, rows, fields) => {
                        if (error) {
                            return res.status(500).json({ error: "Suppression impossible" });
                        } else {

                            return res.status(200).json({ message: "Article supprimé" });
                        };
                    });
                });
            } else {
                db.query('DELETE FROM post WHERE id = ?', req.params.id, (error, rows, fields) => {
                    if (error) {
                        return res.status(500).json({ error: "Suppression impossible" });
                    } else {
                        return res.status(200).json({ message: "Article supprimé" });
                    };
                });
            }
        }
    });
};

/*Route méthode get trouver le Post unique ayant le même _id */
exports.getOnePost = (req, res, next) => {
    db.query('SELECT post.content, post.dateCreate, post.id, post.image, post.title, post.user_id, isAdmin, username FROM post INNER JOIN user ON user.id = post.user_id WHERE post.id = ? ', req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Affichage impossible" });
        }
        return res.status(200).json(result);
    });
};

//route GET pour trouver tous les post
exports.getAllPost = (req, res, next) => {
    db.query('SELECT post.id, content, image, title, user_id, dateCreate, isAdmin, username FROM post INNER JOIN user ON user.id = post.user_id ORDER BY dateCreate DESC', (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Affichage impossible" });
        }
        return res.status(200).json(result);
    });
};
