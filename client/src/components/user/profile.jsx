import React from "react"
import {
    Link
} from "react-router-dom"

const ProfilePage = () => {
    const {
        name,
        email,
        token
    } = window.localStorage || undefined;

    if (!name || !email || !token) {
        window.location.href = "/login"
        alert("No Session found! Redirecting to Login...")
    }

    const logout = () => {
        window.localStorage.clear()
        window.location.href = "/login"
    }

    return (
        <React.Fragment>
            <div className="flex h-screen">
                <div className="flex flex-col w-full">
                    <div className="w-full h-20 bg-transparent font-extrabold text-indigo-500 border-b-4 border-indigo-500">
                        <div className="flex justify-between items-center h-full">
                            <div className="flex items-center ml-8">
                                <h1 className="font-headingM text-3xl">
                                    Weirdo Writes
                                </h1>
                            </div> 
                            <div className="flex items-center m-4">
                                <Link to="/dashboard">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex m-8 justify-center h-1/4">
                        <div className="bg-scroll bg-transparent text-red-800">
                            <h1 className="font-headingM font-extrabold text-5xl">
                                Profile Details
                            </h1>
                        </div>
                    </div>
                    <div className="flex m-8 justify-center h-1/4">
                        <div className="bg-scroll bg-transparent text-white">
                            <h1 className="font-headingM font-extrabold text-5xl smallT">
                                Name: {name}
                            </h1>
                            <br />
                            <h1 className="font-headingM font-extrabold text-5xl smallT"> 
                                Email: {email}
                            </h1>
                            <br />
                            <h1 className="font-headingM font-extrabold text-5xl smallT"> 
                                ID: {token}
                            </h1>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button
                            onClick={() => logout()}
                            style={{
                                backgroundColor: "red",
                                padding: "10px",
                                borderRadius: "25px",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfilePage