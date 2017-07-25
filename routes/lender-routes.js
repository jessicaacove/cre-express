const express = require('express');


const LenderrModel = require('../models/lender-model');


const router = express.Router();




router.post('/api/lenders', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to view lenders. '});
    return;
  }

  const theLender = new LenderModel({
    institutionName: req.body.institutionName,
    contactFirstName: req.body.contactFirstName,
    contactLastName: req.body.contactLastName,
    email: req.body.email,
    projectSizeMin: req.body.projectSizeMin,
    projectSizeMax: req.body.projectSizeMax,
    geographicalArea: req.body.geographicalArea,
    projectTypes: req.body.projectTypes
  });

  theLender.save((err) => {
    if (err && theLender.errors === undefined) {
      res.status(500).json({ message: 'Lender save failed'});
    }

    // Validation error
    if (err && theLender.errors) {
      res.status(400).json({
        institutionName: theLender.errors.institutionName,
        contactFirstName: theLender.errors.contactFirstName,
        contactLastName: theLender.errors.contactLastName,
        email: theLender.errors.email,
        projectSizeMin: theLender.errors.projectSizeMin,
        projectSizeMax: theLender.errors.projectSizeMax,
        geographicalArea: theLender.errors.geographicalArea,
        projectTypes: theLender.errors.projectTypes
      });
      return;
    }

    // Success!
    res.status(200).json(theLender);
  });
});


router.get('/api/lenders', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to see lenders. 🐪'});
    return;
  }

  LenderModel
    .find()
    .exec((err, allTheLenders) => {
      if (err) {
        res.status(500).json({ message: 'Lender find failed'});
        return;
      }

    res.status(200).json(allTheLenders);
  });
}); //close router.get('/api/lenders', ...



















module.exports = router;
