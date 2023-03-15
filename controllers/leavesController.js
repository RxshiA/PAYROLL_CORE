const Leave = require('../models/Leave')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all leaves 
// @route GET /leaves
// @access Private
const getAllLeaves = asyncHandler(async (req, res) => {
    // Get all leaves from MongoDB
    const leaves = await Leave.find().lean()

    // If no leaves 
    if (!leaves?.length) {
        return res.status(400).json({ message: 'No leaves found' })
    }

    // Add username to each leave before sending the response
    const leavesWithUser = await Promise.all(leaves.map(async (leave) => {
        const user = await User.findById(leave.user).lean().exec()
        return { ...leave, empid: user.empid }
    }))

    res.json(leavesWithUser)
})

// @desc Create new leave
// @route POST /leaves
// @access Private
const createNewLeave = asyncHandler(async (req, res) => {
    const { user, reason, date } = req.body

    // Confirm data
    if (!user || !reason || !date) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const leave = await Leave.create({ user, reason, date })

    if (leave) { // Created 
        return res.status(201).json({ message: 'New leave created' })
    } else {
        return res.status(400).json({ message: 'Invalid leave data received' })
    }

})

// @desc Update a leave
// @route PATCH /leaves
// @access Private
const updateLeave = asyncHandler(async (req, res) => {
    const { id, user, reason, date } = req.body

    // Confirm data
    if (!id || !user || !reason || !date) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm leave exists to update
    const leave = await Leave.findById(id).exec()

    if (!leave) {
        return res.status(400).json({ message: 'Leave not found' })
    }

    leave.user = user
    leave.reason = reason
    leave.date = date

    const updatedLeave = await tax.save()

    res.json(`'${updatedLeave.reason}' updated`)
})

// @desc Delete a leave
// @route DELETE /leaves
// @access Private
const deleteLeave = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Leave ID required' })
    }

    // Confirm leave exists to delete 
    const leave = await Leave.findById(id).exec()

    if (!leave) {
        return res.status(400).json({ message: 'Leave not found' })
    }

    const result = await Leave.deleteOne()

    const reply = `Leave '${result.reason}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllLeaves,
    createNewLeave,
    updateLeave,
    deleteLeave
}