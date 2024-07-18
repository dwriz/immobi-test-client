import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function AddPositionPage() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [namaJabatan, setNamaJabatan] = useState("");

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch("http://localhost:3000/departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDepartments();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    Swal.fire({
      title: "Loading",
      text: "Adding position...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("http://localhost:3000/positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_department: selectedDepartment,
          nama_jabatan: namaJabatan,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Position added successfully",
        });
        setSelectedDepartment("");
        setNamaJabatan("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to add position: ${
            data.message || response.statusText
          }`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to add position: ${error.message}`,
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Position</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                Select department
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
              htmlFor="nama_jabatan"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Jabatan
            </label>
            <input
              type="text"
              id="nama_jabatan"
              value={namaJabatan}
              onChange={(event) => setNamaJabatan(event.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
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

export default AddPositionPage;
