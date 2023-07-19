import React, { useState } from "react";
import SalaryTbl from "./SalaryTbl";
import SalarySearch from "./SalarySearch";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import styles from "../../style.js";
import AddIcon from "@mui/icons-material/Add.js";
import Person2Icon from "@mui/icons-material/Person2.js";
import styled from "styled-components";

const TaxDisplayContainer = styled.div``;

function SalaryManagement() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/dash/salary/add');
  };

  return (
      <TaxDisplayContainer className= "p-10 mb-[20px] bg-black-gradient-2 rounded-xl h-full">
        <div className='flex flex-row  py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-5'>
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">Salary</span> Management{" "}
            <span className="text-white">System</span>
          </p>

          <Button
              style={{
                marginRight: 5,
                backgroundColor: '#3D3D43',

                color: '#fff',
                marginTop: 5,
                marginLeft: "auto"
              }}
              onClick = {handleAdd}
              sx={{ mt: 'auto' }} >
            <AddIcon />
          </Button>

        </div>

          <div className="flex flex-col ">
              <div className="-m-1.5 overflow-x-auto">
                  <div className='p-1.5 min-w-full inline-block align-middle'>
                      <SalaryTbl search={search} />
                  </div>
              </div>
          </div>
      </TaxDisplayContainer>
  );
}

export default SalaryManagement;
