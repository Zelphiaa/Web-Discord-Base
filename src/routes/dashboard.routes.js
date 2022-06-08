const { Router } = require('express');
const { isAuthorized, isNotAuthorized } = require("../utils/Auth")

const router = Router();

router.get('/', isAuthorized, (req, res) => {
    res.render('dashboard/main')

})
router.get('/settings', isAuthorized, (req, res) => {
    res.render('dashboard/settings')

})
module.exports = router;