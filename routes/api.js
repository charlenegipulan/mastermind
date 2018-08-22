var express = require('express');
var router = express.Router();
var scoresCtrl = require('../controllers/scores');

router.post('/scores', scoresCtrl.create);
router.get('/highscores', scoresCtrl.highScores);

module.exports = router;