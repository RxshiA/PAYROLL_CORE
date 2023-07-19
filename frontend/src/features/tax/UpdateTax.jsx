import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../../style';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';


const API_URL='http://localhost:3500/tax/';

const FormDisplayContainer = styled.div``;

const validationSchema = Yup.object().shape({
    taxPay: Yup.number().required('Tax Amount is required').positive().typeError("Enter Valid Input"),
  });

const UpdateTaxForm=()=>{

    const params=useParams()
    const[tax,setATax]=useState([])
    const navigate=useNavigate()
    const id=params.id


    useEffect(()=>{
        axios.get("http://localhost:3500/tax/"+id).then((res)=>{
            setATax(res.data);
            console.log(res.data)
        }).catch(()=>{
            alert(err.message);
        }) 
      },[]);

     

          
    const formik = useFormik({

        initialValues: {
            taxType: tax.taxtype,
            taxPay: tax.taxpay
          },
          enableReinitialize: true,
          validationSchema,

        onSubmit:async(values)=>{

            try{ 

                await axios.patch(
                    "http://localhost:3500/tax/"+id,
                    {
                        taxtype: values.taxType,
                        taxpay: values.taxPay,

                    }
                    

                );
                 
                  Swal.fire({
                        icon: 'success',
                     title: 'Tax Updated successfully!'
                  });
                // Redirect to tax management page
                 navigate('/dash/tax');
                // Reset the form
                //formik.resetForm();
            }catch(error){
                console.log(error.response);
                console.log(values.taxType,values.taxPay,)
            }
        }

    });



    return(
        <form onSubmit={formik.handleSubmit}>
            <FormDisplayContainer className= "p-10 mb-[20px] bg-black-gradient-2 rounded-xl h-full">
        <div className='flex flex-row  py-[6px] px-6 bg-discount-gradient rounded-[10px] mb-10'><p className={`${styles.paragraph} ml-2`}>
          <span className="text-white">Edit</span> Tax{" "}
          <span className="text-white"></span>
        </p>
        </div>
        <Grid container spacing={2} className='flex flex-row  py-[6px] px-4 bg-white rounded-[10px] mb-5'>
                <Grid item xs={12} sm={6}>
                    <TextField disabled
                        fullWidth
                        id="taxType"
                        name="taxType"
                        label="Tax Name"
                        value={formik.values.taxType || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.taxType && Boolean(formik.errors.taxType)}
                    />
                 </Grid>


                 <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="taxPay"
                        name="taxPay"
                        label="Tax Amount"
                        value={formik.values.taxPay || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.taxPay && Boolean(formik.errors.taxPay)}
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
            </FormDisplayContainer>
        
       </form>
    )

}

export default UpdateTaxForm;