const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// ====== Connect to MongoDB =======
mongoose.connect('mongodb://localhost/nodelogin', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// ==== EJS =======
app.use(expressLayouts);
app.set('view engine', 'ejs');

// ===== Body Parser =======
app.use(express.urlencoded({ extended: false }));


// ===== Route Handlers ======
const opening = require('./routes/index');
const users = require('./routes/users');


// ===== ROUTES =========
app.use('/', opening);
app.use('/users', users);



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));