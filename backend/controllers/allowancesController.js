const Allowance = require('../models/Allowance')
const pdfTemplate = require('../models/allowanceReport')
const asyncHandler = require('express-async-handler')
const pdf = require('html-pdf')
const path = require('path')

// @desc Get all allowances 
// @route GET /allowances
// @access Private
const getAllAllowances = asyncHandler(async (req, res) => {
    // Get all allowances from MongoDB
    const allowances = await Allowance.find().lean()

    // If no allowances 
    if (!allowances?.length) {
        return res.status(400).json({ message: 'No allowances found' })
    }

    res.json(allowances)
})

// @desc Create new allowance
// @route POST /allowances
// @access Private
const createNewAllowance = asyncHandler(async (req, res) => {
    const { empid, fullname, department, type, allowancepay } = req.body

    // Confirm data
    if (!empid || !fullname ||!department || !type || !allowancepay) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const allowance = await Allowance.create({ empid, fullname, department, type, allowancepay })

    if (allowance) { // Created 
        return res.status(201).json({ message: 'New allowance created' })
    } else {
        return res.status(400).json({ message: 'Invalid allowance data received' })
    }

})

// @desc Update a allowance
// @route PATCH /allowances
// @access Private
const updateAllowance = asyncHandler(async (req, res) => {
    const { empid, fullname, department, type, allowancepay } = req.body

    // Confirm data
    if (!empid || !fullname ||!department || !type || !allowancepay) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm allowance exists to update
    const allowance = await Allowance.findById(req.params.id)

    if (!allowance) {
        return res.status(400).json({ message: 'Allowance not found' })
    }

    allowance.empid = empid
    allowance.fullname = fullname
    allowance.department = department
    allowance.type = type
    allowance.allowancepay = allowancepay

    const updatedAllowance = await allowance.save()

    res.json(`'${updatedAllowance.type}' updated`)
})

// @desc Delete a allowance
// @route DELETE /allowances
// @access Private
const deleteAllowance = asyncHandler(async (req, res) => {
    try {
        const allowance = await Allowance.findById(req.params.id)
        if (allowance) {
          await allowance.deleteOne()
          res.json({ message: 'allowance removed' })
        } else {
          res.status(404).json({ message: 'allowance not found' })
        }
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
})

// @desc Get a allowance
// @route GET /allowances
// @access Private
const getAllowance = asyncHandler(async (req, res) => {
    try{
        // Confirm allowance exists to delete
        const allowance = await Allowance.findById(req.params.id)
        res.json(allowance)
    } catch (error){
        res.status(500).json({ message: error.message })
    }  
})

// @desc Genarate a report
// @route GET /createPdf
// @access Private
const createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('allowancereport.pdf', (err) => {
      if (err) {
        console.log(err)
      }
      res.send('PDF generated')
    })
  }
  
const fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, '../../allowancereport.pdf'))
  }
  

module.exports = {
    getAllAllowances,
    createNewAllowance,
    updateAllowance,
    deleteAllowance,
    getAllowance,
    createPdf,
    fetchPdf
}