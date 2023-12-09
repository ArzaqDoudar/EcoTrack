// const {query} = require('./db.js');
const {getOffset, emptyOrRows} = require('../EcoTrack/helper.js');
const {listPerPage} = require('../config.js');
const {getMultiple} = require('./general.js')

module.exports = {
   
  getAllUsers :async function(req, res, next) {
      res.send({message: 'ok'});
      // try {
      //   res.json(await ecotrack.getMultiple(req.query.page));
      // } catch (err) {
      //   console.error(`Error while getting users `, err.message);
      //   next(err);
      // }
    },
    insertUser: async function (req, res, next) {
      res.send({message :"insertUser"});
    },
    updateUser: async function (req, res, next) {
      res.send({message :"insertUser"});
    },
    deleteUser: async function (req, res, next) {
      res.send({message :"insertUser"});
    },
    // create :async function (User){
    //   const result = await query(
    //     `INSERT INTO users 
    //     (Id,Username,Password,location,Name) 
    //     VALUES 
    //     ('${User.username}', ${User.password}, ${User.location}, ${User.name})`
    //   );
    
    //   let message = 'Error in creating new user';
    
    //   if (result.affectedRows) {
    //     message = 'User created successfully';
    //   }
    
    //   return {message};
    // } ,
  }