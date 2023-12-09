const express = require('express');
const IdeaModel = require('../models/Idea');
const router = express.Router();

//Get all ideas
router.get('/', async (req, res) => {
    const allIdeas = await IdeaModel.find();
    try {
        res.status(200).json({success: true, data: allIdeas});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Problem retrieving the collection'});
    }
});

//Post new idea
router.post('/', async (req, res) =>{
    const newIdea = new IdeaModel({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    });

    try {
        const savedIdea = await newIdea.save();
        res.status(200).json({success: true, data: savedIdea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "Could not save the new item"});
    }
})

//Update idea by id
router.put('/:id', async (req, res) => {
    try {
        const idea = await IdeaModel.findById(req.params.id);
        if(idea.username == req.body.username){
            const updatedIdea = await IdeaModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set:{
                        text: req.body.text,
                        tag: req.body.tag
                    }
                },
                {new: true}
            );
            return res.status(200).json({success: true, data: updatedIdea});
        }
        
        res.status(403).json({success: false, error: 'Unauthorized access to update this post'});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "Could not update item with this id"});
    }
})

//Delete idea by id
router.delete('/:id', async (req, res) => {
    try {
        const idea = await IdeaModel.findById(req.params.id);
        if(idea.username == req.body.username){
            const deletedIdea = await IdeaModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({success: true, data: deletedIdea});
        }

        res.status(403).json({success: false, error: 'Unauthorized access to delete this post'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "Could not delete item with this id"});
    }
})

//Get idea by id
router.get('/:id', async (req, res) => {
    try {
        const currIdea = await IdeaModel.findById(req.params.id);
        res.status(200).json({success: true, data: currIdea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "Could not find this idea"});
    }
})

module.exports = router;