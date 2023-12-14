import express from 'express';
import createError from "http-errors";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.routes.js";
import DocsRouter from "./routes/docs.routes.js";
import {expressjwt} from "express-jwt";
import {jwtPassword} from './constants/login.constants.js';

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
