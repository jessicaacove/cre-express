const express = require('express');


const InvestorModel = require('../models/investor-model');


const router = express.Router();




router.post('/api/investors', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to view investors. '});
    return;
  }

  const theInvestor = new InvestorModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
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
    .exec((err, allTheInvestors) => {
      if (err) {
        res.status(500).json({ message: 'Investor find failed'});
        return;
      }

    res.status(200).json(allTheInvestors);
  });
}); //close router.get('/api/investors', ...





// _____________________________________________________
// GET INVESTOR BY ID


router.get('/api/investor/:id', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to see investors.'});
    return;
  }

  InvestorModel
    .findById(req.params.id)
    .exec((err, investorById) => {
      if (err) {
        res.status(500).json({ message: 'Investor find failed'});
        return;
      }

    res.status(200).json(investorById);
  });
}); //close router.get('/api/investor/:id', ...




router.post('/api/investor/:id', (req, res, next) => {

  if (!req.user) {
    res.status(401).json({ message: 'Log in to create an investment.'});
    return;
  }

  InvestorModel.findById(req.params, (err, theInvestor) => {
    if (err){
      res.status(500).json({ message: 'Sorry, unable to find investor information'});
    }

    ProjectId.findById(projectId, (err, theProject) => {
      if (err){
        res.status(500).json({ message: 'Sorry, unable to find project information'});
      }

      theInvestor.investments[0].investmentPercentage = req.body.investmentPercentage;
      theInvestor.investments[0].projectId = req.body.projectId;
      theInvestor.investments[0].projectName = theProject.projectName;
      theInvestor.investments[0].totalCost = theProject.totalCost;

      theInvestor.save((err) => {
        if (err && theInvestor.errors === undefined) {
          res.status(500).json({ message: 'Investor save failed'});
          return;
        }

        // Validation error
        if (err && theInvestment.errors) {
          res.status(400).json({
            investmentPercentageError: theInvestment.errors.investmentPercentage,
            projectError: theInvestment.errors.project,
            investorError: theInvestment.errors.investor
          });
          return;
        }

        // Put the full info here for Angular


        // Success!
            res.status(200).json(theInvestor);
        }); // close theInvestment.save()
      });
    }); // close router.post('/api/projects/:id', ...

  // const theInvestment = new InvestmentModel({
  //   investmentPercentage: req.body.investmentPercentage,
  //   project: req.body.project,
  //   investor: req.body.investor,
  //   investorName: investorName
  // });

    // Put the full info here for Angular



  //   // Success!
  //       res.status(200).json(theInvestment);
  //   }); // close theInvestment.save()
  // });
}); // close router.post('/api/projects/:id', ...












module.exports = router;
