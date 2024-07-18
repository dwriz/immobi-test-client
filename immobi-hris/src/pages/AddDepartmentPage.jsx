import { useState } from "react";
import Swal from "sweetalert2";

function AddDepartmentPage() {
  const [namaDepartment, setNamaDepartment] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    Swal.fire({
      title: "Loading",
      text: "Adding department...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("http://localhost:3000/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama_department: namaDepartment }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Department added successfully",
        });
        setNamaDepartment("");
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to add department: ${
            errorData.message || response.statusText
          }`,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to add department: ${error.message}`,
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Department</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama_department"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Department
            </label>
            <input
              type="text"
              id="nama_department"
              value={namaDepartment}
              onChange={(event) => setNamaDepartment(event.target.value)}
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

export default AddDepartmentPage;
