const express = require('express');


const LoanModel = require('../models/loan-model');


const router = express.Router();




router.post('/api/loans', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to create loans. 🐫'});
    return;
  }

  const theLoan = new LoanModel({

    projectName: req.body.projectName,
    debtPercentage: req.body.percentage,
    institutionName: req.body.institutionName,
    contactFirstName: req.body.investorFirstName,
    contactLastName: req.body.investorLastName,
    projectId:
    investorId:
  });

  theLoan.save((err) => {
    if (err && theLoan.errors === undefined) {
      res.status(500).json({ message: 'Loan save failed'});
    }

    // Validation error
    if (err && theLoan.errors) {
      res.status(400).json({
        projectNameError: theLoan.errors.projectName,
        debtPercentageError: theLoan.errors.debtPercentage,
        institutionNameError: theLoan.errors.institutionName,
        contactFirstNameError: theLoan.errors.contactFirstName,
        contactLastNameError: theLoan.errors.contactLastName,
      });
      return;
    }

    // Success!
    res.status(200).json(theLoan);
  });
});


router.get('/api/loans', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to see loans. 🐪'});
    return;
  }

  LoanModel
    .find()
    .populate('user', { encryptedPassword: 0 }) //retrieve all the info of owners (needs "ref")
    // dont retieve encryptedPassword though
    .exec((err, allTheLoans) => {
      if (err) {
        res.status(500).json({ message: 'Loan find failed'});
        return;
      }

    res.status(200).json(allTheLoans);
  });
}); //close router.get('/api/camels', ...



















module.exports = router;
