"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileForm } from "@/components/ui/forms/ProfileForm";
import { updateProfileAction } from "@/app/api/update-profile/updateProfileAction";  // Import the update action

export default function AccountRoute() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch user data
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      router.push('/'); // Redirect if token is not present
      return;
    }

    try {
      const response = await fetch('http://localhost:1337/api/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        throw new Error('Failed to fetch user data.');
      }

      const data = await response.json();
      setUserData({
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstname || '',
        lastName: data.lastname || '',
        bio: data.bio || '',
      });
    } catch (error) {
      setError('Unable to fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (formData: any) => {
    if (!userData) return;
    await updateProfileAction(userData.id, formData);  // Pass the form data and user ID to update action
  };

  useEffect(() => {
    fetchUserData(); // Fetch the user data when component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
      Account Page
      {userData && (
        <ProfileForm 
          data={userData} 
          className="col-span-3" 
          onSubmit={handleUpdateProfile} // Pass the handleUpdateProfile to ProfileForm
        />
      )}
    </div>
  );
}
