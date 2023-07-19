import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from '../../style';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import * as Yup from 'yup';

const API_URL = 'http://localhost:3500/usertax/';
const FormDisplayContainer = styled.div``;

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Employe name  is required').typeError("Enter Valid Input"),
  taxType: Yup.string().required('Tax Type is required')
});


var userId;
var taxPerc
var basicSalary
var taxName
var empName

const CalcUserTax = () => {
  const [tax, setTax] = useState([]);
  const [user, setUser] = useState([]);
  const [sal, setUserSal] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:3500/tax/')
      .then((res) => {
        setTax(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);


  useEffect(() => {
    axios
      .get('http://localhost:3500/users/')
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3500/salary/')
      .then((res) => {
        setUserSal(res.data);
        console.log(res.data);
        console.log("in salary")
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      taxType: '',
      taxPay: '',
      userName:'',
      userId:'',
      department:'',
      basicSal:'',
      reduction:''

    },
    //validationSchema,
    onSubmit: async(values) => {
      try{ 

        await axios.post(
            "http://localhost:3500/usertax/",
            {   

                empid:values.userId,
                taxtype: taxName,
                department: values.department,
                fullname:empName,
                taxAmount:values.reduction,
                date:Date()

            }
            

        );
         
          Swal.fire({
                icon: 'success',
             title: 'Tax Updated successfully!'
          });
        // Redirect to tax users page
         navigate('/dash/taxUsers');
        // Reset the form
        formik.resetForm();
    }catch(error){

        console.log(error.response);
        //console.log(values.taxType,values.taxPay,)
    } 
    },
  });

  const handleTaxTypeChange = (event, newValue) => {

    
    formik.setFieldValue('taxType', newValue);
    formik.setFieldValue('taxPay',newValue.taxpay)
    taxPerc=newValue.taxpay
    taxName=newValue.taxtype
    
  };


  const handleUserChange = (event, newValue) => {

    formik.setFieldValue('userName', newValue);
    formik.setFieldValue('userId',newValue.empid)
    formik.setFieldValue('department',newValue.department)
    empName=newValue.fullname
    userId=newValue._id
    const selectedTax = sal.find((sal) => sal.user === userId)
    console.log(selectedTax._id)
    formik.setFieldValue('basicSal', selectedTax.basicsal);
    basicSalary=selectedTax.basicsal
    formik.setFieldValue('reduction', taxPerc*basicSalary);
    console.log(basicSalary)
    console.log(taxPerc*basicSalary)
    

    
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormDisplayContainer className= "p-10 mb-[20px] bg-black-gradient-2 rounded-xl h-full">
        <div className='flex flex-row  py-[6px] px-6 bg-discount-gradient rounded-[10px] mb-10'><p className={`${styles.paragraph} ml-2`}>
          <span className="text-white">Calculate</span> Employee{" "}
          <span className="text-white">Tax</span>
        </p>
        </div>
      <Grid container spacing={2} className='flex flex-row  py-[6px] px-4 bg-white rounded-[10px] mb-5'>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={tax}
            
            getOptionLabel={(option) => option ? option.taxtype || '' : ''}
            value={formik.values.taxType}
            onChange={handleTaxTypeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Tax Type'
                variant='outlined'
                error={formik.touched.taxType && Boolean(formik.errors.taxType)}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField disabled
            fullWidth
            id='taxPay'
            name='taxPay'
            label='Tax Pay'
            value={formik.values.taxPay}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.taxPay && Boolean(formik.errors.taxPay)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={user}
            
            getOptionLabel={(option) => option ? option.fullname || '' : ''}
            value={formik.values.userName}
           onChange={handleUserChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Employee Name'
                variant='outlined'
                error={formik.touched.userName && Boolean(formik.errors.userName)}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField  disabled
            fullWidth
            id='userId'
            name='userId'
            label='Employee Id'
            value={formik.values.userId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userId && Boolean(formik.errors.userId)}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField  disabled
            fullWidth
            id='department'
            name='department'
            label='Employee Department'
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.department && Boolean(formik.errors.department)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField  disabled
            fullWidth
            id='basicSal'
            name='basicSal'
            label='Basic Salary'
            value={formik.values.basicSal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.basicSal && Boolean(formik.errors.basicSal)}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField  disabled
            fullWidth
            id='reduction'
            name='reduction'
            label='Reduction'
            value={formik.values.reduction}
            onChange={formik.handleChange}
            onBlur={formik.reduction}
            error={formik.touched.reduction && Boolean(formik.errors.reduction)}
          />
        </Grid>


          <Grid item xs={12}>

            <button

              className="w-56 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              type="submit">
              Add Calculation
            </button>

          </Grid>

        
      </Grid>
      </FormDisplayContainer>
    </form> 
  );
};

export default CalcUserTax;
