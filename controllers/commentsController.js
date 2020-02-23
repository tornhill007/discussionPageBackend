const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Comments = mongoose.model('Comments');


// get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comments.find();
        res.json(comments);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// submit form
router.post('/', async (req, res) => {
    const comment = new Comments({creationTime: (new Date().toLocaleString()), ...req.body});
    try {
        const savedComment = await comment.save();
        await res.json(savedComment);
    } catch (err) {
        await res.json({
            message: err
        });
    }
    // insertRecord(req, res);
});

//get specific
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.commentId);
        res.json(comment);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

//delete
router.delete('/:commentId', async (req, res) => {
    try {
        await Comments.deleteMany({ parentId: req.params.commentId });
        const removeComment = await Comments.deleteMany({ _id: req.params.commentId });

        // ({ _id: req.params.commentId, parentId: req.params.commentId})
        res.json(removeComment);
    } catch (err) {
        res.json({ message: err})
    }
});

// update
router.patch('/:commentId', async (req, res) => {
    try {
        Comments.findByIdAndUpdate({_id: req.params.commentId}, {...req.body}, {}, function(err, result){

            if(err){
                res.send({ succees: false})
            }
            else{
                res.send({succees: true})
            }

        });
    } catch (err) {
        res.json({ message: err })
    }
});

router.get('/list', (req, res) => {
    res.json('from list')
});

module.exports = router;