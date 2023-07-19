import React from 'react'
import styles from '../../style'
import { Link } from 'react-router-dom'
import { atom } from '../../assets'

const Welcome = () => {
    return (

        <div className={`flex md:flex-row flex-col ${styles.paddingY}`}>

            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
                <div className="flex flex-row items-center py-[6px] px-4 bg-atom-gradient rounded-[10px] mb-2">
                    <img src={atom} alt="atom" className="w-[32px] h-[32px]" />
                    <p className={`${styles.paragraph} ml-2`}>

                        <span className="text-white">Salary</span> for{" "}
                        <span className="text-white">This</span> Month
                    </p>
                </div>

                <h1><span className="text-white">Welcome!</span></h1>

                <p><span className="text-white"><Link to="/dash/allowances">View allowances</Link></span></p>

                <p><span className="text-white"><Link to="/dash/allowances/new">Add New Allowance</Link></span></p>

                <p><span className="text-white"><Link to="/dash/users">View User Settings</Link></span></p>

                <p><span className="text-white"><Link to="/dash/users/new">Add New User</Link></span></p>

                <p><span className="text-white"><Link to="/dash/loans">View Loan Settings</Link></span></p>

                <p><span className="text-white"><Link to="/dash/loans/new">Add New Loan</Link></span></p>

                <div className={`flex flex-row justify-between items-center w-full ${styles.paddingY}`}>
                    <h1 className="flex-1 font-poppins font-semibold ss:text-[16px] text-[10px] text-white ss:leading-[30px] leading-[10px]">
                        Net Salary: <br className="sm:block hidden" />{" "}
                        <span className="text-gradient">Allowances: </span>{" "}
                    </h1>
                </div>

                <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">

                </h1>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                </p>
            </div>

            <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>

                {/* gradient start */}
                <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
                <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
                <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
                {/* gradient end */}
            </div>
        </div>
    )
}

export default Welcome