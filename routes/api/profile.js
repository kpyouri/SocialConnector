const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//Load profile model
const Profile = require('../../models/Profile');
//Load user model
const User = require('../../models/User');

// @route  GET api/profile
// @desc   Get current user profile
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}),
(req, res) => {
    let errors = {};
    Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(400).json(err));
}
)

// @route  POST api/profile
// @desc   Create or edit user profile
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}),
(req, res) => {
    let errors = {};

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

// Skills - split into array
if (typeof req.body.skills !== 'undefined'){
    profileFields.skills = req.body.skills.split(',');
}

//Social
profileFields.social = {};
if (req.body.status.youtube) profileFields.social.youtube = req.body.youtube;
if (req.body.status.twitter) profileFields.social.twitter = req.body.twitter;
if (req.body.status.facebook) profileFields.social.facebook = req.body.facebook;
if (req.body.status.instagram) profileFields.social.instagram = req.body.instagram;
if (req.body.status.linkedin) profileFields.social.linkedin = req.body.linkedin;

Profile.findOne({user: req.user.id})
.then(profile => {
    if (profile) {
        //Update 
        Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true}
        ).then(profile => res.json(profile));
    } else {
        //Create
        Profile.findOne({handle: profileFields.handle})
        .then(profile => {
            if (profile){
                errors.handle = 'That handle already exists';
                return res.status(400).json(errors);
            }
            
            //Save profile
            new Profile(profileFields)
            .save()
            .then(profile => res.json(profile));
        })
    }
});
}
)

// @route  POST api/profile/all
// @desc   Get all profile
// @access Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if (!profiles) {
            errors.noprofile = 'There are no profiles';
            return res.status(404).json(errors);
        }

        res.json(profiles);
    })
    .catch(err => res.status(404).json({profile: 'There are no profiles'}))
})

// @route  POST api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json(err))
})

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user_id
// @access Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json(err))
})

// @route  POST api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post(
    '/experience',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {

        Profile.findOne({user: req.user.id})
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            
            //Add experience to the array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        })

    }
    )

    //@route   DELETE api/profile/experience/:exp_id
    //@desc    Delete experience from profile
    //@access  Private
router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        let errors = {};
        Profile.findOne({user: req.user.id})
        .then(profile => {
            //get remove index
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);

            if (removeIndex === -1){
                errors.experiencenotfound = 'Experience not found';
                return res.status(404).json(errors);
            }

            profile.experience.splice(removeIndex, 1);
            profile.save().then(profile => res.json(profile));
            
        })
        .catch(err => res.status(404).json(err));
    }
)

module.exports = router;