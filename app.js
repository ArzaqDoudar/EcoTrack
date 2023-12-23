import express from 'express';
import axios from 'axios';
import createError from "http-errors";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.routes.js";
import dataRouter from "./routes/data.routes.js";
import weatherRouter from "./routes/weather.routes.js";
import reportRouter from "./routes/report.routes.js";
import DocsRouter from "./routes/docs.routes.js";
import {expressjwt} from "express-jwt";
import {jwtPassword} from './constants/login.constants.js';
import { userMiddleware } from './middleware/user.middleware.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/docs', DocsRouter
    /*
        #swagger.ignore = true
     */
);


// for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

// the urls in the unless are the uri that are opened to the public
app.use(
    expressjwt({
        secret: jwtPassword,
        algorithms: ["HS256"],
        getToken: function fromHeaderOrQuerystring(req) {
            let token = null;
            if (
                req.headers.authorization &&
                req.headers.authorization.split(" ")[0] === "Bearer"
            ) {
                token = req.headers.authorization.split(" ")[1];
            } else if (req.query && req.query.token) {
                token = req.query.token;
            }
            req.token = token;
            return token;
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

app.use(userMiddleware);

app.use('/', indexRouter);
app.use('/data-collection', dataRouter
    /*
        #swagger.security = [{
              "bearerAuth": []
        }]
        #swagger.tags = ['DataCollection']
    */
);
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
app.use('/report', reportRouter
    /*
        #swagger.security = [{
              "bearerAuth": []
        }]
        #swagger.tags = ['report']
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

export default app;
