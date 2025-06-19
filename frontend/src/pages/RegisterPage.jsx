// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const RegisterPage = () => {

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/auth/register", form);
//       console.log("User registered successfully:", response.data);
//       // Optional: Redirect user or show success message
//     } catch (error) {
//       console.error("Registration failed:", error.response?.data || error.message);
//       // Optional: Show error to user
//     }
//     // Add backend integration logic here
//     // console.log("Registering user:", form);
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-white">

//       {/* Register Form */}
//       <section className="flex flex-col items-center justify-center flex-grow px-4 py-16 bg-blue-50">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">Create an Account</h2>
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6"
//         >
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Role</label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="student">student</option>
//               <option value="coordinator">coordinator</option>
//               <option value="admin">admin</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Register
//           </button>

//           <p className="text-sm text-center text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 font-medium hover:underline">
//               Login here
//             </Link>
//           </p>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default RegisterPage;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", form);
      console.log("User registered successfully:", response.data);
      // Optional: Redirect user or show success message
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      // Optional: Show error to user
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Register Form */}
      <section className="flex flex-col items-center justify-center flex-grow px-4 py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Create an Account</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">student</option>
              <option value="coordinator">coordinator</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
