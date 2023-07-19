const express = require('express')
const router = express.Router()
const loansController = require('../controllers/loansController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(loansController.getAllLoans)
    .post(loansController.createNewLoan)
    .patch(loansController.updateLoan)
    


router.route('/:id')
    .get(loansController.getALoan)
    .delete(loansController.deleteLoan)
    .patch(loansController.updateLoan)

router.route('/createpdf')
    .post(loansController.createPdf)

router.get('/fetchpdf')
    .get(loansController.fetchPdf)    


module.exports = router