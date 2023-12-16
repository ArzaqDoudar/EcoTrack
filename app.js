import express from 'express';
import axios from 'axios';
import createError from "http-errors";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.routes.js";
import weatherRouter from "./routes/weather.routes.js";
import DocsRouter from "./routes/docs.routes.js";
import {expressjwt} from "express-jwt";
import {jwtPassword} from './constants/login.constants.js';
//import module from './apiweather.js';
//import apiweather from './apiweather.js';
//import getWeatherData from './weatherApi';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/docs', DocsRouter
    /*
        #swagger.ignore = true
     */
);

// the urls in the unless are the uri that are opened to the public
app.use(
    expressjwt({
        secret: jwtPassword,
        algorithms: ["HS256"],
        getToken: function fromHeaderOrQuerystring(req) {
            if (
                req.headers.authorization &&
                req.headers.authorization.split(" ")[0] === "Bearer"
            ) {
                return req.headers.authorization.split(" ")[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        },
    }).unless({
        path: [
            {
                method: "POST",
                url: "/users/login"
            }, {
                method: "POST",
                url: '/users/'
            }
        ]
    })
);

app.use('/', indexRouter);
app.use('/users', usersRouter
    /*
        #swagger.security = [{
              "bearerAuth": []
        }]
        #swagger.tags = ['Users']
    */
);
app.use('/forcast', weatherRouter
    /*
        #swagger.security = [{
              "bearerAuth": []
        }]
        #swagger.tags = ['forcast']
    */
);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err)
});


////////////////////

//const api = require('./apiweather.js')

// app.js
// // weatherApi.js
// const axios = require('axios');

// const getWeatherData = async () => {
//   const options = {
//     method: 'GET',
//     url: 'https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast',
//     params: {
//       location: '42.15,82.1',
//       timesteps: '1h',
//       units: 'metric'
//     },
//     headers: {
//       'X-RapidAPI-Key': '395b7cace2msh03c0453c05785d9p19b29djsn80ef7b724a99',
//       'X-RapidAPI-Host': 'tomorrow-io1.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };
// export default getWeatherData;
// //module.exports = getWeatherData;


// const express = require("express");
// const axios = require("axios");

// const app = express();

// app.get("/forcast", async (req, res, next) => {
    
 
// }



// app.listen(3000, () => {
//   console.log("Connected");
// });
///////////////////





export default app;
