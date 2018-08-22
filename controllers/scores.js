var Score = require('../models/score');

module.exports = {
  create,
  highScores
};

function create(req, res) {
  Score.create(req.body)
  .then(score => {
    res.json(score);
  })
  .catch(err => {
    res.json({error: err});
  });
}

function highScores(req, res) {
  Score.find({})
  .sort({numGuesses: 1, seconds: 1})
  .limit(req.query.limit || 20)
  .then(scores => {
    res.json(scores);
  });
}