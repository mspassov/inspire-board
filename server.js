const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const ideasRouter = require('./routes/ideas');
const port = process.env.PORT || 5000;

//Connect to Mongo database
connectDB();

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('GET: Welcome to the Ideas API');
})

//middleware
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server running on Port: ${port}`));

