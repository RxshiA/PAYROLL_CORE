import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import styles from '../../style';


const FormDisplayContainer = styled.div``;

// const[user,setUser]=useState('')
const initialValues = {
    empid: '',
    fullname: '',
    loanid: '',
    loantype: '',
    reason: '',
    fullloan: '',
    interest: ''
};


const API_URL = 'http://localhost:3500/loan';



const AddLoanForm = () => {

    const navigate = useNavigate();


    const formik = useFormik({




        initialValues: {

            empid: '',
            fullname: '',
            loanid: '',
            loantype: '',
            reason: '',
            fullloan: '',
            interest: ''
        },
        // validationSchema,
        onSubmit: async (values) => {
            console.log("Onsubmit")
            try {
                console.log("in try")
                const response = await axios.post(

                    API_URL,
                    formik.values,

                );
                Swal.fire({
                    icon: 'success',
                    title: 'Loan Added Succesfully!'
                });
                navigate('/dash/loan');
                formik.resetForm();


            } catch (error) {
                console.log(error.response);

            }

        }

    })



    return (
        <form onSubmit={formik.handleSubmit} >
            <FormDisplayContainer className= "p-10 mb-[20px] bg-black-gradient-2 rounded-xl h-full">
        <div className='flex flex-row  py-[6px] px-6 bg-discount-gradient rounded-[10px] mb-10'><p className={`${styles.paragraph} ml-2`}>
          <span className="text-white">Add</span> New{" "}
          <span className="text-white">Loan</span>
        </p>
        </div>
            <Grid container spacing={2} className='flex flex-row  py-[6px] px-4 bg-white rounded-[10px] mb-5'>
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
                        label="employee id"
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
                    < TextField
                        fullWidth
                        id="fullname"
                        name="fullname"
                        label="full name"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                    />

                </Grid>

                <Grid item xs={12} sm={6}>
                    
                    <div>
                        {formik.touched.loanid && formik.errors.loanid ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.loanid}
                            </p>
                        ) : null}
                    </div>
                    < TextField
                        fullWidth
                        id="loanid"
                        name="loanid"
                        label="loan id"
                        value={formik.values.loanid}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.loanid && Boolean(formik.errors.loanid)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div>
                        {formik.touched.loantype && formik.errors.loantype ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.loantype}
                            </p>
                        ) : null}
                    </div>
                    < TextField
                        fullWidth
                        id="loantype"
                        name="loantype"
                        label="loan type"
                        value={formik.values.loantype}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.loantype && Boolean(formik.errors.loantype)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div>
                        {formik.touched.reason && formik.errors.reason ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
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
                        {formik.touched.fulloan && formik.errors.fulloan ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.fulloan}
                            </p>
                        ) : null}
                    </div>
                    < TextField
                        fullWidth
                        id="fullloan"
                        name="fullloan"
                        label="full loan"
                        value={formik.values.fulloan}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fulloan && Boolean(formik.errors.fulloan)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div>
                        {formik.touched.interest && formik.errors.interest ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.interest}
                            </p>
                        ) : null}
                    </div>
                    < TextField
                        fullWidth
                        id="interest"
                        name="interest"
                        label="interest"
                        value={formik.values.interest}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.interest && Boolean(formik.errors.interest)}
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
            </FormDisplayContainer>
        </form>






    )


}
export default AddLoanForm