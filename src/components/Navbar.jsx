import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">TaskMaster</h1>
        <ul className="flex gap-4">
          <li><Link to="/" className="hover:underline">Dashboard</Link></li>
          <li><Link to="/login" className="hover:underline">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
