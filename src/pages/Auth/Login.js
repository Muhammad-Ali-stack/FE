import React from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const Login = () => {
  // Initialize the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("api/auth/login", data);
      if (res.data.success) {
        toast.success(res.data.message);
        // Save the token or user data to localStorage or context
        localStorage.setItem("token", res.data.token);
  
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        // Redirect to the home page
        // navigate("/");
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // Show backend error message if available
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout title={"Confizio - Login"}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-50 mb-6 shadow-inner">
              <svg className="w-10 h-10 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="mt-3 text-gray-500 font-medium">Please enter your details to sign in</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-widest" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`appearance-none relative block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-700 focus:z-10 sm:text-sm transition-all duration-200 bg-gray-50 ${
                    errors.email ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 italic">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-widest" htmlFor="password">Password</label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs font-bold text-red-700 hover:text-red-800 transition-colors uppercase tracking-widest"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`appearance-none relative block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-700 focus:z-10 sm:text-sm transition-all duration-200 bg-gray-50 ${
                    errors.password ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 italic">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-extrabold rounded-2xl text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-red-900/20"
                style={{ backgroundColor: "#9B0020" }}
              >
                Sign In to Dashboard
              </button>
            </div>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-500 font-medium">
              New to Confizio?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-bold text-red-700 hover:text-red-800 transition-colors underline decoration-2 underline-offset-4"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
