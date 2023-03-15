const User = require('../models/User')
const Tax = require('../models/Tax')
const Allowance = require('../models/Allowance')
const Leave = require('../models/Leave')
const Salary = require('../models/Salary')
const Loan = require('../models/Loan')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { empid, password, fullname, department, roles, joinedDate } = req.body

    // Confirm data
    if (!empid || !password || !Array.isArray(roles) || !roles.length || !fullname || !department || !joinedDate) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate empid
    const duplicate = await User.findOne({ empid }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate empid' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { empid, "password": hashedPwd, fullname, department, roles, joinedDate }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${empid} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, empid, fullname, roles, active, department, joinedDate, password } = req.body

    // Confirm data 
    if (!id || !empid || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean' || !fullname || !department || !joinedDate) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ empid }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate empid' })
    }

    user.empid = empid
    user.roles = roles
    user.active = active
    user.department = department
    user.fullname = fullname
    user.joinedDate = joinedDate

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.empid} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const allowance = await Allowance.findOne({ user: id }).lean().exec()
    const leave = await Leave.findOne({ user: id }).lean().exec()
    const tax = await Tax.findOne({ user: id }).lean().exec()
    const salary = await Salary.findOne({ user: id }).lean().exec()
    const loan = await Loan.findOne({ user: id }).lean().exec()

    if (salary || tax || leave || allowance || loan) {
        return res.status(400).json({ message: 'User has assigned data regarding Salary' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.empid} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}