const express = require('express')
const router = express.Router();

const {getAllUsers , insertUser ,updateUser ,deleteUser} = require('../controllers/UserController');


router.get('/' , getAllUsers);
router.get('/insertUser' , insertUser);
router.post('/updateUser' , updateUser);
router.post('/deleteUser' , deleteUser);

module.exports = router;


// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', async function(req, res, next) {
//   // res.send({message: 'ok'});
//   try {
//     res.json(await ecotrack.getMultiple(req.query.page));
//   } catch (err) {
//     console.error(`Error while getting users `, err.message);
//     next(err);
//   }
// });
// router.post('/', async function(req, res, next) {
//   try {
//     res.json(await ecotrack.create(req.body));
//   } catch (err) {
//     console.error(`Error while creating programming language`, err.message);
//     next(err);
//   }
// });

// module.exports = router;
