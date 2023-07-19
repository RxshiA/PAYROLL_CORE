import { useState,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AddIcon from '@mui/icons-material/Add';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import { TextField } from '@mui/material';
import styles from '../../style';
import { useNavigate } from "react-router-dom";
import { alignProperty } from '@mui/material/styles/cssUtils';
import { saveAs } from 'file-saver';



const UserTaxDisplayContainer = styled.div``;


function TaxUsersTable() {
    
    const navigate = useNavigate();



    

    const [usertax,setUserTax] = useState([]);
    //   const [dataTable,setDataTable] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');


      const generatepdf = async () => {
        await axios.post("http://localhost:3500/usertax/createpdf", usertax).then((response) => {
                console.log(response);
                axios
                    .get('http://localhost:3500/usertax/fetchpdf', {
                        responseType: 'blob'
                    })
                    .then((res) => {
                        console.log(res);
                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                        saveAs(pdfBlob, 'tax.pdf');
                    });
            });
  
        Swal.fire({
                icon: 'success',
             title: 'Tax Report Genarated successfully!'
          });
         navigate('/dash/taxUsers');
    };
  


  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedQuotation = usertax.filter((usertax) =>
    usertax.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );    

      useEffect(()=>{
        axios.get("http://localhost:3500/usertax/").then((res)=>{
            setUserTax(res.data);
            console.log(res.data)
        }).catch(()=>{
            alert(err.message);
        })
      },[]);


   
  return (
    
  <UserTaxDisplayContainer className= "p-10 mb-[20px] bg-black-gradient-2 rounded-xl h-full">
    <div className='flex flex-row  py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-5'><p className={`${styles.paragraph} ml-2`}>
                            <span className="text-white">Tax</span> Management{" "}
                            <span className="text-white">System</span>
                        </p>

                        <Button onClick={generatepdf}
                              style={{
                                marginRight:0,
                                backgroundColor: '#3D3D43',
                                
                                color: '#fff',
                                marginTop: 5,
                                marginLeft: "auto"
                              }}
                              >
                              <LocalPrintshopIcon />

                              

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
                              to={`/dash/taxUsers/calc`}
                              sx={{ mt: 'auto' }} >
                              <CalculateIcon />

                              

                            </Button>

                        </div>

        <div class="flex flex-col " >
            <div class="-m-1.5 overflow-x-auto">
            <div className='p-1.5 min-w-full inline-block align-middle'>
            <TextField 
                label="Search User"
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
                                    Emp ID   
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Full name
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Department
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Date
                                    </th>

                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Tax Type
                                    </th>


                                    <th
                                    scope='col'
                                    className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                                    Reduction Amount
                                    </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {usertax.length > 0 &&
                                 searchedQuotation.map((usertax) => (
                                <tr key={usertax.fullname}>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                    {usertax.empid}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                     {usertax.fullname}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                     {usertax.department}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                     {usertax.date}
                                 </td>

                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                     {usertax.taxtype}
                                 </td>


                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                                     {usertax.taxAmount}
                                 </td>


                           
                                
                                 </tr> ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </UserTaxDisplayContainer>

  )
}


export default TaxUsersTable;