const express = require('express');
const trainings_service = require('../model/trainings');

const router = express.Router();

// Get all technology: GET "/trainings"
router.get('/get', async (req, res) => {
  try {
    const trainings = await trainings_service.find({}, {});
    // res.send(compdetails);
    res.status(200).json({ status: 'sucess', mssg: 'trainings details fetch', trainingsList: trainings });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get specific company_details:Get "/trainings"
router.get('/get/:id', async (req, res) => {
  try {
    const trainings = await trainings_service.findById(req.params.id);
    if (!trainings) {
      return res.status(404).json({ status: 'error', message: 'Company details not found' });
    }
    res.status(200).json({ status: 'success', message: 'trainings fetched', trainingsList: trainings });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;