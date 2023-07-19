import React from "react";
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../../style';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const FormDisplayContainer = styled.div``;

function AddSalary() {
    const formik = useFormik({
        initialValues: {
            empId: "",
            user: "",
            // email: "",
            basicsal: "",
        },
        onSubmit: (values) => {
            axios
                .get(`http://localhost:3500/users/find/${values.empId}`)
                .then((res) => {
                    values.user = res.data.empId;
                    console.log(res.data.empId + "  user - addsalary.jsx");
                    axios
                        .post("http://localhost:3500/salary", values)
                        .then(() => {
                            console.log("Basic salary added ");
                        })
                        .catch((err) => {
                            alert(err.message);
                        });
                })
                .catch((err) => {
                    alert(err.message);
                });
        },
        validate: (values) => {
            let errors = {};
            if (!values.empId) {
                errors.empId = "Required";
            }

            // if (!values.name) {
            //   errors.email = "Required";
            // }

            if (!values.basicsal) {
                errors.basicsal = "Required";
            }

            if (!values.user) {
                errors.user = "Required";
            }

            return (errors = {});
        },
    });

    return (
            <form onSubmit={formik.handleSubmit}>
                <FormDisplayContainer className= "p-10 mb-[20px] bg-black-gradient-2 rounded-xl h-full">
                    <div className='flex flex-row  py-[6px] px-6 bg-discount-gradient rounded-[10px] mb-10'><p className={`${styles.paragraph} ml-2`}>
                        <span className="text-white">Edit</span> Tax{" "}
                        <span className="text-white"></span>
                    </p>
                    </div>
                    <Grid container spacing={2} className='flex flex-row  py-[6px] px-4 bg-white rounded-[10px] mb-5'>
                        <Grid item xs={12} sm={6}>

                            <TextField
                                       fullWidth
                                       id="empId"
                                       name="empId"
                                       label="Employee ID"
                                       value={formik.values.empId || ''}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       error={formik.touched.empId && Boolean(formik.errors.empId)}
                            />
                {/*{formik.touched.empId && formik.errors.empId ? (*/}
                {/*    <div>{formik.errors.empId}</div>*/}
                {/*) : null}*/}
                        </Grid>

                {/* hidden input box */}
                <input
                    type="hidden"
                    id="user"
                    name="user"
                    onChange={formik.handleChange}
                    value={formik.values.user}
                    onBlur={formik.handleBlur}
                />


                        <Grid item xs={12} sm={6}>
                {/*<input*/}
                {/*    type="text"*/}
                {/*    id="basicsal"*/}
                {/*    name="basicsal"*/}
                {/*    onChange={formik.handleChange}*/}
                {/*    onBlur={formik.handleBlur}*/}
                {/*    value={formik.values.basicsal}*/}
                {/*/>*/}
                {/*{formik.touched.basicsal && formik.errors.basicsal ? (*/}
                {/*    <div>{formik.errors.basicsal}</div>*/}
                {/*) : null}*/}

                            <TextField
                                fullWidth
                                id="basicsal"
                                name="basicsal"
                                label="Basic Salary"
                                value={formik.values.basicsal || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.basicsal && Boolean(formik.errors.basicsal)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex justify-end">
                                <button
                                    className="w-56 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                                    type="submit">
                                    Add
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                </FormDisplayContainer>
            </form>

    );
}

export default AddSalary;
