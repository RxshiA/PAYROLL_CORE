import { useState, useEffect } from "react"
import { useFormik } from 'formik';
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

const API_URL='http://localhost:3500/allowances/';

const EditAllowanceForm = () => {

    const params = useParams()

    const[allowance, setAllowance] = useState([])

    const id = params.id

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:3500/allowances/"+id).then((res)=>{
            setAllowance(res.data);
            console.log(res.data)
        }).catch(()=>{
            alert(err.message);
        }) 
    },[])

    const formik = useFormik({

        initialValues: {
            empid: allowance.empid,
            fullname: allowance.fullname,
            department: allowance.department,
            type: allowance.type,
            allowancepay: allowance.allowancepay
          },
          enableReinitialize: true,

        onSubmit:async(values)=>{

            try{ 

                await axios.patch(
                    "http://localhost:3500/allowances/"+id,
                    {
                        empid: values.empid,
                        fullname: values.fullname,
                        department: values.department,
                        type: values.type,
                        allowancepay: values.allowancepay,
                    }
                    

                );
                 
                  Swal.fire({
                        icon: 'success',
                     title: 'Allowance Updated successfully!'
                  });
                 navigate('/dash/allowances');
                
            }catch(error){
                console.log(error.response);
                console.log(values.empid,values.allowancepay,)
            }
        }

    })

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

    return(
        <>
            <div className="block max-w-full rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-500 mx-auto mt-8">
                <h2>Edit Allowance</h2><br />
                <form onSubmit={formik.handleSubmit} className="form mx-auto mt-8">
                    <div className="grid grid-cols-2 gap-4">

                        {/* EmployeeID input */}
                        <div className="relative mb-12" data-te-input-wrapper-init>

                            <div className="my-3">
                                <label className="block text-md mb-2" htmlFor="email">Employee ID</label>
                                <input className="border border-gray-300 rounded-md px-4 py-2 w-full invalid:focus:border-red-500" 
                                    id="empid"
                                    name="empid"
                                    label="empid" 
                                    value={formik.values.empid || ''} 
                                    onChange={formik.handleChange} 
                                    onBlur={validateEmpid()}
                                    error={formik.touched.empid && Boolean(formik.errors.empid)}
                                />
                            </div>
                            <small
                                id="empidHelp"
                                className="absolute w-full text-neutral-500 dark:text-neutral-200"
                                data-te-input-helper-ref>
                                Enter a valid Employee ID(No more than 5 characters) </small>
                        </div>

                        {/* Full Name input */}
                        <div className="relative mb-12" data-te-input-wrapper-init>
                            <div className="my-3">
                                <label className="block text-md mb-2" htmlFor="email">Full Name</label>
                                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" 
                                    id="fullname"
                                    name="fullname"
                                    label="fullname"  
                                    value={formik.values.fullname || ''} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                />
                            </div>
                        </div>

                        {/* Department input */}
                        <div className="relative mb-12" data-te-input-wrapper-init>
                            <div className="my-3">
                                <label className="block text-md mb-2" htmlFor="email">Department</label>
                                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" 
                                    id="department"
                                    name="department"
                                    label="department" 
                                    value={formik.values.department || ''} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.department && Boolean(formik.errors.department)}
                                />
                            </div>
                        </div>

                        {/* Type input */}
                        <div className="relative mb-12" data-te-input-wrapper-init>
                            <div className="my-3">
                                <label className="block text-md mb-2" htmlFor="email">Allowance Type</label>
                                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" 
                                    id="type"
                                    name="type"
                                    label="type" 
                                    value={formik.values.type || ''} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Allowancepay input */}
                    <div className="relative mb-12" data-te-input-wrapper-init>
                        <div className="my-3">
                            <label className="block text-md mb-2" htmlFor="email">Allowance Amount</label>
                            <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" 
                                id="allowancepay"
                                name="allowancepay"
                                label="allowancepay" 
                                value={formik.values.allowancepay || ''} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                error={formik.touched.allowancepay && Boolean(formik.errors.allowancepay)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between center">
                        <button
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            type="submit"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div >

        </>
    )
}

export default EditAllowanceForm