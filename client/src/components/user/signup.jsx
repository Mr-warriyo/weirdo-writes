import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [mail, setMail] = useState("");
  const [otp, setOtp] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [req, setReq] = useState(true);

  const submit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8081/user/signup/verify", {
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

  const sendOtp = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8081/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pass,
          name,
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

  return (
    <form className="min-h-screen flex items-center justify-center" onSubmit={submit}>
      <div className="bg-white p-8 rounded shadow-lg w-96 halo">
        <h2 className="text-2xl text-gray-800 font-extrabold mb-6 text-center">Signup</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-800">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            autoComplete='on'
            required
          />
          
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email"
            onChange={(e) => setMail(e.target.value)}
            autoComplete='email'
            required
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-800">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
            maxLength={10}
            minLength={8}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
            autoComplete='off'
            required
          />
          <br />
          <br />
          <p className="text-white text-xs italic">Minimum 8 and maximum 10 characters, at Least One Uppercase Letter, One Lowercase letter, One Number, and One Special Character</p>
        </div>

        <button onClick={sendOtp} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Verify Mail
        </button>

        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-800">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter OTP"
            autoComplete='off'
            onChange={(e) => setOtp(e.target.value)}
            disabled={req}
            required
          />
        </div>
       
        <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Signup
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

export default SignupPage;