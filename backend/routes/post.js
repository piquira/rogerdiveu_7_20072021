/*logique de nos routes sauces - routeur Express enregistrer les routes à l'intérieur
remplacer la route de base d'enregistrement du routeur '/api/sauces' par '/'______________*/
//import
const express = require ('express');
const router = express.Router();

//réimplémenter cela dans notre route, nous devons importer notre contrôleur
// importer le middleware d'authentification et le passer comme argument aux routes à protéger
const auth = require('../middleware/auth');
const postCtrl = require("../controllers/post");
//importer des images du frontend
const multer = require('../middleware/multer-config');

// placer multer après auth, authentification avant import de l'image
//Requête POST pour poster une sauce
router.post('/create', auth, multer, postCtrl.createPost);
//Requête PUT pour modifier une sauce
router.put ('/update/:id', auth, multer, postCtrl.modifyPost);
//Requête DELETE pour effacer une sauce
router.delete('/delete/:id', auth, postCtrl.deletePost);
//Requête GET pour chercher une sauce
router.get ('/:id', auth, postCtrl.getOnePost);
//Requête GET pour chercher toutes les sauces
router.get ('/', auth, postCtrl.getAllPost);

module.exports = router;

