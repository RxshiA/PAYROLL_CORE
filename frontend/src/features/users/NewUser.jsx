import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import axios from 'axios';


const initialValues = {
    empid: '',
    password: '',
    fullname: '',
    department: '',
    roles: '',
    joinedDate: '',
    active: ''
};

const validationSchema = Yup.object().shape({
  empid: Yup.string().required('Required'),
  fullname: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  roles: Yup.string().required('Required'),
  joinedDate: Yup.date().required('Required'),
  active: Yup.boolean().required('Required'),
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
        }}
      }


const API_URL = 'http://localhost:3500/users';

const NewUser = () => {

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
                    title: 'User Added Succesfully!'
                });
                navigate('/dash/users');
                formik.resetForm();


            } catch (error) {
                console.log(error.response);

            }

        }

    })



    return (
        <div className="block max-w-full rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-500 mx-auto mt-8">
        <h2>New User</h2><br />
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
                        {formik.touched.password && formik.errors.password ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.password}
                            </p>
                        ) : null}
                    </div>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
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
                        {formik.touched.roles && formik.errors.roles ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.roles}
                            </p>
                        ) : null}
                    </div>
                    < TextField
                        fullWidth
                        id="roles"
                        name="roles"
                        label="User Roles"
                        value={formik.values.roles}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.roles && Boolean(formik.errors.roles)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div className="relative mb-12">
                        {formik.touched.joinedDate && formik.errors.joinedDate ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.joinedDate}
                            </p>
                        ) : null}
                    </div>
                    < TextField
                        fullWidth
                        id="joinedDate"
                        name="joinedDate"
                        label="Joined Date"
                        value={formik.values.joinedDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.joinedDate && Boolean(formik.errors.joinedDate)}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <div className="relative mb-12">
                        {formik.touched.active && formik.errors.active ? (
                            <p className="mt-1 mb-2 text-sm italic text-red-500">
                                {formik.errors.active}
                            </p>
                        ) : null}
                    </div>
                    < TextField
                        fullWidth
                        id="active"
                        name="active"
                        label="User Active"
                        value={formik.values.active}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.active && Boolean(formik.errors.active)}
                    />
                </Grid>

               

                <Grid item xs={12}>
                    <div className="flex justify-end">
                        <button
                            className="w-56 px-4 py-2 font-bold text-white bg-[#4CAF50] rounded"
                            roles="submit">
                            Add
                        </button>
                    </div>
                </Grid>
            </Grid>
        </form>
    </div>
    )
}

export default NewUser