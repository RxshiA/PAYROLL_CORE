const express = require('express')
const router = express.Router()
const loansController = require('../controllers/loansController')

router.route('/')
    .get(loansController.getAllLoans)
    .post(loansController.createNewLoan)
    .patch(loansController.updateLoan)
    .delete(loansController.deleteLoan)

module.exports = router