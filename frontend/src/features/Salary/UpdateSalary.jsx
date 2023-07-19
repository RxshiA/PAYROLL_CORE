import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "../../style.js";
import {Grid, TextField} from "@mui/material";

const FormDisplayContainer = styled.div``;

function UpdateSalary() {
    const [name, setName] = useState([]);
    const { id } = useParams();
    const [values, setValues] = useState("");
    const [basicsal, setbasicsal] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:3500/salary/${id}`)
            .then((res) => {
                setValues(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        if (values.user) {
            axios
                .get(`http://localhost:3500/users/${values.user}`)
                .then((res) => {
                    setName(res.data.fullname);
                })
                .catch((err) => console.log(err));
        }
    }, [values]);

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log(id + "id- updatesalary");
        axios
            .patch(`http://localhost:3500/salary/${id}`, {
                salary: basicsal,
                user: values.user,
            })
            .then((res) => {
                console.log(res);
                console.log("handleUpdate - updateSalary.js");
            })
            .catch((err) => console.log(err));
    };
  return (

      <form onSubmit={handleUpdate}>
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
                         id="base-input"
                         name="base-input"
                         label="Employee ID"
                         value={name}
                         InputProps={{
                             readOnly: true
                         }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  id="small-input"
                  name="small-input"
                  label="Basic Salary"
                  defaultValue={values.basicsal}
                  onChange={(e) => {
                    setbasicsal(e.target.value);
                  }}

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

  );
}

export default UpdateSalary;
