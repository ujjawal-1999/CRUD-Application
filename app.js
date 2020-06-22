const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require("path");
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//Mongoose Connection
const connectDB = require('./config/db');

//Load Config file
dotenv.config({path:'./config/config.env'});

//Passport Config
const passport = require('passport');
require('./config/passport')(passport);

//DB Connection
connectDB();

const app = express();

//Body Parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Method Override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Handlebar Helpers
const { formatDate,stripTags, truncate,editIcon,select } = require('./helpers/hbs');

//Cofigure Handlebars
app.engine('.hbs', exphbs({helpers:{formatDate,stripTags, truncate,editIcon,select},defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//Express-session middleware
app.use(session({
    secret: 'keyboard warrior',
    resave:false,
    saveUninitialized:true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

//Set Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//SET Global Variables
app.use(function(req,res,next){
    res.locals.user = req.user || null;
    next();
})

//Configure Static Files
app.use(express.static(path.join(__dirname,'public')));

//Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/stories',require('./routes/stories'));

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server Up and Running in ${process.env.NODE_ENV} on PORT ${PORT}`);
});