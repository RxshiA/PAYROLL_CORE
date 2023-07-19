const Rating = require('../models/Rating')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all ratings 
// @route GET /ratings
// @access Private
const getAllRatings = asyncHandler(async (req, res) => {
    // Get all ratings from MongoDB
    const ratings = await Rating.find().lean()

    // If no ratings 
    if (!ratings?.length) {
        return res.status(400).json({ message: 'No ratings found' })
    }

    // Add username to each rating before sending the response
    const ratingsWithUser = await Promise.all(ratings.map(async (rating) => {
        const user = await User.findById(rating.user).lean().exec()
        return { ...rating, empid: user.empid }
    }))

    res.json(ratingsWithUser)
})

// @desc Create new rating
// @route POST /ratings
// @access Private
const createNewRating = asyncHandler(async (req, res) => {
    const { user, ratingsRate, remark } = req.body

    // Confirm data
    if (!user || !ratingsRate || !remark) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const rating = await Rating.create({ user, ratingsRate, remark })

    if (rating) { // Created 
        return res.status(201).json({ message: 'New rating created' })
    } else {
        return res.status(400).json({ message: 'Invalid rating data received' })
    }

})

// @desc Update a rating
// @route PATCH /ratings
// @access Private
const updateRating = asyncHandler(async (req, res) => {
    const { id, user, ratingsRate, remark } = req.body

    // Confirm data
    if (!id || !user || !ratingsRate || !remark) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm rating exists to update
    const rating = await Rating.findById(id).exec()

    if (!rating) {
        return res.status(400).json({ message: 'Rating not found' })
    }

    rating.user = user
    rating.ratingsRate = ratingsRate
    rating.remark = remark

    const updatedRating = await rating.save()

    res.json(`'${updatedRating.ratingsRate}' updated`)
})

// @desc Delete a rating
// @route DELETE /ratings
// @access Private
const deleteRating = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Rating ID required' })
    }

    // Confirm rating exists to delete 
    const rating = await Rating.findById(id).exec()

    if (!rating) {
        return res.status(400).json({ message: 'Rating not found' })
    }

    const result = await rating.deleteOne()

    const reply = `Rating '${result.ratingsRate}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllRatings,
    createNewRating,
    updateRating,
    deleteRating
}