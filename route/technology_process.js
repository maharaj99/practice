const express = require('express');
const router = express.Router();
const technology_service = require('../model/technology_master');
const { body, validationResult } = require('express-validator');

// Get all technology: GET "/technology"

router.get('/get', async (req, res) => {
  try {
    const technology = await technology_service.find({}, {});
    res.status(200).json({ status: 'sucess', mssg: 'technology details fetch', technologyList: technology });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get specific company_details:Get "/technology"
router.get('/get/:id', async (req, res) => {
  try {
    const technology = await technology_service.findById(req.params.id);
    if (!technology) {
      return res.status(404).json({ status: 'error', message: 'technology details not found' });
    }
    res.status(200).json({ status: 'success', message: 'technology details fetched', technologyList: technology });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Create a technology: POST "/technology"
router.post('/create', [
  body('technology_name').notEmpty().withMessage('Technology Name is required!'),
  // body('category').notEmpty().withMessage('Category is required!'),
  body('active').notEmpty().withMessage('Active is required!')

], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
} else {
    try {
      const {
        technology_name,
        category
      } = req.body;

      const newTechnology = await technology_service.create({
        technology_name: technology_name,
        category: category
      });

      res.status(200).json({ status: 'success', message: 'Technology created successfully', data: newTechnology });

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'server error', message: 'Internal Server Error' });
    }
  }
});

// Delete a technology by ID: DELETE "/technology"
// router.delete('/:id', async (req, res)
router.post('/delete/:id', async (req, res) => {
    try {
      const technologyId = req.params.id;
      const result = await technology_service.findByIdAndDelete(technologyId);
      if (result) {
        res.send('technology deleted successfully');
      } else {
        res.status(404).send('technology not found');
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

// Update a technology by ID: PATCH "/technology"
// router.patch('/:id', async (req, res) => {
// router.patch('/', async (req, res) => {
  router.patch('/update', [
    body('id').notEmpty().withMessage('Technology ID is required!'),
    body('updateData').notEmpty().withMessage('Update data is required!')
  ], async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
  }else {
      try {
        const { id, updateData } = req.body;
  
        const updatedTechnology = await technology_service.findByIdAndUpdate(id, updateData, { new: true });
  
        if (updatedTechnology) {
          res.status(200).json({ status: 'success', message: 'Technology updated successfully', data: updatedTechnology });
        } else {
          res.status(404).json({ status: 'error', message: 'Technology ID not found' });
        }
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  });
  

module.exports = router;