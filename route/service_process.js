const express = require('express');
const router = express.Router();
const service_area_details = require('../model/service_area_details');
const { body, validationResult } = require('express-validator');

// Get all service: GET "/service"

router.get('/get', async (req, res) => {
  try {
    const service = await service_area_details.find({}, {});
    // res.send(service);
    res.status(200).json({ status: 'sucess', mssg: 'service details fetch', serviceList: service });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get specific company_details:Get "/service"
router.get('/get/:id', async (req, res) => {
  try {
    const service = await service_area_details.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'service details not found' });
    }
    res.status(200).json({ status: 'success', message: 'service details fetched', serviceList: service });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Create a service: POST "/service"
router.post('/create', [
  body('service_name').notEmpty().withMessage('Service Name is required!'),
  body('active').notEmpty().withMessage('Active is required!')
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
} else {
    try {
      const {
        service_name,
        area
      } = req.body;

      const newService = await service_area_details.create({
        service_name: service_name,
        area: area
      });

      res.status(200).json({ status: 'success', message: 'Service created successfully', data: newService });

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'server error', message: 'Internal Server Error' });
    }
  }
});

// Delete a service by ID: DELETE "/service"
// router.delete('/:id', async (req, res)
router.post('/delete/:id', async (req, res) => {
    try {
      const serviceId = req.params.id;
      const result = await service_area_details.findByIdAndDelete(serviceId);
      if (result) {
        res.send('service deleted successfully');
      } else {
        res.status(404).send('service not found');
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

// Update a service by ID: PATCH "/service"
// router.patch('/:id', async (req, res) => {
// router.patch('/', async (req, res) => {
  router.patch('/update', [
    body('id').notEmpty().withMessage('Service ID is required!'),
    body('updateData').notEmpty().withMessage('Update data is required!')
  ], async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
  } else {
      try {
        const { id, updateData } = req.body;
  
        const updatedService = await service_area_details.findByIdAndUpdate(id, updateData, { new: true });
  
        if (updatedService) {
          res.status(200).json({ status: 'success', message: 'Service updated successfully', data: updatedService });
        } else {
          res.status(404).json({ status: 'error', message: 'Service ID not found' });
        }
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  });
  

module.exports = router;