const express = require('express');


const InvestorModel = require('../models/investor-model');


const router = express.Router();




router.post('/api/investors', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to view investors. 🐫'});
    return;
  }

  const theInvestor = new InvestorModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    // investments: findById
  });

  theInvestor.save((err) => {
    if (err && theInvestor.errors === undefined) {
      res.status(500).json({ message: 'Investor save failed'});
    }

    // Validation error
    if (err && theInvestor.errors) {
      res.status(400).json({
        firstNameError: theInvestor.errors.firstName,
        lastNameError: theInvestor.errors.lastName,
        emailError: theInvestor.errors.email
      });
      return;
    }

    // Success!
    res.status(200).json(theInvestor);
  });
});


router.get('/api/investors', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to see investors. 🐪'});
    return;
  }

  InvestorModel
    .find()
    // .populate('investment') //retrieve all the info of owners (needs "ref")
    .exec((err, allTheInvestors) => {
      if (err) {
        res.status(500).json({ message: 'Investor find failed'});
        return;
      }

    res.status(200).json(allTheInvestors);
  });
}); //close router.get('/api/investors', ...



















module.exports = router;
