const express = require('express');
const router = express.Router();

let votes = { A: 0, B: 0, C: 0, D: 0 };

router.get('/', (req, res) => {
    res.render('index', { votes });
});

router.post('/vote', (req, res) => {
    const option = req.body.option;
    if (votes[option] !== undefined) {
        votes[option]++;
    }
    res.redirect('/');
});

module.exports = router;
