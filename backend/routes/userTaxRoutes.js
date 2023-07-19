const express = require('express')
const router = express.Router()
const usertaxesController = require('../controllers/usertaxesController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(usertaxesController.getAllUserTaxes)
    .post(usertaxesController.createNewUserTax)
    .patch(usertaxesController.updateUserTax)
    .delete(usertaxesController.deleteUserTax)


router.route('/:id')
    .get(usertaxesController.getUserTax)

router.route('/createpdf')
    .post(usertaxesController.createPdf)

router.get('/fetchpdf')
    .get(usertaxesController.fetchPdf)

module.exports = router