import axios from "axios";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // login implement
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    console.log("console in handle", username, password);
    // get auth token from api
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
      });
      const token = res.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-indigo-500">
        <div className="w-72 md:w-96 lg:w-96 px-6 py-10 shadow-lg bg-white rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold">
              Login
            </h1>
            <FaUser className="text-xl md:text-2xl" />
          </div>
          <hr className="my-4 md:my-6" />
          <form onSubmit={handleLogin}>
            <div className="mt-3">
              <label htmlFor="username" className="block text-base mb-2">
                Username
              </label>
              <input
                type="text"
                required
                id="username"
                name="username"
                className="border rounded-lg w-full text-base px-2 md:px-3 py-2 md:py-3 focus:outline-none focus:ring-1 focus:border-gray-400"
                placeholder="Enter Username"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="block text-base mb-2">
                Password
              </label>
              <input
                type="password"
                required
                id="password"
                name="password"
                className="border rounded-lg w-full text-base px-2 md:px-3 py-2 md:py-3 focus:outline-none focus:ring-1 focus:border-gray-400"
                placeholder="Enter Password"
              />
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="border-2 border-indigo-700 bg-indigo-700 text-white py-2 md:py-3 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
