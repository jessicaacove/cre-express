const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../models/user-model');


passport.serializeUser((userFromDb, next) => {
  next(null, userFromDb._id);
});

passport.deserializeUser((idFromBowl, next) => {
  UserModel.findById(
    idFromBowl,
    (err, userFromDb) => {
      if (err) {
        next(err);
        return;
      }

      next(null, userFromDb);
    }
  );
});


//email and password login strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'enteredEmail',
    passwordField: 'enteredPassword'
  },
  (theEmail, thePassword, next) => {
    UserModel.findOne(
      { email: theEmail },
      (err, userFromDb) => {
        if (err) {
          next(err);
          return;
        }

        if (userFromDb === null) {
          next(null, false, { message: 'Incorrect email' });
          return;
        }

        if(bcrypt.compareSync(thePassword, userFromDb.encryptedPassword) === false) {
          next(null, false, { message: 'Incorrect password'});
          return;
        }

        next(null, userFromDb);
      }
    ); // close UserModel findOne
  } // close (theEmail, thePassword, next) => {
));
