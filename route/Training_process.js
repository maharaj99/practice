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


// Create a new training: POST "/trainings"
// router.post('/create', async (req, res) => {
//   try {
//     const newTraining = req.body; // Assuming the request body contains the new training data
//     const createdTraining = await trainings_service.create(newTraining);
//     res.status(201).json({ status: 'success', message: 'Training created successfully', training: createdTraining });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send('Internal Server Error');
//   }
// });


module.exports = router;