import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassPage = () => {
  const [mail, setMail] = useState("");
  const [otp, setOtp] = useState("");
  const [pass, setPass] = useState("");
  const [req, setReq] = useState(true);

  const verify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/user/forgotpass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pass,
          mail,
        }),
      })
      const data = await response.json()
      alert(`${data.status}: ${data.message}`)
      if (data.status !== "FAILED") {
        setReq(false)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8081/user/forgotpass/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail,
          otp,
        }),
      })
      const data = await response.json()
      alert(`${data.status}: ${data.message}`)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form className="min-h-screen flex items-center justify-center" onSubmit={submit}>
    <div className="bg-white p-8 rounded shadow-lg w-96 halo">
      <h2 className="text-2xl text-gray-800 font-extrabold mb-6 text-center">Forgot Password</h2>
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
          required
          autoComplete='email'
        />
        <label htmlFor="password" className="block text-sm font-medium text-gray-800">
          New Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => setPass(e.target.value)}
          maxLength={10}
          minLength={8}
          placeholder="New Password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
          required
        />
        <br />
        <br />
        <p className="text-white text-xs italic">Minimum 8 and maximum 10 characters, at Least One Uppercase Letter, One Lowercase letter, One Number, and One Special Character</p>
      </div>

      <button onClick={verify} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Send OTP
      </button>

      <div className="mb-4">
        <label htmlFor="otp" className="block text-sm font-medium text-gray-800">
          OTP
        </label>
        <input
          type="text"
          id="otp"
          onChange={(e) => setOtp(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter OTP"
          disabled={req}
          required
        />
      </div>
      <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Forgot Password
      </button>
      <div className="mt-4 text-center">
        <Link to="/login" className="text-red-800 hover:underline mx-2">
          Already have an Account? Login.
        </Link>
      </div>
    </div>
  </form>
  );
};

export default ForgotPassPage;