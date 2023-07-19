import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button, ButtonGroup} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create.js";
import DeleteIcon from "@mui/icons-material/Delete.js";

function SalaryTbl(search) {
  const [dataTable, setDataTable] = useState([]);
  const [editId, setId] = useState(-1);

    useEffect(() => {
        axios
            .get("http://localhost:3500/salary")
            .then((res) => {
                setDataTable(res.data);
            })
            .catch(() => {
                alert(err.message);
            });
    }, []);

  return (

            <div class="overflow-hidden">
              <table
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white rounded-xl h-full mt-3">

                <thead>
                <tr>
                  <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    ID
                  </th>

                  <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Name
                  </th>

                  <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Year
                  </th>

                  <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Month
                  </th>

                  <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Department
                  </th>

                  <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Salary
                  </th>

                  <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase'>
                    Action
                  </th>


                </tr>
                </thead>
                <tbody>
                {dataTable
                    .filter(async (item) => {
                        const userData = await axios.get(
                            `http://localhost:3500/users/${item.user}`
                        );
                        console.log(search.toLowerCase() + " search salaryTbl.jsx");
                        console.log(
                            userData.data.fullname.toLowerCase() + " fullname salaryTbl.jsx"
                        );
                        return search === " "
                            ? item
                            : userData.data.fullname
                                .toLowerCase()
                                .includes(search.toLowerCase());
                    })
                    .map((item, index) => (
                        <TableRow item={item} />
                    ))}
                </tbody>
              </table>
            </div>

  );
}

const TableRow = ({ item }) => {

    const userId = item.user;
    const navigate = useNavigate();
    const [details, setDetails] = useState("");
    const month = new Date(details.month).toLocaleString("default", {
        month: "long",
    });
    console.log(month + "month - salarytbl.jsx");

    useEffect(() => {
        axios
            .get(`http://localhost:3500/users/${userId}`)
            .then((res) => {
                setDetails(res.data);
            })
            .catch((err) => console.log(err));
    }, [userId]);


    const handleEdit = (id) => {
    axios
      .get(`http://localhost:3500/salary/edit/${id}`)
      .then((res) => {
        // console.log(res.data._id + "handleEdit - salaryTbl");
        navigate(`/dash/salary/edit/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    console.log(id + " delete id ");
    axios
      .delete(`http://localhost:3500/salary/${id}`)
      .then((res) => {
          location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr key={item.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
        {details.empid}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
        {details.fullname}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">

      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
          {month}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
        {details.department}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-500">
          {item.basicsal}
      </td>

      <ButtonGroup>
        <Button
            style={{
              marginRight: 5,
              backgroundColor: '#4CAF50',
              color: '#fff',
              marginTop: 5
            }}
            onClick={() => handleEdit(item._id)}
            sx={{ mt: 'auto' }} >
          <CreateIcon />
        </Button>

        <Button
            style={{ backgroundColor: 'Red', color: '#fff' }}
            onClick={() => handleDelete(item._id)}
            sx={{ mt: 'auto' }}>
          <DeleteIcon />
        </Button>
      </ButtonGroup>
    </tr>
  );
};

export default SalaryTbl;
