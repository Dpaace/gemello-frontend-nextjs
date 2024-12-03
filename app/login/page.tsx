


'use client';

import Link from "next/link";
import Image from 'next/image';
import { useState } from "react";
import { useRouter } from 'next/navigation';  // Import the useRouter hook

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();  // Initialize the router

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const userLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");

        try {
            const formData = new FormData(event.currentTarget);
            const jsonData = Object.fromEntries(formData);
            console.log(jsonData);

            const reqOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            };

            const req = await fetch('http://localhost:1337/api/auth/local/', reqOptions);
            const res = await req.json();

            if (res.error) {
                setMessage(res.error.message);
                return;
            }

            if (res.jwt && res.user) {
                console.log(res.jwt);
                // Store JWT token in localStorage
                localStorage.setItem('token', res.jwt);

                setMessage('Login Successful');

                // Redirect to dashboard after successful login
                router.push('/dashboard');
            }
        } catch (error) {
            setMessage("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="w-[400px] h-[550px] flex flex-col items-center bg-white rounded-lg">
            <h1 className="font-bold text-2xl mt-4">
                Sign In:
            </h1>
            <div className="h-full w-full max-w-xs">
                <form onSubmit={userLogin}>
                    <br />
                    <input type="text" id="identifier" name="identifier" placeholder="Email or Username" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    <br />
                    <div className="w-full relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                            {showPassword ? (
                                <Image src="https://img.icons8.com/?size=100&id=7278&format=png&color=000000" alt="Hide" width={25} height={25} />
                            ) : (
                                <Image src="https://img.icons8.com/?size=100&id=986&format=png&color=000000" alt="Show" width={25} height={25} />
                            )}
                        </button>
                    </div>

                    <br />
                    <Link href="#" className="underline">Forgot your password?</Link>
                    <br />
                    <div className="text-red-500 text-sm">{message}</div>
                    <br />
                    <button type="submit" className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
                        Sign In
                    </button>
                </form>
                <br />
                <p>Don&apos;t have an account yet? <Link href="/register" className="underline">Sign up</Link></p>
                <br />
                <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-px w-2/5 my-8 bg-black border-0"></div>
                    or
                    <div className="h-px w-2/5 my-8 bg-black border-0"></div>
                </div>
                <br />
                <button type="submit" className="flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5">
                    <Image
                        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                        alt="google image"
                        width={30}
                        height={30}
                    />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
