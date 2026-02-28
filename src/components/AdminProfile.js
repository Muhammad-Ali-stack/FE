import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { useAuth } from "../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
import Sidebar from "./AdminSidebar";

const Profile = () => {
  // Context and states
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Pre-fill user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Your Profile">
      <div className="relative flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8 lg:p-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="h-32 bg-gradient-to-r from-red-900 to-red-700" style={{ backgroundColor: "#9B0020" }}></div>
            <div className="px-8 pb-12 -mt-16">
              <div className="relative flex flex-col items-center sm:flex-row sm:items-end sm:space-x-5">
                <div className="relative group">
                  <div className="h-32 w-32 rounded-2xl ring-4 ring-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg">
                    <img src="/admin.jpg" alt="Admin Profile" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="mt-6 sm:mt-0 flex-1 text-center sm:text-left">
                  <h2 className="text-3xl font-extrabold text-gray-900">{name}</h2>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Super Administrator</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Admin Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="Admin"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Admin Email (Locked)</label>
                  <input
                    type="email"
                    value={email}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed shadow-sm"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Direct Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="+1 (234) 567-890"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Office Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="Official Address"
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-900/20"
                    style={{ backgroundColor: "#9B0020" }}
                  >
                    Update Administrator Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
