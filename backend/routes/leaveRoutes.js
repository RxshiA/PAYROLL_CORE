const express = require('express')
const router = express.Router()
const leavesController = require('../controllers/leavesController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(leavesController.getAllLeaves)
    .post(leavesController.createNewLeave)
    .patch(leavesController.updateLeave)
    .delete(leavesController.deleteLeaves)

router.route('/:id')
    .get(leavesController.getALeave)
    .delete(leavesController.deleteLeaves)
    .patch(leavesController.updateLeave)

router.route('/createpdf')
    .post(leavesController.createPdf)

router.get('/fetchpdf')
    .get(leavesController.fetchPdf)

module.exports = router