const { Router } = require('express');
const { isNotAuthorized } = require("../utils/Auth")
const router = Router();

const passport = require('passport')

router.get('/', isNotAuthorized, passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord',{
    successRedirect: '/dashboard',
    failureRedirect: '/'
})) 

router.get("/logout", (req, res) => {
    if (req.user) req.logout();
    res.redirect("/");
});

module.exports = router;