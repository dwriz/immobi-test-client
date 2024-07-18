import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function LandingPage() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch("http://localhost:3000/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchDepartments() {
      try {
        const response = await fetch("http://localhost:3000/departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchPositions() {
      try {
        const response = await fetch("http://localhost:3000/positions");
        const data = await response.json();
        setPositions(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDepartments();
    fetchPositions();
    fetchEmployees();
  }, []);

  function getDepartmentName(id_jabatan) {
    const position = positions.find((pos) => pos.id === id_jabatan);
    const department = departments.find(
      (dept) => dept.id === position.id_department
    );
    return department.nama_department;
  }

  function getPositionName(id) {
    const position = positions.find((pos) => pos.id === id);
    return position.nama_jabatan;
  }

  async function handleDelete(employeeId) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/employees/${employeeId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire("Deleted!", "Your employee has been deleted.", "success");
          fetchData();
        } else {
          Swal.fire("Error!", "Failed to delete employee.", "error");
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Employee List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Lahir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jabatan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(employee.tanggal_lahir).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.alamat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getDepartmentName(employee.id_jabatan)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPositionName(employee.id_jabatan)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
