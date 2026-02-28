import React from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/forgot-password", data);
      if (res?.data?.success) {
        toast.success(res.data.message, { duration: 3000 });
        navigate("/login");
      } else {
        toast.error(res.data.message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { duration: 3000 });
    }
  };

  return (
    <Layout title={"Confizio - Reset Password"}>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white shadow-[0_20px_50px_rgba(155,0,32,0.15)] rounded-[2.5rem] p-10 w-full max-w-md border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-800 to-red-600"></div>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-700 mb-4 shadow-inner">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Recover Account</h2>
            <p className="mt-2 text-gray-500 font-medium">Verify your identity to reset password</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Registered Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-red-100 focus:outline-none transition-all duration-200 bg-gray-50 text-sm font-medium ${
                  errors.email ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 italic font-bold uppercase ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Secret Recovery Key</label>
              <input
                type="text"
                id="recovery_key"
                placeholder="Enter your recovery key"
                {...register("recovery_key", { required: "Recovery key is required" })}
                className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-red-100 focus:outline-none transition-all duration-200 bg-gray-50 text-sm font-medium ${
                  errors.recovery_key ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.recovery_key && <p className="text-red-500 text-[10px] mt-1 italic font-bold uppercase ml-1">{errors.recovery_key.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Secure Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Minimum 6 characters"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Must be at least 6 characters" },
                })}
                className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-red-100 focus:outline-none transition-all duration-200 bg-gray-50 text-sm font-medium ${
                  errors.newPassword ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.newPassword && <p className="text-red-500 text-[10px] mt-1 italic font-bold uppercase ml-1">{errors.newPassword.message}</p>}
            </div>

            <div className="pt-4 space-y-4">
              <button
                type="submit"
                className="w-full py-4 px-4 text-white font-extrabold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-red-900/20 uppercase tracking-widest text-xs"
                style={{ backgroundColor: "#9B0020" }}
              >
                Update Credentials
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-red-700 transition-colors py-2"
              >
                Return to Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
