const Allowance = require('../models/Allowance')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

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

    // Add username to each allowance before sending the response
    const allowancesWithUser = await Promise.all(allowances.map(async (allowance) => {
        const user = await User.findById(allowance.user).lean().exec()
        return { ...allowance, empid: user.empid }
    }))

    res.json(allowancesWithUser)
})

// @desc Create new allowance
// @route POST /allowances
// @access Private
const createNewAllowance = asyncHandler(async (req, res) => {
    const { user, type, allowancepay } = req.body

    // Confirm data
    if (!user || !type || !allowancepay) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const allowance = await Allowance.create({ user, type, allowancepay })

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
    const { id, user, type, allowancepay } = req.body

    // Confirm data
    if (!id || !user || !type || !allowancepay) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm allowance exists to update
    const allowance = await Allowance.findById(id).exec()

    if (!allowance) {
        return res.status(400).json({ message: 'Allowance not found' })
    }

    allowance.user = user
    allowance.type = type
    allowance.allowancepay = allowancepay

    const updatedAllowance = await allowance.save()

    res.json(`'${updatedAllowance.type}' updated`)
})

// @desc Delete a allowance
// @route DELETE /allowances
// @access Private
const deleteAllowance = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Allowance ID required' })
    }

    // Confirm allowance exists to delete 
    const allowance = await Allowance.findById(id).exec()

    if (!allowance) {
        return res.status(400).json({ message: 'Allowance not found' })
    }

    const result = await allowance.deleteOne()

    const reply = `Allowance '${result.type}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllAllowances,
    createNewAllowance,
    updateAllowance,
    deleteAllowance
}