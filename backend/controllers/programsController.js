const Program = require('../models/Program')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all programs 
// @route GET /programs
// @access Private
const getAllPrograms = asyncHandler(async (req, res) => {
    // Get all programs from MongoDB
    const programs = await Program.find().lean()

    // If no programs 
    if (!programs?.length) {
        return res.status(400).json({ message: 'No programs found' })
    }

    // Add username to each program before sending the response
    const programsWithUser = await Promise.all(programs.map(async (program) => {
        const user = await User.findById(program.user).lean().exec()
        return { ...program, empid: user.empid }
    }))

    res.json(programsWithUser)
})

// @desc Create new program
// @route POST /programs
// @access Private
const createNewProgram = asyncHandler(async (req, res) => {
    const { user, programName, description, duration, startingDate, closingDate } = req.body

    // Confirm data
    if (!user || !programName || !description || !duration || !startingDate || !closingDate) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const program = await Program.create({ user, programName, description, duration, startingDate, closingDate })

    if (program) { // Created 
        return res.status(201).json({ message: 'New program created' })
    } else {
        return res.status(400).json({ message: 'Invalid program data received' })
    }

})

// @desc Update a program
// @route PATCH /programs
// @access Private
const updateProgram = asyncHandler(async (req, res) => {
    const { id, user, programName, description, duration, startingDate, closingDate } = req.body

    // Confirm data
    if (!id || !user || !programName || !description || !duration || !startingDate || !closingDate) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm program exists to update
    const program = await Program.findById(id).exec()

    if (!program) {
        return res.status(400).json({ message: 'Program not found' })
    }

    program.user = user
    program.programName = programName
    program.description = description
    program.duration = duration
    program.startingDate = startingDate
    program.closingDate = closingDate

    const updatedProgram = await program.save()

    res.json(`'${updatedProgram.programName}' updated`)
})

// @desc Delete a program
// @route DELETE /programs
// @access Private
const deleteProgram = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Program ID required' })
    }

    // Confirm program exists to delete 
    const program = await Program.findById(id).exec()

    if (!program) {
        return res.status(400).json({ message: 'Program not found' })
    }

    const result = await program.deleteOne()

    const reply = `Program '${result.programName}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllPrograms,
    createNewProgram,
    updateProgram,
    deleteProgram
}