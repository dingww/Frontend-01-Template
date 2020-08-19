var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log(req)
    fs.writeFileSync("../server/public/1.html", "Hello world!")
});

module.exports = router;
