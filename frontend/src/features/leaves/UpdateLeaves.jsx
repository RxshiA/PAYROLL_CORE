import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


const API_URL='http://localhost:3500/leave/';

// const initialValues={

//     taxType:'',
//     taxPay:''

// }



const UpdateLeaveForm=()=>{

    const params=useParams()
    const[leave,setALeave]=useState([])
    const navigate=useNavigate()
    const id=params.id


    useEffect(()=>{
        axios.get("http://localhost:3500/leave/"+id).then((res)=>{
            setALeave(res.data);
            console.log(res.data)
        }).catch(()=>{
            alert(err.message);
        }) 
      },[]);

     

          
    const formik = useFormik({

        initialValues: {
            empid:leave.empid,
            fullname:leave.fullname,
            leaveid:leave.leaveid,
            reason:leave.reason,
            type:leave.type,
            noOfDays:leave.noOfDays,
            status:leave.status
           
          },
          enableReinitialize: true,

        onSubmit:async(values)=>{

            try{ 

                await axios.patch(
                    "http://localhost:3500/leave/"+id,
                    {
                        empid: values.empid,
                        fullname: values.fullname,
                        leaveid: values.leaveid,
                        reason: values.reason,
                        type: values.type,
                        noOfDays: values.noOfDays,
                        status: values.status,


                    }
                    

                );
                 
                  Swal.fire({
                        icon: 'success',
                     title: 'Leave Request Updated successfully!'
                  });
                // Redirect to tax management page
                 navigate('/dash/leaves');
                // Reset the form
                //formik.resetForm();
            }catch(error){
                console.log(error.response);
                console.log(values.empid,values.fullname,values.leaveid,values.reason,values.type,values.noOfDays,values.status,)
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
                        label="Employee ID"
                        
                        value={formik.values.empid || ''}
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
                        label="Full Name"

                        value={formik.values.fullname || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField

                        fullWidth
                        id="leaveid"
                        name="leaveid"
                        label="Leave ID"
                        value={formik.values.leaveid || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.leaveid && Boolean(formik.errors.leaveid)}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField

                        fullWidth
                        id="reason"
                        name="reason"
                        label="Reason"
                        value={formik.values.reason || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.reason && Boolean(formik.errors.reason)}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField

                        fullWidth
                        id="type"
                        name="type"
                        label="Type"
                        value={formik.values.type || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.type && Boolean(formik.errors.type)}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField

                        fullWidth
                        id="noOfDays"
                        name="noOfDays"
                        label="No Of Days"
                        value={formik.values.noOfDays || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.noOfDays && Boolean(formik.errors.noOfDays)}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField

                        fullWidth
                        id="status"
                        name="status"
                        label="Status"
                        value={formik.values.status || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.status && Boolean(formik.errors.status)}

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

export default UpdateLeaveForm;