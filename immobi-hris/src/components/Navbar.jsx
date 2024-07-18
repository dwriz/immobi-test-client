import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">
        <Link to="/">Immobi HRIS</Link>
      </div>
      <div className="space-x-4">
        <Link
          to="/add-department"
          className="text-white hover:bg-gray-700 px-3 py-2 rounded"
        >
          Add Department
        </Link>
        <Link
          to="/add-position"
          className="text-white hover:bg-gray-700 px-3 py-2 rounded"
        >
          Add Position
        </Link>
        <Link
          to="/add-employee"
          className="text-white hover:bg-gray-700 px-3 py-2 rounded"
        >
          Add Employee
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
