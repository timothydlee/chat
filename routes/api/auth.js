const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Test route 
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token 
// @access  Public
router.post('/',
    [
        check('email', 'Please include a valid email.').isEmail(),
        check('password', 'Password is required.').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        try {
            // See if user exists
            let user = await User.findOne({ email });

            // If user exists, we return an error in the same format as the express-validator error format.
            if (!user) {
                return res
                    .status(403)
                    .json({ errors: [{ msg: 'Invalid credentials. Please try again.' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.log('Not matched');
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials. Please try again.' }] })
            }

            // Return JWT
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            res.status(500).send('Server Error - Something went wrong.');
        }
    }
);

module.exports = router;