'use client'; // Make sure this is a client component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from "@/app/ui/logo";
import { LogOut } from "lucide-react";

export default function Header() {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const router = useRouter();

    // Function to check if the user is logged in and fetch their data
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        console.log("token",token);
        if (token) {
            try {
                const res = await fetch('http://localhost:1337/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData); // Set the user data (username, etc.)
                } else {
                    // Token is invalid, clear it and redirect to login
                    localStorage.removeItem('token');
                    setUser(null); // Clear user state
                    router.push('/login'); // Redirect to login
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                localStorage.removeItem('token');
                setUser(null); // Clear user state
                router.push('/login'); // Redirect to login
            }
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the JWT token
        setUser(null); // Clear the user state
        // Trigger a storage event to notify other components
        window.dispatchEvent(new Event("storage"));
        router.push('/'); // Redirect to home or login page
    };

    useEffect(() => {
        fetchUser(); // Fetch user data on component mount if token is present

        // Listen for changes in localStorage (e.g., login/logout)
        const handleStorageChange = () => {
            fetchUser();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="flex w-full h-24 bg-black p-3 text-white items-center justify-between">
            {/* Logo wrapped with Link to navigate to home */}
            <Link href="/">
                <div className="cursor-pointer">
                    <Logo />
                </div>
            </Link>

            <div className="flex items-center space-x-4 mr-8">
                {user ? (
                    <div className="flex items-center space-x-2">
                        {/* Display username as a link to the account page */}
                        <Link href="/dashboard/account">
                            <span className="text-white text-1xl cursor-pointer hover:underline">
                                {user.username}
                            </span>
                        </Link>
                        <LogOut onClick={handleLogout} className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
                    </div>
                ) : (
                    // Show Sign In button if not logged in
                    <Link href="/login">
                        <button className="px-4 py-2 bg-gray-200 text-black rounded-md">
                            Sign In
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
