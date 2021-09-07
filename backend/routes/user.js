//import
const express = require('express');
const router = express.Router();
// Limitation du nombre de requêtes utilisateurs/temps
const limiter = require('../middleware/limiter');

const auth = require('../middleware/auth');
// Contrôle si le courriel utilisateur est déja enregistrer
const userCtrl = require('../controllers/users');
// Controle si le mot de passe est conforme pour la sécurité
const passwordValide = require('../middleware/password-valide');
// Controle du droit de l'administrateur 
const admuser = require('../middleware/admuser');

router.post('/signup', passwordValide, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.delete('/delete/:id', auth, admuser, userCtrl.deleteUser);
router.get('/users', userCtrl.getAllUser);
router.get('/user/:id', auth,userCtrl.getOneUser);
router.put('/update/:id', auth, admuser, userCtrl.modifyUser);

module.exports = router; 