const User = require('../models/User')
const Tax = require('../models/Tax')
const asyncHandler = require('express-async-handler')
const { getUserTax } = require('./usertaxesController')

// @desc Get all taxes 
// @route GET /taxes
// @access Private
const getAllTaxes = asyncHandler(async (req, res) => {
    // Get all taxes from MongoDB
    const taxes = await Tax.find().lean()

    // If no taxes 
    if (!taxes?.length) {
        return res.status(400).json({ message: 'No taxes found' })
    }


    res.json(taxes)

})

// @desc Create new tax
// @route POST /taxes
// @access Private
const createNewTax = asyncHandler(async (req, res) => {
    const { taxtype, taxpay } = req.body

    // Confirm data
    if (!taxtype || !taxpay) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const tax = await Tax.create({ taxtype, taxpay })

    if (tax) { // Created 
        return res.status(201).json({ message: 'New tax created' })
    } else {
        return res.status(400).json({ message: 'Invalid tax data received' })
    }

})

// @desc Update a tax
// @route PATCH /taxes
// @access Private
const updateTax = asyncHandler(async (req, res) => {
    const {taxtype, taxpay } = req.body

    // Confirm data
    if (!taxtype || !taxpay) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm tax exists to update
    const tax = await Tax.findById(req.params.id)

    if (!tax) {
        return res.status(400).json({ message: 'Tax not found' })
    }

    tax.taxtype = taxtype
    tax.taxpay = taxpay

    const updatedTax = await tax.save()

    res.json(`'${updatedTax.taxtype}' updated`)
})



async function deleteTax (req, res) {
    try {
      const tax = await Tax.findById(req.params.id)
      if (tax) {
        await tax.deleteOne()
        res.json({ message: 'tax removed' })
      } else {
        res.status(404).json({ message: 'tax not found' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }


async function getATax (req, res) {

    try {
      const tax = await Tax.findById(req.params.id)
      
      res.json(tax)
      
    } catch (error) {
      res.status(500).json({ message: error.message })
     
    }

  }

module.exports = {
    getAllTaxes,
    createNewTax,
    updateTax,
    deleteTax,
    getATax
}