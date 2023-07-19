import { useState, useEffect } from 'react';
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
import { saveAs } from 'file-saver';
import { alignProperty } from '@mui/material/styles/cssUtils';


const LeaveDisplayContainer = styled.div``;


function LeaveTable() {

  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  //   const [dataTable,setDataTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedQuotation = leaves.filter((leaves) =>
    leaves.leaveid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios.get("http://localhost:3500/leave/").then((res) => {
      setLeaves(res.data);
      console.log(res.data)
    }).catch(() => {
      alert(err.message);
      console.log("ERror")
    })
  }, []);

  //generate report
  const generatepdf = async () => {
    await axios
      .post(`http://localhost:3500/leave/createpdf`, leaves)
      .then((response) => {
        console.log(response);
        axios
          .get('http://localhost:3500/leave/fetchpdf', {
            responseType: 'blob'
          })
          .then((res) => {
            console.log(res);
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'leave.pdf');
          });
      });

    Swal.fire({
      icon: 'success',
      title: 'Leave Report Genarated successfully!'
    });
    navigate('/dash/leaves');
  };

  const handleDelete = (deleteID) => {


    console.log(deleteID)
    axios.delete(`http://localhost:3500/leave/${deleteID}`)
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
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  };



  return (

    <LeaveDisplayContainer className="p-10 mb-[20px] bg-black-gradient-2 rounded-xl h-full">
      <div className='flex flex-row  py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-5'><p className={`${styles.paragraph} ml-2`}>
        <span className="text-white">Leave</span> Management{" "}
        <span className="text-white">System</span>
      </p>

        {<Button
          style={{
            marginRight: 5,
            backgroundColor: '#3D3D43',

            color: '#fff',
            marginTop: 5,
            marginLeft: "auto"
          }}
          LinkComponent={Link}
          to={`/dash/leaves/new`}
          sx={{ mt: 'auto' }} >
          <AddIcon />
        </Button>}

      </div>

      {/* <h1 className='text-5xl font-bold my-2.5 ml-2.5'>Current  Taxes</h1> */}
      <div class="flex flex-col " >
        <div class="-m-1.5 overflow-x-auto">
          <div className='p-1.5 min-w-full inline-block align-middle'>
            <TextField
              label="Search Leave ID"
              value={searchTerm}
              onChange={handleSearchTermChange}
              className="bg-white rounded-xl "
            />
            <br></br><br></br>

            <button
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              type="Report"
              onClick={generatepdf}
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Generate Report
            </button>
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white rounded-xl h-full mt-3">
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                      Leave ID
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                      Employee ID
                    </th>


                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                      Leave Type
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                      No Of Days
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                      Reason
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                      Status
                    </th>


                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {leaves.length > 0 &&
                    searchedQuotation.map((leaves) => (
                      <tr key={leaves._id}>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {leaves.leaveid}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {leaves.empid}
                        </td>



                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {leaves.type}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {leaves.noOfDays}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {leaves.reason}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
                          {leaves.status}
                        </td>

                        <ButtonGroup>
                          {<Button
                            style={{
                              marginRight: 5,
                              backgroundColor: '#4CAF50',
                              color: '#fff',
                              marginTop: 5
                            }}
                            LinkComponent={Link}
                            to={`edit/${leaves._id}`}
                            sx={{ mt: 'auto' }} >
                            <CreateIcon />
                          </Button>}

                          <Button
                            style={{ backgroundColor: 'Red', color: '#fff' }}
                            onClick={() => handleConfirmation(leaves._id)}
                            sx={{ mt: 'auto' }}>
                            <DeleteIcon />
                          </Button>
                        </ButtonGroup>

                      </tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LeaveDisplayContainer>

  )
}





export default LeaveTable;