const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const User = require("../models/User");
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/:id')
    .get(usersController.getUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/createpdf')
    .post(usersController.createPdf)

router.get('/fetchpdf')
    .get(usersController.fetchPdf)

//Checking whether the employee exist using empId
router.get("/find/:empId", async (req, res) => {
    try {
        const empId = req.params.empId;
        console.log(empId + "empId - userRoutes");
        const employee = await User.findOne({ empid: empId }).exec();

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res
            .status(200)
            .json({ message: "Employee found", empId: employee._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router