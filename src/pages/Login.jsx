import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const loginUser = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("Result from Firebase", result);
            toast.success("Successfully logged in");
            navigate("/");
            return;
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>

                <label className="block text-sm mb-1 text-gray-600">Email</label>
                <input
                    placeholder="you@domain.com"
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    aria-label="Email"
                />

                <label className="block text-sm mt-4 mb-1 text-gray-600">Password</label>
                <div className="relative">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="border border-gray-300 rounded-lg p-3 w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Password"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-pressed={showPassword}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 focus:outline-none"
                        title={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3-11-7 1.044-2.205 2.7-3.967 4.77-5.172M3 3l18 18M10.58 10.58A3 3 0 0113.42 13.42" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                            </svg>
                        )}
                    </button>
                </div>

                <button
                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white w-full p-3 rounded-lg mt-6 font-medium"
                    onClick={loginUser}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
