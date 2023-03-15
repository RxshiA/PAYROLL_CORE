const express = require('express')
const router = express.Router()
const salariesController = require('../controllers/salariesController')

router.route('/')
    .get(salariesController.getAllSalaries)
    .post(salariesController.createNewSalary)
    .patch(salariesController.updateSalary)
    .delete(salariesController.deleteSalary)

module.exports = router