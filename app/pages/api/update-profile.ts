// pages/api/update-profile.ts

import type { NextApiRequest, NextApiResponse } from "next";

// This handler will handle the PUT request to update the user profile
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, firstName, lastName, bio } = req.body;

  try {
    const response = await fetch(`http://localhost:1337/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // Ensure this token is set in your environment
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        bio: bio,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ message: "Failed to update profile", error: data });
    }

    return res.status(200).json({ message: "Profile updated successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
