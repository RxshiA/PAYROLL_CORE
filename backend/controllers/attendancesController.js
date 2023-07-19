const Attendance = require('../models/Attendance')
const asyncHandler = require('express-async-handler')
const pdf = require('html-pdf')
const pdfTemplate = require('../models/attendanceReport')
const path = require('path')

// @desc Get all attendances 
// @route GET /attendances
// @access Private
const getAllAttendances = asyncHandler(async (req, res) => {
    // Get all attendances from MongoDB
    const attendances = await Attendance.find().lean()

    // If no attendances 
    if (!attendances?.length) {
        return res.status(400).json({ message: 'No attendances found' })
    }

    res.json(attendances)
})

// @desc Create new attendance
// @route POST /attendances
// @access Private
const createNewAttendance = asyncHandler(async (req, res) => {
    const { empid, fullname, department, checkIn, checkOut } = req.body

    // Confirm data
    if (!empid || !fullname || !department || !checkIn || !checkOut) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const attendance = await Attendance.create({ empid, fullname, department, checkIn, checkOut })

    if (attendance) { // Created 
        return res.status(201).json({ message: 'New attendance created' })
    } else {
        return res.status(400).json({ message: 'Invalid attendance data received' })
    }

})

// @desc Update a attendance
// @route PATCH /attendances
// @access Private
const updateAttendance = asyncHandler(async (req, res) => {
    const {empid, fullname, department, checkIn, checkOut } = req.body

    // Confirm data
    if (!empid || !fullname || !department || !checkIn || !checkOut) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm attendance exists to update
    const attendance = await Attendance.findById(req.params.id)

    if (!attendance) {
        return res.status(400).json({ message: 'Attendance not found' })
    }

    attendance.empid = empid
    attendance.fullname = fullname
    attendance.department = department
    attendance.checkIn = checkIn
    attendance.checkOut = checkOut

    const updatedAttendance = await attendance.save()

    res.json(`'${updatedAttendance.empid}' updated`),
    res.json(`'${updatedAttendance.fullname}' updated`),
    res.json(`'${updatedAttendance.department}' updated`),
    res.json(`'${updatedAttendance.checkIn}' updated`),
    res.json(`'${updatedAttendance.checkOut}' updated`)
})

async function deleteAttendance(req, res){
    try {
        const attendance = await Attendance.findById(req.params.id)
        if(attendance) {
            await attendance.deleteOne()
            res.json({ message: 'attendance removed'})
        } else {
            res.status(404).json({ message: 'attendance not found'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function getAAttendance (req, res) {

    try {
      const attendance = await  Attendance.findById(req.params.id)
      
      res.json(attendance)
      
    } catch (error) {
      res.status(500).json({ message: error.message })
     
    }

  }

  const createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body),{}).toFile('attendancereport.pdf',(err) => {
        if(err) {
            console.log(err)
        }
        res.send('PDF Generated')
    })
  }

  const fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, '../../attendancereport.pdf'))
  }


module.exports = {
    getAllAttendances,
    createNewAttendance,
    updateAttendance,
    deleteAttendance,
    getAAttendance,
    createPdf,
    fetchPdf
}