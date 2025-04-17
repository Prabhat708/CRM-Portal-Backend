import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import logo from '../assets/crmloginlogo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const APP_URI = import.meta.env.VITE_API_BASE_URI;
    const { setUserData, setIsLoggedIn } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data) => {
        try {
            // Login API request
            const response = await fetch(`${APP_URI}/api/auth/login`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Login failed: Invalid credentials');

            // Fetch user data after successful login
            const userResponse = await fetch(`${APP_URI}/api/auth/me`, {
                method: 'GET',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
            });

            const userData = await userResponse.json();

            if (userData.status !== "success") {
                throw new Error("Unauthorized access");
            }

            // Set Auth Context Data
            setIsLoggedIn(true);
            setUserData(userData.user);

            navigate('/home');

        } catch (error) {
            console.error(" Login Error:", error.message);
            alert(error.message);
        }
    };// End onSubmit

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100 overflow-hidden">
            <div className="h-auto min-h-[50vh] w-[90%] max-w-[400px] bg-white p-8 rounded-lg shadow-lg border border-gray-300">

                {/* Logo Section */}
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Logo" className="w-full h-24 object-cover" />
                </div>

                {/* Welcome Text */}
                <h2 className="text-lg font-bold text-gray-800 text-center whitespace-nowrap">
                    Welcome on <span className='text-red-500'>CRM</span> Portal
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">Secure Access to Your Dashboard</p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum length is 6 chars" }
                            })}
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

// // // Apply styles to remove scrollbars
// document.documentElement.style.overflow = 'hidden';
// document.body.style.overflow = 'hidden';

export default Login;
