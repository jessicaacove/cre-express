const express = require('express');


const InvestorModel = require('../models/investor-model');
const ProjectModel = require('../models/project-model');


const router = express.Router();




router.post('/api/investments', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to create investments.'});
    return;
  }

  InvestorModel.findById(req.body.investorId, (err, investorbyid) => {
    if(err) {
      res.status(500).json({message: 'Investor find by id failed'});
      return;
    }

    ProjectModel.findByIdAndUpdate(req.body.projectId,
      {
        $push: {
          investments: {
            investmentPercentage: req.body.amount,
            firstName: investorbyid.firstName,
            lastName: investorbyid.lastName,
            investorId: investorbyid._id
          }
        },
      },
      { new: true },
      (err, projectUpdated) => {
        if(err) {
          res.status(500).json({message: 'Project find by id and update failed'});
          return;
        }
          InvestorModel.findByIdAndUpdate(req.body.investorId,
            {
              $push: {
                investments: {
                  investmentPercentage: req.body.amount,
                  projectName: projectUpdated.projectName,
                  projectId: projectUpdated._id
                }
              }
            },
            (err, investorbyid) => {
              if(err) {
                res.status(500).json({message: 'Investor find by id and update failed'});
                return;
              }

              res.status(200).json(projectUpdated);
            }
          );
      });
  });

  // theInvestment.save((err) => {
  //   if (err && theInvestment.errors === undefined) {
  //     res.status(500).json({ message: 'Investment save failed'});
  //   }
  //
  //   // Validation error
  //   if (err && theInvestment.errors) {
  //     res.status(400).json({
  //       investmentPercentageError: theInvestment.errors.investmentPercentage,
  //       // projectIdError: theInvestment.errors.projectId,
  //       // investorIdError: theInvestment.errors.investorId
  //     });
  //     return;
  //   }

  //   // Success!
  //   res.status(200).json(theInvestment);
  // });
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
