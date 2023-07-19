import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';



    
    // const[user,setUser]=useState('')
    const initialValues = {
        empid:'',
        fullname:'',
        leaveid:'',
        reason:'',
        type:'',
        noOfDays:'',
        status:''
      };


    const API_URL = 'http://localhost:3500/leave';

    

    const AddLeaveForm = () =>{

        const navigate = useNavigate();
       

        const formik = useFormik({




            initialValues: {

                empid:'',
                fullname:'',
                leaveid:'',
                reason:'',
                type:'',
                noOfDays:'',
                status:''


            },
            // validationSchema,
            onSubmit : async(values) =>{
                console.log("Onsubmit")
                try{
                    console.log("in try")
                    const response= await axios.post(
                        
                        API_URL,
                        formik.values,
                        
                    );
                    Swal.fire({
                        icon: 'success',
                        title: 'Leave Requested Succesfully!'
                      });
                      navigate('/dash/leaves');
                      formik.resetForm();
                    
                    
                }catch (error) {
                    console.log(error.response);

            }

        }

    })

    

    return(
        <form onSubmit={formik.handleSubmit} >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <div>
                    {formik.touched.empid && formik.errors.empid ? (
                        <p >
                            {formik.errors.empid}
                         </p>
                      ) : null}
                </div>
                     <TextField
                        fullWidth
                        id="empid"
                        name="empid"
                        label="epmid"
                        value={formik.values.taxtype}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.empid && Boolean(formik.errors.empid)}
          />
            </Grid>

            <Grid item xs={12} sm={6}>
                <div>
                    {formik.touched.leaveid && formik.errors.leaveid ? (
                        <p >
                            {formik.errors.fullname}
                         </p>
                      ) : null}
                </div>
                     < TextField
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
                    {formik.touched.leaveid && formik.errors.leaveid ? (
                        <p >
                            {formik.errors.leaveid}
                         </p>
                      ) : null}
                </div>
                     < TextField
                        fullWidth
                        id="leaveid"
                        name="leaveid"
                        label="leaveid"
                        value={formik.values.leaveid}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.leaveid && Boolean(formik.errors.leaveid)}



                        
          />
            </Grid>
            <Grid item xs={12} sm={6}>
                <div>
                    {formik.touched.reason && formik.errors.reason ? (
                        <p >
                            {formik.errors.reason}
                            </p>
                        ) : null}
                </div>
                        < TextField
                            fullWidth
                            id="reason"
                            name="reason"
                            label="reason"
                            value={formik.values.reason}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.reason && Boolean(formik.errors.reason)}
                        />
            </Grid>
            <Grid item xs={12} sm={6}>
                <div>
                    {formik.touched.type && formik.errors.type ? (
                        <p >
                            {formik.errors.type}
                            </p>
                        ) : null}
                </div>
                        
                        < TextField
                            fullWidth
                            id="type"
                            name="type"
                            label="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                        />
            </Grid>
            <Grid item xs={12} sm={6}>
                <div>
                    {formik.touched.noOfDays && formik.errors.noOfDays ? (
                        <p >
                            {formik.errors.noOfDays}
                            </p>
                        ) : null}
                </div>

                        
                        < TextField
                            fullWidth
                            id="noOfDays"
                            name="noOfDays"
                            label="noOfDays"
                            value={formik.values.noOfDays}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.noOfDays && Boolean(formik.errors.noOfDays)}
                        />
            </Grid>
            <Grid item xs={12} sm={6}>
                <div>
                    {formik.touched.status && formik.errors.status ? (
                        <p >
                            {formik.errors.status}
                            </p>
                        ) : null}


                </div>
                < TextField
                    fullWidth
                    id="status"
                    name="status"
                    label="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.status && Boolean(formik.errors.status)}
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
export default AddLeaveForm