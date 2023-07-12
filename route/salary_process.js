const express = require('express');
const router = express.Router();
const salary_range = require('../model/salary_range');
const { body, validationResult } = require('express-validator');

// Get all salary: GET "/salary"

router.get('/get', async (req, res) => {
  try {
    const salary = await salary_range.find({}, {});
    res.status(200).json({ status: 'sucess', mssg: 'salary details fetch', salaryList: salary });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get specific company_details:Get "/salary"
router.get('/get/:id', async (req, res) => {
  try {
    const salary_range = await salary_range.findById(req.params.id);
    if (!salary_range) {
      return res.status(404).json({ status: 'error', message: 'salary_range details not found' });
    }
    res.status(200).json({ status: 'success', message: 'salary_range details fetched', salary_rangeList: salary_range });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Create a salary: POST "/salary"
router.post('/create', [
  body('min').notEmpty().withMessage('Minimum salary is required!').isInt({ min: 0 }).withMessage('Minimum salary should be a non-negative integer!'),
  body('max').notEmpty().withMessage('Maximum salary is required!').isInt({ min: 0 }).withMessage('Maximum salary should be a non-negative integer!'),
  body('active').notEmpty().withMessage('Active is required!')

], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
} else {
    try {
      const { min, max } = req.body;

      const newSalary = await salary_range.create({
        min: min,
        max: max
      });

      res.status(200).json({ status: 'success', message: 'Salary range created successfully', data: newSalary });

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'server error', message: 'Internal Server Error' });
    }
  }
});


// Delete a salary by ID: DELETE "/salary"
// router.delete('/:id', async (req, res)
router.post('/delete/:id', async (req, res) => {
    try {
      const salaryId = req.params.id;
      const result = await salary_range.findByIdAndDelete(salaryId);
      if (result) {
        res.send('salary deleted successfully');
      } else {
        res.status(404).send('experience not found');
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

// Update a salary by ID: PATCH "/salary"
// router.patch('/:id', async (req, res) => {
// router.patch('/', async (req, res) => {
  router.patch('/update', [
    body('id').notEmpty().withMessage('Salary ID is required!'),
    body('updateData').notEmpty().withMessage('Update data is required!')
  ], async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
  } else {
      try {
        const { id, updateData } = req.body;
  
        const updatedSalary = await salary_range.findByIdAndUpdate(id, updateData, { new: true });
  
        if (updatedSalary) {
          res.status(200).json({ status: 'success', message: 'Salary updated successfully', data: updatedSalary });
        } else {
          res.status(404).json({ status: 'error', message: 'Salary ID not found' });
        }
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
  });
  
  module.exports = router;
