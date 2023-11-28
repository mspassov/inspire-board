const express = require('express');
const router = express.Router();
var ideas = [
    {
        id: 1,
        text: "Idea 1",
        tag: "Tag 1",
        username: "user1",
        date: "2023-05-11"
    },
    {
        id: 2,
        text: "Idea 2",
        tag: "Tag 2",
        username: "user2",
        date: "2023-05-11"
    },
    {
        id: 3,
        text: "Idea 3",
        tag: "Tag 3",
        username: "user3",
        date: "2023-05-11"
    },
];

//Get all ideas
router.get('/', (req, res) => {
    res.json({ success: true, data: ideas });
})

//Post new idea
router.post('/', (req, res) =>{
    const newIdea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0, 10),
    }
    ideas.push(newIdea);
    res.status(200).json({success: true, data: newIdea});
})

//Update idea by id
router.put('/:id', (req, res) => {
    const target = ideas.find((idea) => idea.id == parseInt(req.params.id));

    if(!target){
        return res.status(404).json({success: false, data: "Idea not found"});
    }

    target.text = req.body.text || target.text;
    target.tag = req.body.tag || target.tag;

    res.status(200).json({success: true, data: target});
})

//Delete idea by id
router.delete('/:id', (req, res) => {
    const target = ideas.find((idea) => idea.id == parseInt(req.params.id));

    if(!target){
        return res.status(404).json({success: false, data: "Idea not found"});
    }

    ideas = ideas.filter((idea) => (idea.id != parseInt(req.params.id)));

    res.status(200).json({success: true, data: target});
})

//Get idea by id
router.get('/:id', (req, res) => {
    const target = ideas.find((idea) => idea.id == parseInt(req.params.id));

    if(!target){
        return res.status(404).json({success: false, data: "Idea not found"});
    }

    res.status(200).json({success: true, data: target});
})

module.exports = router;