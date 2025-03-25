import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    // try {
    //   const response = await axios.post(
    //     "https://your-api.com/api/admin/login",
    //     { email, password },
    //     { withCredentials: true }
    //   );

    //   if (response.data.success) {
    //     sessionStorage.setItem("isAdmin", JSON.stringify(response.data.admin));
    //     navigate("/admin/dashboard"); // Redirect after login
    //   } else {
    //     setError(response.data.message);
    //   }
    // } catch (err) {
    //   setError("Invalid credentials or server error");
    // }

    const admin = 'admin@gmail.com'
    const pass = 'pass'

    if(email === admin && password === pass){
      navigate('/dashboard')
    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-md text-cyan-400 mb-8">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-slate-300  focus:outline-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-slate-300 focus:outline-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
