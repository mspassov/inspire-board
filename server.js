const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./db');
const ideasRouter = require('./routes/ideas');
const port = process.env.PORT || 5000;

//Connect to Mongo database
connectDB();

const app = express();

//Setting up static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Cors Middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('GET: Welcome to the Ideas API');
})

//middleware
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server running on Port: ${port}`));

