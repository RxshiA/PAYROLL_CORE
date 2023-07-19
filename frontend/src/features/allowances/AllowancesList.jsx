import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Swal from 'sweetalert2'
import { TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonGroup, Button } from '@mui/material';
import styles from '../../style';
import { saveAs } from 'file-saver';
import { useNavigate, Link } from "react-router-dom";


function AllowancesList() {
    
    const navigate = useNavigate();

    const [allowance,setAllowance] = useState([]);
   
    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const searchedQuotation = allowance.filter((allowance) =>
        allowance.empid.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(()=>{
        axios.get("http://localhost:3500/allowances/").then((res)=>{
            setAllowance(res.data);
            console.log(res.data)
        }).catch(()=>{
            alert(err.message);
        })
      },[])


    //generate report
    const generatepdf = async () => {
        await axios
            .post(`http://localhost:3500/allowances/createpdf`, allowance)
            .then((response) => {
                console.log(response);
                axios
                    .get('http://localhost:3500/allowances/fetchpdf', {
                        responseType: 'blob'
                    })
                    .then((res) => {
                        console.log(res);
                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                        saveAs(pdfBlob, 'allowance.pdf');
                    });
            });
        
        Swal.fire({
                icon: 'success',
             title: 'Allowance Report Genarated successfully!'
          });
         navigate('/dash/allowances');
    };

    const handleDelete = (deleteID) => {
        console.log(deleteID)
        axios.delete(`http://localhost:3500/allowances/${deleteID}`)
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
            })
        })
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
            handleDelete(id);
          } else if (result.dismiss === Swal.DismissReason.cancel) {}
        })
      }

    return (

        <div className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
            <div className="flex-1 flex flex-col">
                <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
                    <p className={`${styles.paragraph} ml-2`}>
                        <span className="text-white">Allowance</span> Management{" "}
                        <span className="text-white">System</span>
                    </p>
                </div>
                
                <br></br><br></br>
                
                    <div className='p-1.5 min-w-full inline-block align-middle'>
                        <TextField 
                            label="Search Allowance"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            className="bg-white rounded-xl "
                        />
                    </div>

                    <br></br>
                            
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>
                            <span className="text-white">
                                <Link to="/dash/allowances/new">Add New Allowances</Link>
                            </span>
                        </p>
                        
                        <div class="text-right">
                            <button
                                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                type="Report"
                                onClick={generatepdf}
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                Generate Report
                            </button>
                        </div>
                    </div>
                       
                

                    <br></br>

                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="relative overflow-x-auto">
                                    <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <TableHead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <TableRow>
                                                <TableCell align="left" className='px-6 py-3'>Employee Id</TableCell>
                                                <TableCell align="right" className='px-6 py-3'>Full Name</TableCell>
                                                <TableCell align="right" className='px-6 py-3'>Department</TableCell>
                                                <TableCell align="right" className='px-6 py-3'>Type</TableCell>
                                                <TableCell align="right" className='px-6 py-3'>Allowancepay</TableCell>
                                                <TableCell align="right" className='px-6 py-3'>Edit</TableCell>
                                                <TableCell align="right" className='px-6 py-3'>Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {allowance.length > 0 &&
                                            searchedQuotation.map((allowance) => (
                                            <tr key={allowance._id}>

                                            <td align="left" className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                                {allowance.empid}
                                            </td>

                                            <td align="right" className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                                {allowance.fullname}
                                            </td>

                                            <td align="right" className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                                {allowance.department}
                                            </td>

                                            <td align="right" className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                                {allowance.type}
                                            </td>

                                            <td align="right" className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                                {allowance.allowancepay}
                                            </td>

                                            <td align="right" className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                                <Button
                                                style={{
                                                    marginRight: 5,
                                                    backgroundColor: '#4CAF50',
                                                    color: '#fff',
                                                    marginTop: 5
                                                }}
                                                LinkComponent={Link}
                                                to={`edit/${allowance._id}`}
                                                sx={{ mt: 'auto' }} >
                                                <CreateIcon />
                                                </Button>
                                            </td>
                                            <td align="right" >
                                                <Button
                                                style={{ backgroundColor: 'Red', color: '#fff' }}
                                                onClick={() => handleConfirmation(allowance._id)}
                                                sx={{ mt: 'auto' }}>
                                                <DeleteIcon />
                                                </Button>
                                            </td>
                                            
                                            
                                            </tr> ))}

                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
export default AllowancesList