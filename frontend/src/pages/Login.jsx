import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { data } from 'autoprefixer';


function Login() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      
     
      const response = await fetch("/api/auth/signin", {
        method:"POST", 
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      
      
      if(data.success === false){
       toast.error(`Something Went Wrong : ${data.message}`)
        return ;
      }
     toast.success("Sign in success")
      navigate("/")
    } catch (error) {
      toast.error(`Something Went Wrong : ${data.message}`)
    }
   }



  const handleChange = (e) => {

    setFormData({
      ...formData, 
      [e.target.id] : e.target.value
    })}

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Welcome back</div>
        <h2 className="text-2xl leading-tight font-bold text-gray-900 mb-5">Log in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input type="email" onChange={handleChange} id="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password"  onChange={handleChange} id="password" name="password" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <button  disabled={loading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {loading ? 'Loading...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;