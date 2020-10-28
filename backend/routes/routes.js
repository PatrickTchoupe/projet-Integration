const express = require('express');
const router = express.Router();

const cont = require('../controllers/auth');

const cont2 = require('../controllers/ajoutDem');


router.post('/demande', cont2.registerDem);

router.get("/", (req, res) => {
  let sess = req.session;
    if(sess.email) {
        return res.redirect('/appli');
    }
    res.json({ message: "Welcome to the application." });
  });

//router.post('/auth',cont.register);



module.exports = router;