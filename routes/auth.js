const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { Router } = require('express');
const router = Router();

router.post(
  '/register',
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Enter email please.')
    .normalizeEmail()
    .isEmail()
    .withMessage('Enter correct email'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Enter password please.')
    .isLength({ min: 6 })
    .withMessage('Password should contain 6 symbols')
    .exists(),
  async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Incorrect data',
          errors: errors.array(),
        });
      }

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          message: 'User already exist.',
        });
      }
      const hashedPassword = await bcrypt.hash(password, 14);

      const user = await new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({
        message: 'User created.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong.Try again later please.',
        error: error.message,
      });
    }
  }
);

router.post(
  '/login',
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Enter email please.')
    .normalizeEmail()
    .isEmail()
    .withMessage('Enter correct email'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Enter password please.')
    .isLength({ min: 6 })
    .withMessage('Password should contain 6 symbols')
    .exists(),
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Incorrect data',
          errors: errors.array(),
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: 'User not exist.',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: 'Incorrect password.Enter correct password please.',
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get('jwtSecretKey'),
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({
        message: '',
        token: `Bearer ${token}`,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong.Try again later please.',
        error: error.message,
      });
    }
  }
);

module.exports = router;
