const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//vérification compte administrateur
const admcomment = require('../middleware/admcomment');
const userCtrl = require('../controllers/comment');

router.post('/create', auth, userCtrl.createComment);
router.delete('/delete/:id', auth, admcomment, userCtrl.deleteComment);
router.get('/:id', auth, userCtrl.getAllComment);
router.get('/onecomment/:id', auth, userCtrl.getOneComment);

module.exports = router;