const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// === Pasport Config =====
require('./config/passport')(passport);

// ====== Connect to MongoDB =======
mongoose.connect('mongodb://localhost/nodelogin', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// ==== EJS =======
app.use(expressLayouts);
app.set('view engine', 'ejs');

// ===== Body Parser =======
app.use(express.urlencoded({ extended: false }));

// ===== Express Session =====
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// ==== Passport Middleware ====
app.use(passport.initialize());
app.use(passport.session());

// ======= Connect Flash =======
app.use(flash());

// ====== Global Variables ======
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// ===== Route Handlers ======
const opening = require('./routes/index');
const users = require('./routes/users');


// ===== ROUTES =========
app.use('/', opening);
app.use('/users', users);



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));