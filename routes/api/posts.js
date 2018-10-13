const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post model
const Post = require('../../models/Post');
//Profile model
const Profile = require('../../models/Profile');

// //Validation
// const validatePostInput = require('../../validation/post');

// @route GET api/posts
// @desc  Get posts
// @access Public
router.get('/', (req, res) => {
    Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route  POST api/posts
// @desc   Create posts
// @access Private

    router.post('/', (req, res) => {
        console.log(req.body);

        const newPost = new Post({
            user: {
                id: req.body.user
            },
            text: {
                body: req.body.text
            },
            name: req.body.name,
            avatar: req.body.avatar
        });
    

        newPost.save().then(post => res.json(newPost));
    }
);



module.exports = router;