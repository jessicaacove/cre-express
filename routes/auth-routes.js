const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');


const UserModel = require('../models/user-model');

const router = express.Router();



router.post('/api/signup', (req, res, next) => {
    if (!req.body.signupEmail || !req.body.signupPassword) {
        res.status(400).json({ message: 'Need both email and password'});
        return;
    }

    UserModel.findOne(
      { email: req.body.signupEmail },
      (err, userFromDb) => {
        if (err) {
          // 500 for server errors (nothing the user can do)
          res.status(500).json({ message: 'Email check failed'});
          return;
        }

        if (userFromDb) {
          // 400 for client errors (user needs to fix something)
          res.status(400).json({ message: 'Email already exists' });
          return;
        }

        const salt = bcrypt.genSaltSync(10);
        const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

        const theUser = new UserModel({
          firstName: req.body.signupFirstName,
          lastName: req.body.signupLastName,
          email: req.body.signupEmail,
          encryptedPassword: scrambledPassword
        });

        theUser.save((err) => {
            if (err) {
              res.status(500).json({ message: 'User save failed'});
              return;
            }

            // Automatically logs them in after signup
            // req.login is defined by passport
            req.login(theUser, (err) => {
              if (err) {
                res.status(500).json({ message: 'Log in failed'});
                return;
              }

              // Remove the encryptedPassword before sending
              // (not from the database, just from the object)
              theUser.encryptedPassword = undefined;

              // Send the user's information to the frontend
              res.status(200).json(theUser);

            }); // close req.login()
        }); // close theUser.save()
      }
    ); // close UserModel.findOne()
}); // close router.pose('/signup', ...



// this is different because passport.authenticate() redirects
// (API's normally shouldnt redirect)
router.post('/api/login', (req, res, next) => {
  const authenticateFunction =
    passport.authenticate('local', (err, theUser, extraInfo) => {
        // Errors prevented us from deciding if login was success/failure
        if (err) {
          res.status(500).json({ message: 'Unknown login error' });
          return;
        }

        // Login failed for sure
        if (!theUser) {
          // extraInfo contains feedback messages from localStrategy
          res.status(401).json(extraInfo);
          return;
        }

        // Login successful
        req.login(theUser, (err) => {
          if (err) {
            res.status(500).json({ message: 'Session save error'});
            return;
          }

          theUser.encryptedPassword = undefined;
          // Everything worked! Send the user's information
          res.status(200).json(theUser);
        });
    });

    authenticateFunction(req, res, next);
});



router.post('/api/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Log out successful'});
});



router.get('/api/checklogin', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Nobody logged in'});
    return;
  }

  req.user.encryptedPassword = undefined;
  res.status(200).json(req.user);
});






module.exports = router;
