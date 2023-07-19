import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


const API_URL='http://localhost:3500/loan/';

const UpdateLoanForm=()=>{

    const params=useParams()
    const[loan,setALoan]=useState([])
    const navigate=useNavigate()
    const id=params.id


    useEffect(()=>{
        axios.get("http://localhost:3500/loan/"+id).then((res)=>{
            setALoan(res.data);
            console.log(res.data)
        }).catch(()=>{
            alert(err.message);
        }) 
      },[]);

     

          
    const formik = useFormik({

        initialValues: {
            empid: loan.empid,
            fullname: loan.fullname,
            loanid: loan.loanid,
            loantype: loan.loantype,
            reason: loan.reason,
            fullloan: loan.fullloan,
            interest: loan.interest
          },
          enableReinitialize: true,

        onSubmit:async(values)=>{

            try{ 

                await axios.patch(
                    "http://localhost:3500/loan/"+id,
                    {
                        empid: values.empid,
                        fullname: values.fullname,
                        loanid: values.loanid,
                        loantype: values.loantype,
                        reason: values.reason,
                        fullloan: values.fullloan,
                        interest: values.interest

                    }
                    

                );
                 
                  Swal.fire({
                        icon: 'success',
                     title: 'Loan Updated successfully!'
                  });
                // Redirect to loan management page
                 navigate('/dash/loan');
                // Reset the form
                //formik.resetForm();
            }catch(error){
                console.log(error.response);
                console.log(values.empid,values.fullname,values.loanid,values.loantype,values.reason,values.fullloan,values.interest,)
            }
        }

    });



    return(
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} className='bg-white'>
                <Grid item xs={12} sm={6}>
                    <TextField disabled
                        fullWidth
                        id="empid"
                        name="empid"
                        label="Employee Id"
                        value={formik.values.empid || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.empid && Boolean(formik.errors.empid)}
                    />
                 </Grid>


                 <Grid item xs={12} sm={6}>
                    <TextField disabled
                        fullWidth
                        id="fullname"
                        name="fullname"
                        label="full name"
                        value={formik.values.fullname || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                    />
                 </Grid>

                 <Grid item xs={12} sm={6}>
                    <TextField disabled
                        fullWidth
                        id="loanid"
                        name="loanid"
                        label="loan Id"
                        value={formik.values.loanid || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.loanid && Boolean(formik.errors.loanid)}
                    />
                 </Grid>

                 <Grid item xs={12} sm={6}>
                    <TextField disabled
                        fullWidth
                        id="loantype"
                        name="loantype"
                        label="loan type"
                        value={formik.values.loantype || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.loantype && Boolean(formik.errors.loantype)}
                    />
                 </Grid>

                 <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="reason"
                        name="reason"
                        label="reason"
                        value={formik.values.reason || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.reason && Boolean(formik.errors.reason)}
                    />
                 </Grid>

                 <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="fullloan"
                        name="fullloan"
                        label="Full loan"
                        value={formik.values.fullloan || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullloan && Boolean(formik.errors.fullloan)}
                    />
                 </Grid>

                 <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="interest"
                        name="interest"
                        label="interest"
                        value={formik.values.interest || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.interest && Boolean(formik.errors.interest)}
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

export default UpdateLoanForm;