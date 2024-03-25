import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const {
    name,
    email,
    token
  } = window.localStorage || undefined;

  if (name && email && token) {
    window.location.href = "/dashboard"
    alert("Session found! Redirecting... If you want to login through another account, use logout")
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8081/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail,
          pass,
        }),
      })
      const data = await response.json()
      alert(`${data.status}: ${data.message}`)
      if (data.status.toLowerCase() == "success") {
        window.localStorage.setItem("email", data.mail)
        window.localStorage.setItem("name", data.name)
        window.localStorage.setItem("token", data._id)
        alert("Logined Successfully!")
        window.location.href = "/dashboard"
      }
    } catch (error) {
      alert(error.message)
      console.log(error.message)
    }
  }

  return (
    <form className="min-h-screen flex items-center justify-center" onSubmit={submit}>
      <div className="p-8 rounded shadow-lg w-96 halo">
        <h2 className="text-2xl text-black font-extrabold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email"
            onChange={(e) => setMail(e.target.value)}
            autoComplete='email'
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-800">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
            onChange={(e) => setPass(e.target.value)}
            maxLength={10}
            minLength={8}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
            required
          />
          <br />
          <br />
          <p className="text-white text-xs italic">Minimum 8 and maximum 10 characters, at Least One Uppercase Letter, One Lowercase letter, One Number and One Special Character</p>
        </div>
        <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Login
        </button>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-red-800 hover:underline mx-2">
            Don't have an account? SignUp!
          </Link>
          <br />
          <Link to="/forgotpass" className="text-red-800 hover:underline mx-2">
            Forgot Your Password? Click Here!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginPage; 