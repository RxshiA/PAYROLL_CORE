import { useState,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { saveAs } from 'file-saver';

const LoanDisplayContainer = styled.div``;


const LoanTest = () =>{
    const [loan,setLoan] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

//search
const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    };

const searchedQuotation = loan.filter((loan) =>
loan.empid.toLowerCase().includes(searchTerm.toLowerCase())
);   


//get loan details
useEffect(() => {
    function getLoans() {
        axios
            .get("http://localhost:3500/loan")
            .then((res) => {
                console.log(res.data);
                setLoan(res.data);
            })
            .catch((err) =>{
                alert(err.message);
            })
    }
    getLoans();
},[]); 


//delete loan
const deleteLoan = (deleteID) => {

        
    console.log(deleteID)
    axios.delete(`http://localhost:3500/loan/${deleteID}`)
    .then(() => {     

        Swal.fire({
            title: 'Deleted!',
            text: 'Item has been deleted.',
            icon: 'success',
            confirmButtonText: 'OK'
        })    
        
   location.reload();

    })
    .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'Item could not be deleted.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
}

    const handleConfirmation = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this item.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            deleteLoan(id);
          } else if (result.dismiss === Swal.DismissReason.cancel) {}
        });
      };

    const generatepdf = async () => {
        await axios
            .post(`http://localhost:3500/loan/createpdf`)
            .then((res) => {
                console.log(res);
                axios
                    .get('http://localhost:3500/loan/fetchpdf',{
                        responseType: 'blob'
                    })
                    .then((res) => {
                        console.log(res);
                        const pdfBlob = new Blob([res.data],{type: 'application/pdf'});
                        saveAs(pdfBlob, 'loan.pdf');
                    });
            });
    }; 

//main
return(
    <LoanDisplayContainer className= "p-10 mb-[20px] bg-white rounded-xl h-full">
        <div className='flex flex-col'>
            <div className='-m-1.5 overflow-x-auto'>
                <div className='p-1.5 min-w-full inline-block align-middle'>
                <div className='flex justify-between center'>
                <TextField
                label="Search Loans"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className=""
              />
                 <Button
                              style={{
                                marginRight: 5,
                                backgroundColor: '#3D3D43',

                                color: '#fff',
                                marginTop: 5,
                                marginLeft: "auto"
                              }}
                              LinkComponent={Link}
                              to={`/dash/loan/new`}
                              sx={{ mt: 'auto' }} >
                              <AddIcon />
                            </Button>

              <Button
                style={{ backgroundColor: '#4CAF50', color: '#fff' }}
                className=""
                onClick={generatepdf}>
                Export Report
              </Button>
              </div>
                    <div className='overflow-hidden'>
                        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                            <thead>
                                <tr>
                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Employee Id    
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Full Name  
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Loan Id   
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Loan Type    
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Reason
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Full Loan
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Interest
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {loan.length > 0 &&
                                 searchedQuotation.map((loan) => (
                                <tr key={loan._id}>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                    {loan.empid}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                     {loan.fullname}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                    {loan.loanid}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                    {loan.loantype}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                    {loan.reason}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                    {loan.fullloan}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                    {loan.interest}
                                 </td>

                                 
                          <ButtonGroup>
                            <Button
                              style={{
                                marginRight: 5,
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                marginTop: 5
                              }}
                              LinkComponent={Link}
                              to={`edit/${loan._id}`}
                              sx={{ mt: 'auto' }}>
                              <CreateIcon />
                            </Button>

                            <Button
                              style={{ backgroundColor: 'Red', color: '#fff' }}
                              onClick={() => handleConfirmation(loan._id)}
                              sx={{ mt: 'auto' }}>
                              <DeleteIcon />
                            </Button>

                          </ButtonGroup>
                                </tr>
                                 ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </LoanDisplayContainer>
    );
};

export default LoanTest;