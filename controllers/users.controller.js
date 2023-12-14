import {create, getWhere} from "./general.js";
import {checkPasswordWithHash, generatePasswordHash} from "../utils/password.utils.js";
import {generateToken} from "../utils/token.utils.js";
import {createUser, USER_CODES} from "../models/users.model.js";

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
        res.send({data: "HELLO"});
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
};

export const insertUser = async (req, res, next) => {
    /*
        #swagger.security = []
     */
    const payload = {
        name: req.body.name,
        username: req.body.username,
        password: await generatePasswordHash(req.body.password),
        location: req.body.location,
    };
    try {
        const user = await createUser(payload);
        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        switch(err) {
            case USER_CODES.USER_INSERT_FAILED:
                res.status(400).send({
                    message: 'insert failed',
                    status: 400,
                });
                break;
            default:
                res.status(500).send({
                    message: 'internal server error',
                    status: 500
                });
        }
    }
};

export const deleteUser = async (req, res, next) => {
    res.send({message: "delete user"});
};

export const loginUser = async (req, res, next) => {
    /*
     #swagger.security = []
     */
    const username = req.body.username;
    const password = req.body.password;
    let user = (await getWhere('users', {
        columns: '*', // 'id , username , location , name',
        where: 'username',
        whereValue: username,
    }))[0];
    if (user && await checkPasswordWithHash(password, user.password)) {
        let token = await generateToken(user);
        console.log("token", token);
        res.send({
            token: token
        });
    } else {
        res.status(400).send({error: 'incorrect credential'});
    }
};