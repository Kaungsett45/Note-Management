import { useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import API from "../api/axiosConfig";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Registered successfully!");
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };



  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
    <form className="w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
         value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 w-full mb-4 rounded"
      />
      <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
        Register
      </button>
    </form>
  
  </div>
</div>
  );

}
export default Register;