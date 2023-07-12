const express = require('express');
const router = express.Router();
const experience_master = require('../model/experience_master');
const { body, validationResult } = require('express-validator');

// Get all experience: GET "/experience"
router.get('/get', async (req, res) => {
  try {
    const experience = await experience_master.find({}, {__v: 0});
    res.status(200).json({ status: 'sucess', mssg: 'experience fetch', experienceList: experience });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get specific company_details:Get "/experiencedetails"
router.post('/get', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ status: 'error', message: 'ID is required' });
    }

    const experience = await experience_master.findById(id);
    if (!experience) {
      return res.status(404).json({ status: 'error', message: 'experience details not found' });
    }

    res.status(200).json({ status: 'success', message: 'experience details fetched', experienceList: experience });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});




// Create an experience: POST "/experience"
router.post('/create', [
  body('experience.from').notEmpty().withMessage('From year is required!').isInt({ min: 0 }).withMessage('From year should be a non-negative integer!'),
  body('experience.to').notEmpty().withMessage('To year is required!').isInt({ min: 0 }).withMessage('To year should be a non-negative integer!'),
  body('details').notEmpty().withMessage('Details is required!'),
  body('active').notEmpty().withMessage('Active is required!').isIn(['Yes', 'No']).withMessage('Active should be either "Yes" or "No"!')
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
} else {
    try {
      const {
        experience,
        details,
        active
      } = req.body;

      const newExperience = await experience_master.create({
        experience: experience,
        details: details,
        active: active
      });

      res.status(200).json({ status: 'success', message: 'Experience created successfully', data: newExperience });

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'server error', message: 'Internal Server Error' });
    }
  }
});

// Delete an experience by ID: DELETE "/experience"
router.post('/delete', async (req, res) => {
  try {
    const experienceId = req.body.id;
    if (!experienceId) {
      return res.status(400).json({ status: 'error', message: 'ID is required' });
    } 

    const result = await experience_master.findByIdAndDelete(experienceId);
    if (result) {
      res.send('Experience deleted successfully');
    } else {
      res.status(404).send('Experience not found');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Update an experience by ID: PATCH "/experience"
router.post('/update', [
  body('id').notEmpty().withMessage('experience ID is required!'),
  body('experience.from').notEmpty().withMessage('From year is required!').isInt({ min: 0 }).withMessage('From year should be a non-negative integer!'),
  body('experience.to').notEmpty().withMessage('To year is required!').isInt({ min: 0 }).withMessage('To year should be a non-negative integer!'),
  body('details').notEmpty().withMessage('Details is required!'),
  body('active').notEmpty().withMessage('Active is required!').isIn(['Yes', 'No']).withMessage('Active should be either "Yes" or "No"!')
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
} else {
    try {
      const experienceId = req.body.id;
      const {
        experience,
        details,
        active
      } = req.body;

      const updatedExperience = await experience_master.findByIdAndUpdate(experienceId, {
        experience: experience,
        details: details,
        active: active
      }, { new: true });

      if (updatedExperience) {
        res.status(200).json({ status: 'success', message: 'Experience updated successfully', data: updatedExperience });
      } else {
        res.status(404).send('Experience not found');
      }

    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
});

module.exports = router;
