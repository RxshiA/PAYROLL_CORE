import Layout from "./components/Layout";
import LandingHome from "./components/LandingPage/LandingHome";
import AllowancesList from "./features/allowances/AllowancesList";
import NewUser from "./features/users/NewUser";
import EditUserForms from "./features/users/EditUserForms";
import UsersList from "./features/users/UsersList";
import AddTax from "./features/tax/AddTax";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/Auth/Welcome";
import { Route, Routes } from "react-router-dom";
import EditAllowanceForm from "./features/allowances/EditAllowanceForm";
import NewAllowance from "./features/allowances/NewAllowance";
import Prefetch from "./features/auth/Prefetch";
import SalaryManagement from "./features/Salary/SalaryManagement";
import UpdateSalary from "./features/Salary/UpdateSalary";
import TaxTable from "./features/tax/TaxTabl";
import TaxUsersTable from "./features/taxUsers/TaxUsers"
import UpdateTaxForm from "./features/tax/UpdateTax";
import LoanTest from "./features/loan/LoanTest";
import AttendanceTable from "./features/attendance/AttendanceTbl";
import AddAttendanceForm from "./features/attendance/AddAttendance";
import UpdateAttendanceForm from "./features/attendance/UpdateAttendance";
import CalcUserTax from "./features/taxUsers/CalcTax";
import LeaveTable from "./features/leaves/LeaveTable";
import AddLeaves from "./features/leaves/AddLeaves";
import UpdateLeaveForm from "./features/leaves/UpdateLeaves";
import AddLoanForm from "./features/loan/AddLoan";
import UpdateLoanForm from "./features/loan/UpdateLoan";
import AddSalary from "./features/Salary/AddSalary";

const App = () => (

    <Routes>
      <Route path="/" element={<Layout/>} />
      <Route index element={<LandingHome />} />

      <Route path="login" >
        <Route index element={<Login />} />
      </Route>

      <Route element={<Prefetch />}>
        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":edit/:id" element={<EditUserForms />} />
              <Route path="new" element={<NewUser />} />
            </Route>

            <Route path="allowances">
              <Route index element={<AllowancesList />} />
              <Route path="edit/:id" element={<EditAllowanceForm />} />
              <Route path="new" element={<NewAllowance />} />
            </Route> 
 
            <Route path="leaves">
            <Route index element={<LeaveTable />} />
            <Route path="new" element={<AddLeaves />} />
            <Route path="edit/:id" element={<UpdateLeaveForm />} />
              
            </Route>

          <Route path="salary">
            <Route index element={<SalaryManagement />} />
            <Route path="edit/:id" element={<UpdateSalary />} />
            <Route path="add" element={<AddSalary />} />
          </Route>

            <Route path="loan">
              <Route index element={<LoanTest />} />
              <Route path="new" element={<AddLoanForm />} />
              <Route path="edit/:id" element={<UpdateLoanForm />} />
            </Route>

            <Route path="attendance">
              <Route index element={<AttendanceTable/>}/>
              <Route path="new" element={<AddAttendanceForm />} />
              <Route path="edit/:id" element={<UpdateAttendanceForm/>} /> 
            </Route>

            <Route path="tax">
                <Route index element={<TaxTable />} />
                <Route path="new" element={<AddTax />} />
                <Route path="edit/:id" element={<UpdateTaxForm />} />          
            </Route>

            <Route path="taxUsers">
              <Route index element={<TaxUsersTable />} /> 
              <Route path="calc" element={<CalcUserTax />} />           
            </Route>

        </Route>
        {/* End Dash */}
    </Route>
  </Routes>
);

export default App;
