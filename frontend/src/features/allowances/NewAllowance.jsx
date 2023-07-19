import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import axios from 'axios';


const initialValues = {
    empid: '',
    fullname: '',
    department: '',
    type: '',
    allowancepay: ''
};

const validationSchema = Yup.object().shape({
    empid: Yup.string().required('Required'),
    fullname: Yup.string().required('Required'),
    department: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    allowancepay: Yup.number().required('Required').min(0, 'Must be a positive number'),
});

function validateEmpid() {
    const empidInput = document.getElementById('empid');
    if (empidInput !== null) {
        const empid = empidInput.value.trim();
        if (empid.length > 5) {
            empidInput.style.borderColor = 'red';
            empidInput.setCustomValidity('Empid must be 5 characters or less');
        } else {
            empidInput.style.borderColor = '';
            empidInput.setCustomValidity('');
        }
    }
}


const API_URL = 'http://localhost:3500/allowances';

const NewAllowance = () => {

    const navigate = useNavigate();

    const formik = useFormik({

        initialValues,
        validationSchema,
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
                    title: 'Allowance Added Succesfully!'
                });
                navigate('/dash/allowances');
                formik.resetForm();


            } catch (error) {
                console.log(error.response);

            }

        }

    })



    return (
        <div className="block max-w-full rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-500 mx-auto mt-8">
            <h2>New Allowance</h2><br />
            <form onSubmit={formik.handleSubmit} className="form mx-auto mt-8" >

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div className="relative mb-12">
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
                            label="Employee ID"
                            value={formik.values.empid}
                            onChange={formik.handleChange}
                            onBlur={validateEmpid()}
                            error={formik.touched.empid && Boolean(formik.errors.empid)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className="relative mb-12">
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
                            label="Full Name"
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className="relative mb-12">
                            {formik.touched.department && formik.errors.department ? (
                                <p className="mt-1 mb-2 text-sm italic text-red-500">
                                    {formik.errors.department}
                                </p>
                            ) : null}
                        </div>
                        < TextField
                            fullWidth
                            id="department"
                            name="department"
                            label="Department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.department && Boolean(formik.errors.department)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className="relative mb-12">
                            {formik.touched.type && formik.errors.type ? (
                                <p className="mt-1 mb-2 text-sm italic text-red-500">
                                    {formik.errors.type}
                                </p>
                            ) : null}
                        </div>
                        < TextField
                            fullWidth
                            id="type"
                            name="type"
                            label="Allowance Type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className="relative mb-12">
                            {formik.touched.allowancepay && formik.errors.allowancepay ? (
                                <p className="mt-1 mb-2 text-sm italic text-red-500">
                                    {formik.errors.allowancepay}
                                </p>
                            ) : null}
                        </div>
                        < TextField
                            fullWidth
                            mask="999999.99"
                            id="allowancepay"
                            name="allowancepay"
                            label="Allowance Payment"
                            value={formik.values.allowancepay}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.allowancepay && Boolean(formik.errors.allowancepay)}
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
        </div>
    )
}

export default NewAllowance