// const {query} = require('./db.js');
const { listPerPage } = require('../config.js');
const { getMultiple, create } = require('./general')

module.exports = {

  getAllUsers: async function (req, res, next) {
    // res.send({message: 'ok'});
    try {
      console.log('inside get all users');
      res.send({ data: await getMultiple('users', 'Id', 'Name', 'location') });
    } catch (err) {
      console.error(`Error while getting users `, err.message);
      next(err);
    }
  },
  insertUser: async function (req, res, next) {
    // res.send({message :"insertUser"});
    try {
      console.log('inside insert user');
      res.send({
        data: await create('users', {
          columns: [
            'Username', 'Password', 'location', 'Name'
          ],
          values: [
            `'arzaqziad4'`, `'12345'`, `'Nablus'`, `'Arzaq Doudar'`],
        })
      });
    } catch (err) {
      console.error(`Error while insert users `, err.message);
      next(err);
    }
  },
  updateUser: async function (req, res, next) {
    res.send({ message: "insertUser" });
  },
  deleteUser: async function (req, res, next) {
    res.send({ message: "insertUser" });
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