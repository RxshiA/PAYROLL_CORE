const Loan = require('../models/Loan')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all loans 
// @route GET /loans
// @access Private
const getAllLoans = asyncHandler(async (req, res) => {
    // Get all loans from MongoDB
    const loans = await Loan.find().lean()

    // If no loans 
    if (!loans?.length) {
        return res.status(400).json({ message: 'No loans found' })
    }

    // Add username to each loan before sending the response
    const loansWithUser = await Promise.all(loans.map(async (loan) => {
        const user = await User.findById(loan.user).lean().exec()
        return { ...loan, empid: user.empid }
    }))

    res.json(loansWithUser)
})

// @desc Create new loan
// @route POST /loans
// @access Private
const createNewLoan = asyncHandler(async (req, res) => {
    const { user, loantype, fullloan, interest } = req.body

    // Confirm data
    if (!user || !loantype || !fullloan || !interest) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const loan = await Loan.create({ user, loantype, fullloan, interest })

    if (loan) { // Created 
        return res.status(201).json({ message: 'New loan created' })
    } else {
        return res.status(400).json({ message: 'Invalid loan data received' })
    }

})

// @desc Update a loan
// @route PATCH /loans
// @access Private
const updateLoan = asyncHandler(async (req, res) => {
    const { id, user, loantype, fullloan, interest } = req.body

    // Confirm data
    if (!id || !user || !loantype || !fullloan || !interest) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm loan exists to update
    const loan = await Loan.findById(id).exec()

    if (!loan) {
        return res.status(400).json({ message: 'Loan not found' })
    }

    loan.user = user
    loan.loantype = loantype
    loan.fullloan = fullloan
    loan.interest = interest

    const updatedLoan = await loan.save()

    res.json(`'${updatedLoan.loantype}' updated`)
})

// @desc Delete a loan
// @route DELETE /loans
// @access Private
const deleteLoan = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Loan ID required' })
    }

    // Confirm loan exists to delete 
    const loan = await Loan.findById(id).exec()

    if (!loan) {
        return res.status(400).json({ message: 'Loan not found' })
    }

    const result = await loan.deleteOne()

    const reply = `Loan '${result.loantype}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllLoans,
    createNewLoan,
    updateLoan,
    deleteLoan
}