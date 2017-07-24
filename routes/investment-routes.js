const express = require('express');


const InvestmentModel = require('../models/investment-model');


const ProjectRoutes = require('./project-routes');


const router = express.Router();




router.post('/api/investments', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to create investments.'});
    return;
  }

  const theInvestment = new InvestmentModel({
    investmentPercentage: req.body.investmentPercentage,
    // projectId: theProject._id
  });

  theInvestment.save((err) => {
    if (err && theInvestment.errors === undefined) {
      res.status(500).json({ message: 'Investment save failed'});
    }

    // Validation error
    if (err && theInvestment.errors) {
      res.status(400).json({
        investmentPercentageError: theInvestment.errors.investmentPercentage,
        // projectIdError: theInvestment.errors.projectId,
        // investorIdError: theInvestment.errors.investorId
      });
      return;
    }

    // Success!
    res.status(200).json(theInvestment);
  });
});


router.get('/api/investments', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to see investments.'});
    return;
  }

  InvestmentModel
    .find()
    // .populate('project') //retrieve all the info of projects (needs "ref")
    // .populate('investor')
    .exec((err, allTheInvestments) => {
      if (err) {
        res.status(500).json({ message: 'Investment find failed'});
        return;
      }

    res.status(200).json(allTheInvestments);
  });
}); //close router.get('/api/camels', ...














module.exports = router;
