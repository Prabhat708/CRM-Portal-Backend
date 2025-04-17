import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AddUser = () => {
  const API_URI = import.meta.env.VITE_API_BASE_URI;
  const navigate = useNavigate();
  const { userData, isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn || userData?.user?.role !== "admin") {
    alert("Access denied. Admins only.");
    navigate("/home");
    return null;
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch(`${API_URI}/api/users/add`, {
        method: "POST",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
      const result = await response.json();
      if (response.ok) {
        alert("User added successfully!");
        navigate("/home");
      } else {
        alert( result.message);
      }
    } catch (error) {
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Add New User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
