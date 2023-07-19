const express = require('express')
const router = express.Router()
const programsController = require('../controllers/programsController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(programsController.getAllPrograms)
    .post(programsController.createNewProgram)
    .patch(programsController.updateProgram)
    .delete(programsController.deleteProgram)

module.exports = router