import React from "react";
import Layout from "../../components/Layout";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Register = () => {
  // Get query parameters
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role"); // Fetch role from the query parameter
  const conferenceName = searchParams.get("conferenceName"); // Fetch role from the query parameter
  const conferenceId = searchParams.get("conferenceId"); // Fetch role from the query parameter
  const isReviewer = role === "reviewer";
  const [expertiseOptions, setExpertiseOptions] = useState([]); // Store expertise list

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Needed to update checkbox state properly
    watch, // Allows real-time updates
  } = useForm({
    defaultValues: {
      expertise: [],
    },
  });
  const navigate = useNavigate();
  // Fetch conference expertise
  useEffect(() => {
    const fetchConference = async () => {
      try {
        const res = await axios.get(
          `/api/conference/get-conference/${conferenceId}`
        );
        setExpertiseOptions(res.data.expertise); // Assuming expertise is an array
      } catch (error) {
        console.error("Error fetching conference:", error);
        toast.error("Something went wrong while fetching conference details");
      }
    };

    if (conferenceId) fetchConference();
  }, [conferenceId]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data, // Existing form data
        conferenceName,
        conferenceId,
        role,
      };
      const res = await axios.post("api/auth/register", payload);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        duration: 3000,
      });
    }
  };

  return (
    <Layout title={"Confizio - Register"}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 my-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-50 mb-6 shadow-inner">
              <svg className="w-10 h-10 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
            <p className="mt-3 text-gray-500 font-medium">Join our global community of researchers</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className={`block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-700 transition-all bg-gray-50 ${
                    errors.name ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                  required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 italic">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-700 transition-all bg-gray-50 ${
                    errors.email ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 italic">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "At least 6 characters",
                    },
                  })}
                  className={`block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-700 transition-all bg-gray-50 ${
                    errors.password ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                  required
                />
                {errors.password && <p className="text-red-500 text-xs mt-1 italic">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+1 (234) 567-890"
                  {...register("phone", { required: "Phone is required" })}
                  className={`block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-700 transition-all bg-gray-50 ${
                    errors.phone ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                  required
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 italic">{errors.phone.message}</p>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">Mailing Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="123 Conference Way, City, Country"
                  {...register("address", { required: "Address is required" })}
                  className={`block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-700 transition-all bg-gray-50 ${
                    errors.address ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                  required
                />
                {errors.address && <p className="text-red-500 text-xs mt-1 italic">{errors.address.message}</p>}
              </div>
            </div>

            {isReviewer && Array.isArray(expertiseOptions) && expertiseOptions.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">Areas of Specialization</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {expertiseOptions.map((expertise, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-red-200 transition-all shadow-sm">
                      <input
                        type="checkbox"
                        id={`expertise-${index}`}
                        {...register("expertise")}
                        value={expertise}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                      />
                      <label htmlFor={`expertise-${index}`} className="text-sm font-medium text-gray-700 cursor-pointer">{expertise}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-widest">Secret Recovery Key</label>
              <input
                type="text"
                id="recovery_key"
                placeholder="Memorable phrase for password reset"
                {...register("recovery_key", { required: "Recovery Key is required" })}
                className={`block w-full px-4 py-4 border placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-700 transition-all bg-gray-50 ${
                  errors.recovery_key ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                }`}
                required
              />
              {errors.recovery_key && <p className="text-red-500 text-xs mt-1 italic">{errors.recovery_key.message}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-extrabold rounded-2xl text-white transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-red-900/20"
                style={{ backgroundColor: "#9B0020" }}
              >
                {isReviewer ? "Register as Reviewer" : "Create Account"}
              </button>
            </div>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-bold text-red-700 hover:text-red-800 transition-colors underline decoration-2 underline-offset-4"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
