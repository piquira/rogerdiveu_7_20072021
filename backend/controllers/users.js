//________________Logique métier création d'un utilisateur
// imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const db = require("../config/dataB");

/*fonction de hachage de bcrypt dans notre mot de passe et « saler » le mot de passe 10 fois.
fonction asynchrone qui renvoie une Promise qui nous renvoie le hash généré
bloc then créer un utilisateur et enregistrer dans la base de données, renvoie une réponse de réussite en cas de succès */

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

exports.signup = (req, res, next) => {
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(req.body.password, salt)
        .then(hash => {
            const user = new User({
            username: req.body.username, 
            email: req.body.email,
            password: hash,
            isAdmin: 0,
            });    
            db.query('INSERT INTO user SET ?', user, (err, result) => {
                if(err) throw(err);
                res.status(201).json({ message: "Utilisateur créé" });
            })
        })
        .catch(error => res.status(500).json({ error }));
    });
}
/*vérifier si un utilisateur qui tente de se connecter dispose d'identifiants valides
fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base 
fonction sign dejsonwebtoken pour encoder un token contient l'ID de l'utilisateur 
chaîne secrète de développement temporaire ".........." pour encoder notre token (à remplacer en prod.)  
durée de validité du token à 24 heures. nous renvoyons une réponse 200 contenant l'ID utilisateur
valid est sur true si c'est false il y a une erreur */

exports.login = async(req, res, next) => {
    const email = req.body.email;
	const password = req.body.password;
    if (!email || !password) { 
        res.sendStatus(400);
        return;
    }
    let sql = 'SELECT * FROM user WHERE email = ?'
    db.query(sql, email, (err, result) => {
        if (result[0]) {
            bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json ({ error: 'mot de passe incorrect.'});
                }else {
                    res.status(200).json({
                        user: {
                                userId: result[0].id,
                                username: result[0].username,
                                isAdmin: result[0].isAdmin
                        },
                        token: jwt.sign(
                            { userId: result[0].id, isAdmin: result[0].isAdmin },
                            process.env.TOKEN,
                            {expiresIn: '24h'}
                        ) 
                    });     
                }
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
}

//fonction pour afficher tous les membres
exports.getAllUser = (req, res, next) => {
    db.query('SELECT id, username, email FROM user', (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "impossibilité d'afficher les membres" });
        }
        return res.status(200).json(result);
    });
};;

// fonction pour d'afficher un membre
exports.getOneUser = (req, res, next) => {
    db.query('SELECT * FROM user WHERE id = ?', req.params.id, (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "Impossibilité d'afficher ce membre" });
        }
        return res.status(200).json(result);
    });
};

// fonction pour modifier le compte spécifié
exports.modifyUser = (req, res, next) => {
    const email = req.body.email;
    const id = req.params.id;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ message: "les champs du formulaire doivent être complétés" });
    } else {
        bcrypt.genSalt(10).then((salt) => {
            bcrypt.hash(req.body.password, salt)
            .then((hash) => {
                password = hash;
                db.query('UPDATE user SET email=`${email}`, password=`${password}`, isAdmin=`${0}`  WHERE id = ?', id, (error, results, fields) => {
                        if (error) {
                            return res.status(400).json(error);
                        }
                        return res.status(200).json({ message: 'Le compte a bien été modifié' });
                    }
                );
            })
         .catch(error => res.status(500).json({ error }));
        })
    }
};

// fonction pour supprimer son compte
exports.deleteUser = (req, res, next) => {
    let user_id = req.params.id;
    db.query('DELETE FROM user WHERE id = ?', user_id, (error, result) => {
        if (error) return res.status(400).json({ error: "Le membre n'a pu être supprimé" });
        return res.status(200).json(result);
    });
};
