const UserTax = require('../models/UserTax')
const User = require('../models/User')
const Tax = require('../models/Tax')
const asyncHandler = require('express-async-handler')
const pdf = require('html-pdf')
const path = require('path')
const pdfTemplate=require('../models/taxReports')

// @desc Get all userTaxs 
// @route GET /userTaxs
// @access Private
const getAllUserTaxes = asyncHandler(async (req, res) => {
    // Get all userTaxs from MongoDB
    const userTaxs = await UserTax.find().lean()

    // If no userTaxs 
    if (!userTaxs?.length) {
        return res.status(400).json({ message: 'No userTaxs found' })
    }


    res.json(userTaxs)
})

// @desc Create new userTax
// @route POST /userTaxs
// @access Private
const createNewUserTax = asyncHandler(async (req, res) => {
    const { empid, taxtype, taxAmount ,date,fullname,department} = req.body

    // Confirm data
    if (!empid || !taxtype || !taxAmount) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const userTax = await UserTax.create({ empid, taxtype, taxAmount ,date,fullname,department})

    if (userTax) { // Created 
        return res.status(201).json({ message: 'New userTax created' })
    } else {
        return res.status(400).json({ message: 'Invalid userTax data received' })
    }

})

// @desc Update a userTax
// @route PATCH /userTaxs
// @access Private
const updateUserTax = asyncHandler(async (req, res) => {
    const { id, user, tax, taxAmount } = req.body

    // Confirm data
    if (!id || !user || !tax || !taxAmount) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm userTax exists to update
    const userTax = await UserTax.findById(id).exec()

    if (!userTax) {
        return res.status(400).json({ message: 'UserTax not found' })
    }

    userTax.user = user
    userTax.tax = tax
    userTax.taxAmount = taxAmount

    const updatedUserTax = await userTax.save()

    res.json(`'${updatedUserTax.tax}' updated`)
})

// @desc Delete a userTax
// @route DELETE /userTaxs
// @access Private
const deleteUserTax = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'UserTax ID required' })
    }

    // Confirm userTax exists to delete 
    const userTax = await UserTax.findById(id).exec()

    if (!userTax) {
        return res.status(400).json({ message: 'UserTax not found' })
    }

    const result = await userTax.deleteOne()

    const reply = `UserTax '${result.tax}' with ID ${result._id} deleted`

    res.json(reply)
})

// @desc get a userTax
// @route get /userTaxs
// @access Private
const getUserTax = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'UserTax ID required' })
    }
    
    const userTax = await UserTax.findById(req.params.id)

    if (!userTax) {
        return res.status(400).json({ message: 'UserTax not found' })
    }

    res.json(userTax)
})


const createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('tax.pdf', (err) => {
      if (err) {
        console.log(err)
      }
      res.send('PDF generated')
    })
  }
  
const fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, '../../tax.pdf'))
  }

module.exports = {
    getAllUserTaxes,
    createNewUserTax,
    updateUserTax,
    deleteUserTax,
    getUserTax,
    createPdf,
    fetchPdf
}