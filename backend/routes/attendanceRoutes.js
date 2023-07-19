const express = require('express')
const router = express.Router()
const attendancesController = require('../controllers/attendancesController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(attendancesController.getAllAttendances)
    .post(attendancesController.createNewAttendance)
    .patch(attendancesController.updateAttendance)
    .delete(attendancesController.deleteAttendance)

router.route('/:id')
    .get(attendancesController.getAAttendance)
    .delete(attendancesController.deleteAttendance)
    .patch(attendancesController.updateAttendance)

router.route('/createpdf')
    .post(attendancesController.createPdf)

router.get('/fetchpdf')
    .get(attendancesController.fetchPdf)

module.exports = router