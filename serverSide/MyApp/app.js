const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const mongoose = require("mongoose")
const bodyparser = require('body-parser')
const logger = require('morgan');

const productRoute = require('../MyApp/routes/api/product')



const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(bodyparser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(productRoute)



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
  res.render('error');
});












// getting config key
const db = require('../config/keys').mongoURI

// connecting to mongodb 
mongoose.connect(db,{ useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongodb...!!!');
  })
  .catch((err) => {
    console.log('Error', err);
  })

// Use routes 





const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listing on port ${port}`))


module.exports = app;
