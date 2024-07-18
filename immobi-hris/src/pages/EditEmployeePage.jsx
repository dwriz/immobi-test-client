import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const employeeResponse = await fetch(
          `http://localhost:3000/employees/${id}`
        );
        const employeeData = await employeeResponse.json();
        setName(employeeData.name);
        setAge(employeeData.age);
        setGender(employeeData.gender);
        setTanggalLahir(employeeData.tanggal_lahir.split("T")[0]);
        setAlamat(employeeData.alamat);
        const positionResponse = await fetch(
          `http://localhost:3000/positions/${employeeData.id_jabatan}`
        );
        const positionData = await positionResponse.json();
        setSelectedDepartment(positionData.id_department);
        setSelectedPosition(employeeData.id_jabatan);
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

    fetchEmployee();
    fetchDepartments();
  }, [id]);

  useEffect(() => {
    async function fetchPositions() {
      if (!selectedDepartment) {
        setPositions([]);
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/positions");
        const data = await response.json();
        const filteredPositions = data.filter(
          (position) =>
            parseInt(position.id_department) === parseInt(selectedDepartment)
        );
        setPositions(filteredPositions);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPositions();
  }, [selectedDepartment]);

  async function handleSubmit(event) {
    event.preventDefault();

    Swal.fire({
      title: "Please wait...",
      text: "Updating employee...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          id_jabatan: selectedPosition,
          age,
          gender,
          tanggal_lahir: tanggalLahir,
          alamat,
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee updated successfully",
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to update employee: ${data.message}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to update employee: ${error.message}`,
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Gender
            </span>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="L"
                  checked={gender === "L"}
                  onChange={(event) => setGender(event.target.value)}
                  className="form-radio"
                  required
                />
                <span className="ml-2">L</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="P"
                  checked={gender === "P"}
                  onChange={(event) => setGender(event.target.value)}
                  className="form-radio"
                  required
                />
                <span className="ml-2">P</span>
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="tanggal_lahir"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal Lahir
            </label>
            <input
              type="date"
              id="tanggal_lahir"
              value={tanggalLahir}
              onChange={(event) => setTanggalLahir(event.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="alamat"
              className="block text-sm font-medium text-gray-700"
            >
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              value={alamat}
              onChange={(event) => setAlamat(event.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="id_department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <select
              id="id_department"
              value={selectedDepartment}
              onChange={(event) => setSelectedDepartment(event.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select a department
              </option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.nama_department}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="id_jabatan"
              className="block text-sm font-medium text-gray-700"
            >
              Jabatan
            </label>
            <select
              id="id_jabatan"
              value={selectedPosition}
              onChange={(event) => setSelectedPosition(event.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={!selectedDepartment}
              required
            >
              <option value="" disabled>
                Select a position
              </option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.nama_jabatan}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployeePage;
