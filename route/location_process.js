const express = require('express');
const router = express.Router();
const location_service = require('../model/location_master');
const { body, validationResult } = require('express-validator');

// Get all locations: GET "/locations"
router.get('/get', async (req, res) => {
  try {
    const locations = await location_service.find({}, {});
    res.status(200).json({ status: 'sucess', mssg: 'locations details fetch', locationsList: locations });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get specific company_details:Get "/locations"
router.get('/get/:id', async (req, res) => {
  try {
    const locations = await location_service.findById(req.params.id);
    if (!locations) {
      return res.status(404).json({ status: 'error', message: 'locations details not found' });
    }
    res.status(200).json({ status: 'success', message: 'locations details fetched', company: compdetails });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});


// Create a location: POST "/locations"
router.post('/create', [
  body('location_name')
  .notEmpty().withMessage('Location Name is required!')
  .isLength({ min: 2 }).withMessage('Location Name should be at least 2 characters long'),

  body('country').notEmpty().withMessage('Country is required!'),
  body('state').notEmpty().withMessage('State is required!'),
  body('city').notEmpty().withMessage('City is required!'),
  body('active').notEmpty().withMessage('Active is required!')

], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
} else {
    try {
      const {
        location_name,
        country,
        state,
        city
      } = req.body;

      const newLocation = await location_service.create({
        location_name: location_name,
        country: country,
        state: state,
        city: city
      });

      res.status(200).json({ status: 'success', message: 'Location created successfully', data: newLocation });

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'server error', message: 'Internal Server Error' });
    }
  }
});


// Delete a location by ID: DELETE "/locations"
// router.delete('/:id', async (req, res)
router.post('/delete/:id', async (req, res) => {
    try {
      const locationId = req.params.id;
      const result = await location_service.findByIdAndDelete(locationId);
      if (result) {
        res.send('Location deleted successfully');
      } else {
        res.status(404).send('Location not found');
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

// Update a location by ID: PATCH "/location/:id"
// router.patch('/:id', async (req, res) => {
// router.patch('/', async (req, res) => {
  router.patch('/update', [
    body('id').notEmpty().withMessage('Location ID is required!'),
    body('updateData').notEmpty().withMessage('Update data is required!')
  ], async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
  } else {
      try {
        const { id, updateData } = req.body;
  
        const updatedLocation = await location_service.findByIdAndUpdate(id, updateData, { new: true });
  
        if (updatedLocation) {
          res.status(200).json({ status: 'success', message: 'Location updated successfully', data: updatedLocation });
        } else {
          res.status(404).json({ status: 'error', message: 'Location not found' });
        }
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  });
  

module.exports = router;
