const Leave = require('../models/Leave')
const asyncHandler = require('express-async-handler')
const pdf = require('html-pdf')
const pdfTemplate = require('../models/leaveReport')
const path = require('path')

// @desc Get all leaves 
// @route GET /leaves
// @access Private
const getAllLeaves = asyncHandler(async (req, res) => {
    // Get all leaves from MongoDB
    const leaves = await Leave.find().lean()

    // If no leaves 
    if (!leaves?.length) {
        return res.status(400).json({ message: 'No leaves found' })
    }

    // Add username to each leave before sending the response
    // const leavesWithUser = await Promise.all(leaves.map(async (leave) => {
    //     const user = await User.findById(leave.user).lean().exec()
    //     return { ...leave, empid: user.empid }
    // }))

    res.json(leaves)
})

// @desc Create new leave
// @route POST /leaves
// @access Private
const createNewLeave = asyncHandler(async (req, res) => {
    const { empid,fullname,leaveid ,reason, type ,noOfDays,status} = req.body

    // Confirm data
    if ( !empid || !fullname|| !leaveid|| !reason|| !type|| !noOfDays|| !status) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const leave = await Leave.create({ empid,fullname,leaveid, reason,type,noOfDays,status})

    if (leave) { // Created 
        return res.status(201).json({ message: 'New leave created' })
    } else {
        return res.status(400).json({ message: 'Invalid leave data received' })
    }

})

// @desc Update a leave
// @route PATCH /leaves
// @access Private
const updateLeave = asyncHandler(async (req, res) => {
    const { empid, fullname, leaveid,reason, type ,noOfDays,status} = req.body

    // Confirm data
    if (!empid || !fullname|| !leaveid|| !reason|| !type|| !noOfDays|| !status) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm leave exists to update
    const leaves = await Leave.findById(req.params.id)

    if (!leaves) {
        return res.status(400).json({ message: 'Leave not found' })
    }

    
    leaves.empid = empid
    leaves.fullname = fullname
    leaves.leaveid = leaveid
    leaves.reason = reason
    leaves.type = type
    leaves.noOfDays = noOfDays
    leaves.status = status

    const updatedLeave = await leaves.save()

    res.json(`'${updatedLeave.reason}' updated`)
})

// @desc Delete a leave
// @route DELETE /leaves
// @access Private
async function deleteLeaves (req, res) {
  try {
    const leave = await Leave.findById(req.params.id)
    console.log(leave)
    if (leave) {
      await leave.deleteOne()
      res.json({ message: 'Leave Request removed' })
    } else {
      res.status(404).json({ message: 'Leave Request  not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


async function getALeave (req, res) {

    try {
      const leaves = await Leave.findById(req.params.id)
      
      res.json(leaves)
      
    } catch (error) {
      res.status(500).json({ message: error.message })
     
    }

  }

// @desc Genarate a report
// @route GET /createPdf
// @access Private
const createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('leavereport.pdf', (err) => {
      if (err) {
        console.log(err)
      }
      res.send('PDF generated')
    })
}
  
const fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, '../../leavereport.pdf'))
}

module.exports = {
    getAllLeaves,
    createNewLeave,
    updateLeave,
    deleteLeaves,
    getALeave,
    createPdf,
    fetchPdf
}