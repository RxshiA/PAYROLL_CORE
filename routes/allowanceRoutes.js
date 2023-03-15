const express = require('express')
const router = express.Router()
const allowancesController = require('../controllers/allowancesController')

router.route('/')
    .get(allowancesController.getAllAllowances)
    .post(allowancesController.createNewAllowance)
    .patch(allowancesController.updateAllowance)
    .delete(allowancesController.deleteAllowance)

module.exports = router