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
import styles from '../../style';
import { useNavigate } from "react-router-dom";
import { alignProperty } from '@mui/material/styles/cssUtils';
import Person2Icon from '@mui/icons-material/Person2';


const TaxDisplayContainer = styled.div``;


function TaxTable() {
    
    const navigate = useNavigate();

    const [tax,setTax] = useState([]);
    //   const [dataTable,setDataTable] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');


        const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        };

        const searchedQuotation = tax.filter((tax) =>
        tax.taxtype.toLowerCase().includes(searchTerm.toLowerCase())
);    

      useEffect(()=>{
        axios.get("http://localhost:3500/tax/").then((res)=>{
            setTax(res.data);
            console.log(res.data)
        }).catch(()=>{
            alert(err.message);
        })
      },[]);

 
      const handleDelete = (deleteID) => {

        
        console.log(deleteID)
        axios.delete(`http://localhost:3500/tax/${deleteID}`)
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
            handleDelete(id);
          } else if (result.dismiss === Swal.DismissReason.cancel) {}
        });
      };

  return (
    
  <TaxDisplayContainer className= "p-10 mb-[20px] bg-black-gradient-2 rounded-xl h-full">
    <div className='flex flex-row  py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-5'>
      <p className={`${styles.paragraph} ml-2`}>
                            <span className="text-white">Tax</span> Management{" "}
                            <span className="text-white">System</span>
                        </p>

                        <Button
                              style={{
                                marginRight: 5,
                                backgroundColor: '#3D3D43',
                                
                                color: '#fff',
                                marginTop: 5,
                                marginLeft: "auto"
                              }}
                              LinkComponent={Link}
                              to={`/dash/tax/new`}
                              sx={{ mt: 'auto' }} >
                              <AddIcon />
                            </Button>


                            <Button
                              style={{
                                marginRight: 5,
                                backgroundColor: '#3D3D43',
                                
                                color: '#fff',
                                marginTop: 5,
                                marginLeft: 5
                              }}
                              LinkComponent={Link}
                              to={`/dash/taxUsers`}
                              sx={{ mt: 'auto' }} >
                              <Person2Icon />
                            </Button>

                        </div>
        
        <div class="flex flex-col " >
            <div class="-m-1.5 overflow-x-auto">
            <div className='p-1.5 min-w-full inline-block align-middle'>
            <TextField 
                label="Search Tax"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="bg-white rounded-xl "
              />

                <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white rounded-xl h-full mt-3">
                    <thead>
                        <tr>
                        <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Tax Name   
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Tax Amount
                                    </th>

                                 
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tax.length > 0 &&
                                 searchedQuotation.map((tax) => (
                                <tr key={tax._id}>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                    {tax.taxtype}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                     {tax.taxpay}
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
                              to={`edit/${tax._id}`}
                              sx={{ mt: 'auto' }} >
                              <CreateIcon />
                            </Button>

                            <Button
                              style={{ backgroundColor: 'Red', color: '#fff' }}
                              onClick={() => handleConfirmation(tax._id)}
                              sx={{ mt: 'auto' }}>
                              <DeleteIcon />
                            </Button>
                          </ButtonGroup>
                                
                                 </tr> ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </TaxDisplayContainer>

  )
}


export default TaxTable;