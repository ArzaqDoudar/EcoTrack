import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtPassword, saltRounds } from "../constants/login.constants.js";
import { create, getWhere } from "./general.js";

const generatePasswordHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw error;
  }
};

const checkPasswordWithHash = async (password, hash) => {
  try {
    console.log("password", password);
    console.log("hash", hash);
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw error;
  }
};

const generateToken = async (user) => {
  return jwt.sign(
    { username: user.Username, location: user.location, name: user.Name, iat: Date.now() },
    jwtPassword,
    { algorithm: 'HS256' }
  );
};

//   getAllUsers: async function (req, res, next) { 
//     try {
//       res.send({ data: await getMultiple('users', 'Id', 'username', 'Name', 'location') });
//     } catch (err) {
//       console.error(`Error while getting users `, err.message);
//       next(err);
//     }
//   },
//   getUserById: async function (req, res, next) {
//     try {
//       res.send({
//         data: await getWhere('users', {
//           columns :'*', // 'id , username , location , name',
//           where: 'Id',
//           whereValue : '20',
//         })
//       });
//     } catch (err) {
//       console.error(`Error while getting user by id `, err.message);
//       next(err);
//     }
//     // res.send({ message: "delete user" });
//   },
//   insertUser: async function (req, res, next) {
//     const keys = Object.keys(req.body);
//     const values = Object.values(req.body);

//     var newValues=[];
//     values.forEach(value => {
//       newValues.push( '"' + value +'"');
//     });
//     try {
//       res.send({
//         data: await create('users', {
//           columns:keys,
//           values : newValues,
//         })
//       });
//     } catch (err) {
//       console.error(`Error while insert users `, err.message);
//       next(err);
//     }
//   },

// }
// export const updateUser = async (req, res, next) => {
//   const id = req.query.id;
//   console.log('id = ' , id );
//   const keys = Object.keys(req.body);
//   const values = Object.values(req.body);

//   var setString = ``;
//   for(let i = 0 ; i< keys.length; i++){
//     setString = setString + `${keys[i]} = '${values[i]}'`;
//     if(i != keys.length -1){
//       setString = setString + `,`;
//     }
//   }    
//   try {
//     res.send({
//       data: await update('users', {
//         set:setString,
//         id : id,
//       })
//     });
//   } catch (err) {
//     console.error(`Error while update user with id = ${id} \n`, err.message);
//     next(err);
//   }
// }

// export const getAllUsers = async (req, res, next) => {
//   try {
//     res.send({ data: await getMultiple('users', 'Id', 'username', 'Name', 'location') });
//   } catch (err) {
//     console.error(`Error while getting users `, err.message);
//     next(err);
//   }
// };

export const getAllUsers = async (req, res, next) => {
  try {
    res.send({ data: "HELLO" });
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
};

export const insertUser = async (req, res, next) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  var newValues = [];
  for (let i = 0; i < values.length; i++) {
    if (keys[i] != 'Password') {
      newValues.push('"' + values[i] + '"');
    } else {
      let password = await generatePasswordHash(values[i]);
      console.log(password);
      newValues.push(`"${password}"`);
    }
  }
  // values.forEach(value => {
  //   if()
  //   newValues.push('"' + value + '"');
  // });
  try {
    res.send({
      data: await create('users', {
        columns: keys,
        values: newValues,
      })
    });
  } catch (err) {
    console.error(`Error while insert users `, err.message);
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  res.send({ message: "delete user" });
};

export const loginUser = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let user = (await getWhere('users', {
    columns: '*', // 'id , username , location , name',
    where: 'username',
    whereValue: username,
  }))[0];
  console.log(user)
  if (await checkPasswordWithHash(password, user.Password)) {
    let token = await generateToken(user);
    console.log("token", token);
    res.send({
      token: token
    });
  } else {
    res.send()
  }
};