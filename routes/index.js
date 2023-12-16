import express from "express";

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  /* #swagger.security = [{
              "bearerAuth": []
      }] */
  res.render('index', { title: 'Express' });
});

export default router;

