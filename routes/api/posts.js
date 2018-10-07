const express = require('express');
const router = express.Router();

const Post = require('../../models/Post');

// router.get('/test', (req, res) => res.json({msg: 'Posts work'}));

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

router.get('/', (req, res) => {
    
});

module.exports = router;