const Salary = require('../models/Salary')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all salaries 
// @route GET /salaries
// @access Private
const getAllSalaries = asyncHandler(async (req, res) => {
    // Get all salaries from MongoDB
    const salaries = await Salary.find().lean()

    // If no salaries 
    if (!salaries?.length) {
        return res.status(400).json({ message: 'No salaries found' })
    }

    // Add username to each salary before sending the response
    const salariesWithUser = await Promise.all(salaries.map(async (salary) => {
        const user = await User.findById(salary.user).lean().exec()
        return { ...salary, empid: user.empid }
    }))

    res.json(salariesWithUser)
})

// @desc Create new salary
// @route POST /salaries
// @access Private
const createNewSalary = asyncHandler(async (req, res) => {
    const { user, basicsal } = req.body

    // Confirm data
    if (!user || !basicsal) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const salary = await Salary.create({ user, basicsal })

    if (salary) { // Created 
        return res.status(201).json({ message: 'New salary created' })
    } else {
        return res.status(400).json({ message: 'Invalid salary data received' })
    }

})

// @desc Update a salary
// @route PATCH /salaries
// @access Private
const updateSalary = asyncHandler(async (req, res) => {
    const { id, user, basicsal } = req.body

    // Confirm data
    if (!id || !user || !basicsal) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm salary exists to update
    const salary = await Salary.findById(id).exec()

    if (!salary) {
        return res.status(400).json({ message: 'Salary not found' })
    }

    salary.user = user
    salary.basicsal = basicsal

    const updatedSalary = await salary.save()

    res.json(`'${updatedSalary.basicsal}' updated`)
})

// @desc Delete a salary
// @route DELETE /salaries
// @access Private
const deleteSalary = asyncHandler(async (req, res) => {
    const  id  = req.params.id

    console.log("dkfjkjdjf")

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Salary ID required' })
    }

    // Confirm salary exists to delete 
    const salary = await Salary.findById(id).exec()

    if (!salary) {
        return res.status(400).json({ message: 'Salary not found' })
    }

    const result = await salary.deleteOne()

    const reply = `Salary '${result.type}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllSalaries,
    createNewSalary,
    updateSalary,
    deleteSalary
}