export const updateProfileAction = async (userId, formData) => {
  try {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
    };

    // Retrieve JWT token from localStorage (or session, or cookies)
    const token = localStorage.getItem("token"); // Assuming you store JWT here

    // Make sure the token exists
    if (!token) {
      return { message: "You are not authenticated!" };
    }

    // Make the PUT request with the JWT token in the Authorization header
    const response = await fetch(`http://localhost:1337/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include the JWT token here
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      return { message: "Failed to update. Please try again.", error: errorData };
    }

    // Return success message
    return { message: "Profile updated successfully!" };
  } catch (error) {
    console.log("Error:", error);
    return { message: "An error occurred. Please try again." };
  }
};
