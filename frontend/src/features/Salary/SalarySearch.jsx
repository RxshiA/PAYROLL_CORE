import React, { useState } from 'react'

function SalarySearch({onChange}) {  
    
  return (
    <input className='justify-start' type='text' 
    placeholder='Emp.Id' 
    onChange={onChange}/>
  )
}

export default SalarySearch