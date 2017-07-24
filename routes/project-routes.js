const express = require('express');


const ProjectModel = require('../models/project-model');


const router = express.Router();




router.post('/api/current-projects', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to create a project.'});
    return;
  }

  const theProject = new ProjectModel({
    projectName: req.body.projectName,
    projectType: req.body.projectType,
    address: req.body.projectAddress,
    totalCost: req.body.projectTotalCost,
    mainImage: req.body.projectMainImage,
    detailImages: [req.body.projectDetailImage1, req.body.projectDetailImage2, req.body.projectDetailImage3, req.body.projectDetailImage4]
  });

  theProject.save((err) => {
    if (err && theProject.errors === undefined) {
      res.status(500).json({ message: 'Project save failed'});
    }

    // Validation error
    if (err && theProject.errors) {
      res.status(400).json({
        nameError: theProject.errors.projectName,
        typeError: theProject.errors.projectType,
        addressError: theProject.errors.address,
        costError: theProject.errors.totalCost,
        mainImageError: theProject.errors.mainImage,
        detailImagesError: theProject.errors.detailImages
      });
      return;
    }

    // theProject.investments = Investment.find({});
    // console.log('Investments are... ' + theProject.investments);

    // Success!
    res.status(200).json(theProject);
  });
});


router.get('/api/current-projects', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to see projects.'});
    return;
  }

  ProjectModel
    .find()
    // .populate('investment') //retrieve all the info of investments (needs "ref")
    // .populate('loan')
    .exec((err, allTheProjects) => {
      if (err) {
        res.status(500).json({ message: 'Project find failed'});
        return;
      }

    res.status(200).json(allTheProjects);
  });
}); //close router.get('/api/projects', ...



// ------------------------------------------------------------------
// Get project by Id



router.get('/api/project/:id', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to see projects.'});
    return;
  }

  ProjectModel
    .findById("id")
    .exec((err, projectById) => {
      if (err) {
        res.status(500).json({ message: 'Project find failed'});
        return;
      }

    console.log(projectById);

    res.status(200).json(projectById);
  });
}); //close router.get('/api/project/:id', ...















module.exports = router;
