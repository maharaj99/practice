const express = require('express');
const router = express.Router();
const CompanyDetails = require('../model/company_details');
const { body, validationResult } = require('express-validator');

// Get all company_details: GET "/companydetails"
router.get('/get', async (req, res) => {
  try {
    const compdetails = await CompanyDetails.find({}, {__v: 0});
    // res.send(compdetails);
    res.status(200).json({ status: 'sucess', mssg: 'company details fetch', companyList: compdetails });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get specific company_details:Get "/companydetails"
router.post('/get', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ status: 'error', message: 'ID is required' });
    }

    const compdetails = await CompanyDetails.findById(id);
    if (!compdetails) {
      return res.status(404).json({ status: 'error', message: 'Company details not found' });
    }

    res.status(200).json({ status: 'success', message: 'Company details fetched', company: compdetails });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
});



// Create a company_details: POST "/companydetails"
router.post('/create', [
  body('company_name')
  .notEmpty().withMessage('Company Name is required!')
  .isLength({ min: 2 }).withMessage('Company Name should be at least 2 characters long'),

  body('ph_num').notEmpty().withMessage('Phone Number is required!')
    .isMobilePhone().withMessage('Enter a valid Phone Number!')
    .isLength({ min: 10, max: 10 }).withMessage('Phone Number should be 10 digits!'),
    
  body('logo').notEmpty().withMessage('Logo is required!'),
  body('banner').notEmpty().withMessage('Banner is required!'),
  body('active').notEmpty().withMessage('Active is required!')
    .isIn(['Yes', 'No']).withMessage('Active contains an invalid value!')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
}
  else {
    try {
      const {
        company_name,
        ph_num,
        logo,
        banner,
        active
      } = req.body;

      let company = await CompanyDetails.findOne({ company_name: company_name });
      if (company) {
        return res.status(400).json({ status: 'data exist', field: 'company_name', message: 'Company Name already exists' });
      }

      company = await CompanyDetails.findOne({ ph_num: ph_num });
      if (company) {
        return res.status(400).json({ status: 'data exist', field: 'ph_num', message: 'Phone Number already exists' });
      }

      await CompanyDetails.create({
        company_name: company_name,
        ph_num: ph_num,
        logo: logo,
        banner: banner,
        active: active
      });

      res.status(200).json({ status: 'success', message: 'Company Details Saved Successfully' });

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'server error', message: 'Server Error' });
    }
  }
});

// Delete a company_details by ID: DELETE "/companydetails/:id"
router.post('/delete', async (req, res) => {
  try {
    const compdetailsId = req.body.id;
    if (!compdetailsId) {
      return res.status(400).json({ status: 'error', message: 'ID is required' });
    } 

    const result = await CompanyDetails.findByIdAndDelete(compdetailsId);
    if (result) {
      res.send('Company details deleted successfully');
    } else {
      res.status(404).send('Company details not found');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Failed to delete company details. Please try again.');
  }
});

// Update a company_details by ID: PATCH "/companydetails/:id"
router.post ('/update', [
  body('id').notEmpty().withMessage('company ID is required!'),
  body('company_name')
  .notEmpty().withMessage('Company Name is required!')
  .isLength({ min: 2 }).withMessage('Company Name should be at least 2 characters long'),

  body('ph_num')
    .notEmpty().withMessage('Phone Number is required!')
    .isMobilePhone().withMessage('Enter a valid Phone Number!')
    .isLength({ min: 10, max: 10 }).withMessage('Phone Number should be 10 digits!'),
  body('logo').notEmpty().withMessage('Logo is required!'),
  body('banner').notEmpty().withMessage('Banner is required!'),
  body('active').notEmpty().withMessage('Active is required!')
    .isIn(['Yes', 'No']).withMessage('Active contains an invalid value!')
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    return res.status(400).json({ status: 'validation error', field: errorsArray[0]['path'], mssg: errorsArray[0]['msg'], });
} else {
    try {
      const compdetailsId = req.body.id;
      const {
        company_name,
        ph_num,
        logo,
        banner,
        active
      } = req.body;

      let company = await CompanyDetails.findOne({ _id: { $ne: compdetailsId }, company_name: company_name });
      if (company) {
        return res.status(400).json({ status: 'data exist', field: 'company_name', message: 'Company Name already exists' });
      }

      company = await CompanyDetails.findOne({ _id: { $ne: compdetailsId }, ph_num: ph_num });
      if (company) {
        return res.status(400).json({ status: 'data exist', field: 'ph_num', message: 'Phone Number already exists' });
      }

      const updatedData = {
        company_name: company_name,
        ph_num: ph_num,
        logo: logo,
        banner: banner,
        active: active
      };

      const result = await CompanyDetails.findByIdAndUpdate(compdetailsId, updatedData, { new: true });

      if (result) {
        res.send('Company details updated successfully');
      } else {
        res.status(404).send('Company details not found');
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Failed to update company details. Please try again.');
    }
  }
});

module.exports = router;
