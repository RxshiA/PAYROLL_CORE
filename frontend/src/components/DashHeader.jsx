import { Link } from 'react-router-dom'
import { useState } from 'react';
import { close, logo, menu } from '../assets';

const DashHeader = () => {

    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);

    const mainnavLinks = [
        {
            id: "home",
            title: "Home",
            route: "/dash"
        },
        {
            id: "allowances",
            title: "Allowances",
            route: "/dash/allowances"
        },
        {
            id: "tax",
            title: "Tax",
            route: "/dash/tax"
        },
        {
            id: "attendance",
            title: "Attendance",
            route: "/dash/attendance"
        },
        {
            id: "loan",
            title: "Loan",
            route: "/dash/loan"
        },
        {
            id: "performance",
            title: "Performance",
            route: "/dash/performance"
        },
        {
            id: "salary",
            title: "Salary",
            route: "/dash/salary"
        },
        {
            id: "leave",
            title: "Leave",
            route: "/dash/leaves"
        }
    ];

    return (
        <nav className="w-full flex py-6 justify-between items-center navbar">
            <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />

            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                {mainnavLinks.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                            } ${index === mainnavLinks.length - 1 ? "mr-0" : "mr-10"}`}
                        onClick={() => setActive(nav.title)}
                    >
                        <Link to={nav.route}>{nav.title}</Link>
                    </li>
                ))}
            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
                <img
                    src={toggle ? close : menu}
                    alt="menu"
                    className="w-[28px] h-[28px] object-contain"
                    onClick={() => setToggle(!toggle)}
                />

                <div
                    className={`${!toggle ? "hidden" : "flex"
                        } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                >
                    <ul className="list-none flex justify-end items-start flex-1 flex-col">
                        {mainnavLinks.map((nav, index) => (
                            <li
                                key={nav.id}
                                className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                                    } ${index === mainnavLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                onClick={() => setActive(nav.title)}
                            >
                                <Link to={nav.route}>{nav.title}</Link>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default DashHeader