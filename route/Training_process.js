const express = require('express');
const trainings_service = require('../model/trainings');

const router = express.Router();

// Get all technology: GET "/trainings"
router.get('/get', async (req, res) => {
  try {
    const trainings = await trainings_service.find({}, {__v: 0});
    // res.send(compdetails);
    res.status(200).json({ status: 'sucess', mssg: 'trainings details fetch', trainingsList: trainings });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get specific company_details:Get "/trainings"
router.get('/get', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ status: 'error', message: 'ID is required' });
    }

    const trainings = await trainings_service.findById(id);
    if (!trainings) {
      return res.status(404).json({ status: 'error', message: 'trainings details not found' });
    }

    res.status(200).json({ status: 'success', message: 'trainings details fetched', trainingsList: trainings });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;