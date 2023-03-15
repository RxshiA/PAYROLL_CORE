const express = require('express')
const router = express.Router()
const leavesController = require('../controllers/leavesController')

router.route('/')
    .get(leavesController.getAllLeaves)
    .post(leavesController.createNewLeave)
    .patch(leavesController.updateLeave)
    .delete(leavesController.deleteLeave)

module.exports = router