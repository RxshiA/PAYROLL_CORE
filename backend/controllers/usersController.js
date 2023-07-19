const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const pdf = require('html-pdf')
const path = require('path')
const pdfTemplate = require('../models/userReport')


// @desc Get all user
// @route GET /user
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {

    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no user
    if (!users?.length) {
        return res.status(400).json({ message: 'No user found' })
    }

    res.json(users)
})


// @desc Create new user
// @route POST /user
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { empid, password, fullname, department, joinedDate, roles } = req.body

    // Confirm data
    if (!empid || !password || !fullname || !department || !joinedDate || !roles) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate empid
    const duplicate = await User.findOne({ empid }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate empid' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { empid, "password": hashedPwd, fullname, department, roles, joinedDate }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${empid} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /userTaxes
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { empid, fullname, roles, department, joinedDate, password } = req.body

    // Confirm data 
    if (!empid || !roles || !fullname || !department || !joinedDate) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(req.params.id)
   
    console.log(user)

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    user.empid = empid
    user.roles = roles
    user.department = department
    user.fullname = fullname
    user.joinedDate = joinedDate

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }
    console.log(user)

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.empid} updated` })
})

// @desc Delete a user
// @route DELETE /userTaxes
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
          await user.deleteOne()
          res.json({ message: 'user removed' })
        } else {
          res.status(404).json({ message: 'user not found' })
        }
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
})

// @desc Delete a user
// @route DELETE /userTaxes
// @access Private
const getUser = asyncHandler(async (req, res) => {
    try{
        // Confirm user exists to delete
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error){
        res.status(500).json({ message: error.message })
    } 
})

// @desc Genarate a report
// @route GET /createPdf
// @access Private
const createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('userreport.pdf', (err) => {
      if (err) {
        console.log(err)
      }
      res.send('PDF generated')
    })
  }
  
const fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, '../../userreport.pdf'))
  }

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser,
    createPdf,
    fetchPdf
}