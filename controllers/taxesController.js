const Tax = require('../models/Tax')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

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

    // Add username to each tax before sending the response
    const taxesWithUser = await Promise.all(taxes.map(async (tax) => {
        const user = await User.findById(tax.user).lean().exec()
        return { ...tax, empid: user.empid }
    }))

    res.json(taxesWithUser)
})

// @desc Create new tax
// @route POST /taxes
// @access Private
const createNewTax = asyncHandler(async (req, res) => {
    const { user, taxtype, taxpay } = req.body

    // Confirm data
    if (!user || !taxtype || !taxpay) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const tax = await Tax.create({ user, taxtype, taxpay })

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
    const { id, user, taxtype, taxpay } = req.body

    // Confirm data
    if (!id || !user || !taxtype || !taxpay) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm tax exists to update
    const tax = await Tax.findById(id).exec()

    if (!tax) {
        return res.status(400).json({ message: 'Tax not found' })
    }

    tax.user = user
    tax.taxtype = taxtype
    tax.taxpay = taxpay

    const updatedTax = await tax.save()

    res.json(`'${updatedTax.taxtype}' updated`)
})

// @desc Delete a tax
// @route DELETE /taxes
// @access Private
const deleteTax = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Tax ID required' })
    }

    // Confirm tax exists to delete 
    const tax = await Tax.findById(id).exec()

    if (!tax) {
        return res.status(400).json({ message: 'Tax not found' })
    }

    const result = await tax.deleteOne()

    const reply = `Tax '${result.type}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllTaxes,
    createNewTax,
    updateTax,
    deleteTax
}