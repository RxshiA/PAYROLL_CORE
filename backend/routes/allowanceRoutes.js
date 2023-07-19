const express = require('express')
const router = express.Router()
const allowancesController = require('../controllers/allowancesController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(allowancesController.getAllAllowances)
    .post(allowancesController.createNewAllowance)
    .patch(allowancesController.updateAllowance)

router.route('/:id')
    .get(allowancesController.getAllowance)
    .patch(allowancesController.updateAllowance)
    .delete(allowancesController.deleteAllowance)

router.route('/createpdf')
    .post(allowancesController.createPdf)

router.get('/fetchpdf')
    .get(allowancesController.fetchPdf)
    

module.exports = router