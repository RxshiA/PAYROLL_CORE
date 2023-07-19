import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import styles from '../../style';
import * as Yup from 'yup';


const FormDisplayContainer = styled.div``;

const validationSchema = Yup.object().shape({
    taxtype: Yup.string().required('Tax Type is required').typeError("Enter Valid Input"),
    taxpay: Yup.number().required('Tax Amount is required').positive().typeError("Enter Valid Input"),
  });
    
    
    const initialValues = {
        taxtype:'',
        taxpay:''
      };


    const API_URL = 'http://localhost:3500/tax';

  
      
  


    const AddTaxForm = () =>{

        const navigate = useNavigate();
       

        const formik = useFormik({


            initialValues: {

                taxtype:'',
                taxpay:''

            },
            validationSchema,
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
                        title: 'Tax Added Succesfully!'
                      });
                      navigate('/dash/tax');
                      formik.resetForm();
                    
                    
                }catch (error) {
                    console.log(error.response);

            }

        }

    })

    

    return(
        <form onSubmit={formik.handleSubmit} >
            <FormDisplayContainer className= "p-10 mb-[20px] bg-black-gradient-2 rounded-xl h-full">
        <div className='flex flex-row  py-[6px] px-6 bg-discount-gradient rounded-[10px] mb-10'><p className={`${styles.paragraph} ml-2`}>
          <span className="text-white">Add</span> New{" "}
          <span className="text-white">Tax</span>
        </p>
        </div>
        <Grid container spacing={2} className='flex flex-row  py-[6px] px-4 bg-white rounded-[10px] mb-5'>
            <Grid item xs={12} sm={6}>
                <div>
                    {formik.touched.taxtype && formik.errors.taxtype ? (
                        <p className="mt-1 mb-2 text-sm italic text-red-500">
                            {formik.errors.taxtype}
                         </p>
                      ) : null}
                </div>
                     <TextField
                        fullWidth
                        id="taxtype"
                        name="taxtype"
                        label="Tax Name"
                        value={formik.values.taxtype}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.taxtype && Boolean(formik.errors.taxtype)}
          />
            </Grid>

            <Grid item xs={12} sm={6}>
                <div>
                    {formik.touched.taxpay && formik.errors.taxpay ? (
                        <p className="mt-1 mb-2 text-sm italic text-red-500">
                            {formik.errors.taxpay}
                         </p>
                      ) : null}
                </div>
                     < TextField
                        fullWidth
                        id="taxpay"
                        name="taxpay"
                        label="Tax Amount"
                        value={formik.values.taxpay}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.taxpay && Boolean(formik.errors.taxpay)}



                        
          />
            </Grid>

            <Grid item xs={12}>
          <div className="flex justify-end">
            <button
              className="w-56 px-4 py-2 font-bold text-white bg-[#3B82F6] rounded"
              type="submit">
              Add
            </button>
          </div>



        </Grid>

            


        </Grid>
        </FormDisplayContainer>
   </form>

        )


    }
export default AddTaxForm