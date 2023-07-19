const express = require('express')
const router = express.Router()
const taxesController = require('../controllers/taxesController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(taxesController.getAllTaxes)
    .post(taxesController.createNewTax)
    .patch(taxesController.updateTax)
    


router.route('/:id')
    .get(taxesController.getATax)
    .delete(taxesController.deleteTax)
    .patch(taxesController.updateTax)

module.exports = router