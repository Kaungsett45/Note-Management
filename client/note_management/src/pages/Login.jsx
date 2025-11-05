import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";


function Login() {

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    try{
    const res =await API.post("/auth/login",form);
    const token = res.data.token;
    localStorage.setItem("token", token);
    console.log("JWT Token: in login", token);

   
    alert("Login successful!");
    navigate("/dashboard");

    }catch(error){
         alert(error.response?.data?.message || "Login failed");
    }
  }


  return(

    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
    <form className="w-full" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 w-full mb-2 rounded"
      />
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full rounded pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Hide" : "Visible"}
        </button>
      </div>
      <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
        <NavLink to="/register" className="mt-4 text-blue-500 hover:underline">
              Don't have an account? Register
            </NavLink>
  </div>
</div>

      </>
  )
}




export default Login;