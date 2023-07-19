const Loan = require('../models/Loan')
const User = require('../models/User')
const pdfTemplate = require('../models/loanReport').default
const asyncHandler = require('express-async-handler')
const pdf = require('html-pdf')
const path = require('path')

// @desc Get all loans 
// @route GET /loans
// @access Private

const getAllLoans = asyncHandler(async (req, res) => {
    // Get all loans from MongoDB
    const loans = await Loan.find().lean()

    // If no loans 
    if (!loans?.length) {
        return res.status(400).json({ message: 'No loans found' })
    }

    
    res.json(loans)
})

// @desc Create new loan
// @route POST /loans
// @access Private
const createNewLoan = asyncHandler(async (req, res) => {
    const { empid, fullname, loanid, loantype, reason, fullloan, interest }  = req.body

    // Confirm data
    // if ( !empid || !fullname || !loanid ||  !loantype || !reason || !fullloan || !interest) {
    //     return res.status(400).json({ message: 'All fields are required' })
    // }

    // Create and store the new user 
    const loan = await Loan.create({ empid, fullname, loanid, loantype, reason, fullloan, interest })

    if (loan) { // Created 
        return res.status(201).json({ message: 'New loan created' })
    } else {
        return res.status(400).json({ message: 'Invalid loan data received' })
    }

})

// @desc Update a loan
// @route PATCH /loans
// @access Private
const updateLoan = asyncHandler(async (req, res) => {
    const { empid, fullname, loanid, loantype, reason, fullloan, interest } = req.body

    // Confirm data
    if (!empid || !fullname || !loanid || !loantype || !reason || !fullloan || !interest) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm loan exists to update
    const loan = await Loan.findById(req.params.id)

    if (!loan) {
        return res.status(400).json({ message: 'Loan not found' })
    }

    loan.empid = empid
    loan.fullname = fullname
    loan.loanid = loanid
    loan.loantype = loantype
    loan.reason = reason
    loan.fullloan = fullloan
    loan.interest = interest

    const updatedLoan = await loan.save()

    res.json(`'${updatedLoan.loantype}' updated`)
})

// @desc Delete a loan
// @route DELETE /loans
// @access Private
async function deleteLoan (req, res) {
    try {
      const loan = await Loan.findById(req.params.id)
      if (loan) {
        await loan.deleteOne()
        res.json({ message: 'loan removed' })
      } else {
        res.status(404).json({ message: 'loan not found' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async function getALoan (req, res) {

    try {
      const loan = await Loan.findById(req.params.id)
      
      res.json(loan)
      
    } catch (error) {
      res.status(500).json({ message: error.message })
     
    }

  }  

// @desc Genarate a report
// @route GET /createPdf
// @access Private
const createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('loanreport.pdf', (err) => {
        if (err) {
            console.log(err)
        }
        res.send('PDF generated')
    })
}

const fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, '../../loanreport.pdf'))
}


module.exports = {
    getAllLoans,
    createNewLoan,
    updateLoan,
    deleteLoan,
    getALoan,
    createPdf,
    fetchPdf
}