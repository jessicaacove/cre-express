const express = require('express');

const ProjectModel = require('../models/project-model');
const LenderModel = require('../models/lender-model');
const LoanModel = require('../models/loan-model');


const router = express.Router();




router.post('/api/loans', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to create loans.'});
    return;
  }

  LenderModel.findById(req.body.lenderId, (err, lenderbyid) => {
    if(err) {
      res.status(500).json({message: 'Lender find by id failed'});
      return;
    }

    ProjectModel.findByIdAndUpdate(req.body.projectId,
      {
        $push: {
          debt: {
            debtPercentage: req.body.debtAmount,
            institutionName: lenderbyid.institutionName,
            lenderId: lenderbyid._id
          }
        },
      },
      { new: true },
      (err, projectUpdated) => {
        if(err) {
          res.status(500).json({message: 'Project find by id and update failed'});
          return;
        }
          LenderModel.findByIdAndUpdate(req.body.lenderId,
            {
              $push: {
                debt: {
                  debtPercentage: req.body.debtAmount,
                  projectName: projectUpdated.projectName,
                  projectId: projectUpdated._id
                }
              }
            },
            (err, lenderbyid) => {
              if(err) {
                res.status(500).json({message: 'Lender find by id and update failed'});
                return;
              }

              res.status(200).json(projectUpdated);
            }
          );
      });
  });
});

// router.get('/api/loans', (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({ message: 'Log in to see loans. 🐪'});
//     return;
//   }
//
//   LoanModel
//     .find()
//     // .populate('user', { encryptedPassword: 0 }) //retrieve all the info of owners (needs "ref")
//     // dont retieve encryptedPassword though
//     .exec((err, allTheLoans) => {
//       if (err) {
//         res.status(500).json({ message: 'Loan find failed'});
//         return;
//       }
//
//     res.status(200).json(allTheLoans);
//   });
// }); //close router.get('/api/loans', ...



















module.exports = router;
