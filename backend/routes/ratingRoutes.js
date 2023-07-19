const express = require('express')
const router = express.Router()
const ratingsController = require('../controllers/ratingsController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(ratingsController.getAllRatings)
    .post(ratingsController.createNewRating)
    .patch(ratingsController.updateRating)
    .delete(ratingsController.deleteRating)

module.exports = router