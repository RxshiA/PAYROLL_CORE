import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';

    const initialValues = {
        empid:'',
        fullname:'',
        department:'',
        checkIn:'',
        checkOut:''
    };

    const API_URL = 'http://localhost:3500/attendance';

    const AddAttendanceForm = () =>{

        const navigate = useNavigate();

        const formik = useFormik({


            initialValues: {
                empid:'',
                fullname:'',
                department:'',
                checkIn:'',
                checkOut:''
                
                
            },

            onSubmit : async(values) =>{
                console.log("Onsubmit")
                try{
                    console.log("in try")
                    const response = await axios.post(

                        API_URL,
                        formik.values,

                    );
                    Swal.fire({
                        icon: 'success',
                        title: 'Attendance Added Successfully!'
                    });
                    navigate('/dash/attendance');
                    formik.resetForm();

                } catch (error) {
                    console.log(error.response);
                }

            } 

            
        });

        return(
            <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} className='bg-white'>
                <Grid item xs={12} sm={6}>
                    <div>
                        {formik.touched.empid && formik.errors.empid ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.empid}
                            </p>
                          ) : null}
                    </div>
                        <TextField
                           fullWidth
                           id="empid"
                           name="empid"
                           label="empid"
                           value={formik.values.empid}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.empid && Boolean(formik.errors.empid)}
          />
            </Grid>   

            <Grid item xs={12} sm={6}>
                    <div>
                        {formik.touched.fullname && formik.errors.fullname ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.fullname}
                            </p>
                          ) : null}
                    </div>
                        <TextField
                           fullWidth
                           id="fullname"
                           name="fullname"
                           label="fullname"
                           value={formik.values.fullname}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.fullname && Boolean(formik.errors.fullname)}
          />
            </Grid>

            <Grid item xs={12} sm={6}>
                    <div>
                        {formik.touched.department && formik.errors.department ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.department}
                            </p>
                          ) : null}
                    </div>
                        <TextField
                           fullWidth
                           id="department"
                           name="department"
                           label="department"
                           value={formik.values.department}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.department && Boolean(formik.errors.department)}
          />
            </Grid>

            <Grid item xs={12} sm={6}>
                    <div>
                        {formik.touched.checkIn && formik.errors.checkIn ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.checkIn}
                            </p>
                          ) : null}
                    </div>
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
                    <div>
                        {formik.touched.checkOut && formik.errors.checkOut ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.checkOut}
                            </p>
                          ) : null}
                    </div>
                        <DatePicker
                           fullWidth
                           id="checkOut"
                           name="checkOut"
                           selected={formik.values.checkOut}
                           onChange={(date) => formik.setFieldValue("checkOut", date)}
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
                  className="w-56 px-4 py-2 font-bold text-white bg-[#4CAF50] rounded"
                  type="submit">
                  Add
                </button>  
              </div>      


                </Grid>


            </Grid>
            </form>


        )
        
    }
    export default AddAttendanceForm