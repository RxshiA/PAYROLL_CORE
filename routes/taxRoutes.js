const express = require('express')
const router = express.Router()
const taxesController = require('../controllers/taxesController')

router.route('/')
    .get(taxesController.getAllTaxes)
    .post(taxesController.createNewTax)
    .patch(taxesController.updateTax)
    .delete(taxesController.deleteTax)

module.exports = router