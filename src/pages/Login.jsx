import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { getFirebaseErrorMessage } from "../helper/firebaseErrors";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Successfully logged in");
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (err) {
            toast.error(getFirebaseErrorMessage(err));
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={loginUser}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm flex flex-col gap-6"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

                <div>
                    <label className="block text-sm text-gray-600">Email</label>
                    <input
                        placeholder="you@domain.com"
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        aria-label="Email"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600">Password</label>
                    <div className="relative">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="border border-gray-300 rounded-lg p-3 w-full pr-12 focus:outline-none"
                            aria-label="Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                            {showPassword ? (
                                <IoEyeOff className="text-[1.3rem] cursor-pointer" />
                            ) : (
                                <IoMdEye className="text-[1.3rem] cursor-pointer" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className={`${isLoading && "cursor-not-allowed"} bg-black/50 hover:bg-black transition-colors text-white w-full p-3 rounded-lg font-medium mt-4`}
                    disabled={isLoading}>
                    {isLoading ? "Logging..." : "Login"}
                </button>
            </form>
        </div>
    );
}
