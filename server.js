const express = require('express');
const ideas = require('./ideas');
const port = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('GET: Welcome to the Ideas API');
})

//Get all ideas
app.get('/api/ideas', (req, res) => {
    res.json({
        success: true,
        data: ideas
    });
})

//Get idea by id
app.get('/api/ideas/:id', (req, res) => {
    const target = ideas.find((idea) => idea.id == parseInt(req.params.id));

    if(!target){
        return res.status(404).json({success: false, data: "Idea not found"});
    }

    res.json({success: true, data: target});
})

app.listen(port, () => console.log(`Server running on Port: ${port}`))

