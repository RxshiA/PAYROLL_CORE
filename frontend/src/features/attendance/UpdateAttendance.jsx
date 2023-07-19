import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL='http://localhost:3500/attendance/';


const UpdateAttendanceForm=()=>{

    const params=useParams();
    const[attendance,setAttendance]=useState([]);
    const navigate=useNavigate();
    const id=params.id;

    useEffect(()=>{
        axios.get("http://localhost:3500/attendance/"+id).then((res)=>{
            setAttendance(res.data);
            console.log(res.data);
        }).catch(()=>{
            alert(err.message);
        }) 
      },[]);



    const formik = useFormik({

        initialValues:{
            EmpID: attendance.empid,
            FullName: attendance.fullname,
            Department: attendance.department,
            CheckIn: new Date(attendance.checkIn),
            CheckOut: new Date(attendance.checkOut)
          },
          enableReinitialize: true,
        
        onSubmit:async(values)=>{

            try{
                await axios.patch(
                    "http://localhost:3500/attendance/"+id,
                    {
                        empid: values.EmpID,
                        fullname: values.FullName,
                        department: values.Department,
                        checkIn: values.CheckIn,
                        checkOut: values.CheckOut,
                    }
                );

                  Swal.fire({
                    icon: 'success',
                    title: 'Attendance Updated Successfully!'
                  });
                
                 navigate('/dash/attendance');
            }catch(error){
                console.log(error.response);
                console.log(values.EmpID,values.FullName,values.Department,values.CheckIn,values.CheckOut)
            }
        }

    });


    const handleCheckInChange = (date) => {
        formik.setFieldValue('checkIn', date);
      };
    
      const handleCheckOutChange = (date) => {
        formik.setFieldValue('checkOut', date);
      };



    return(
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} className='bg-white'>
            <Grid item xs={12} sm={6}>
                <TextField disabled
                    fullWidth
                    id="empid"
                    name="empid"
                    label="empid"
                    value={formik.values.EmpID || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.EmpID && Boolean(formik.errors.EmpID)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField disabled
                        fullWidth
                        id="FullName"
                        name="FullName"
                        label="FullName"
                        value={formik.values.FullName || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.FullName && Boolean(formik.errors.FullName)}
                    />
                 </Grid>

                 <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth 
                        id="Department"
                        name="Department"
                        label="Department"
                        value={formik.values.Department || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Department && Boolean(formik.errors.Department)}
                    />
                 </Grid>

                 <Grid item xs={12} sm={6}>
                 <DatePicker
                           fullWidth
                           id="checkIn"
                           name="checkIn"
                           selected={formik.values.checkIn}
                           onChange={(date) => formik.setFieldValue("checkIn",date)}
                           onBlur={formik.handleBlur}
                           showTimeSelect
                           timeFormat="HH:mm"
                           timeIntervals={15}
                           dateFormat="yyyy-MM-dd HH:mm"
                           placeholderText="Select check-in time"
    
                    />
                 </Grid>

                 <Grid item xs={12} sm={6}>
                 <DatePicker
                           fullWidth
                           id="checkOut"
                           name="checkOut"
                           selected={formik.values.checkOut}
                           onChange={(date) => formik.setFieldValue("checkOut",date)}
                           onBlur={formik.handleBlur}
                           showTimeSelect
                           timeFormat="HH:mm"
                           timeIntervals={15}
                           dateFormat="yyyy-MM-dd HH:mm"
                           placeholderText="Select check-out time"
                    />
                 </Grid>

                <Grid item xs={12}>
                    <div className="flex justify-end">
                        <button
                            className="w-56 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            type="submit">
                            Update
                            </button>

                       

                        
                    </div>
                </Grid>
            </Grid>

        </form>
        
    
    )



}

export default UpdateAttendanceForm;