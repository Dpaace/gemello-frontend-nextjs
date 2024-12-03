"use client"; // Marking the component as a Client Component

import React, { useRef } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import { FaFolderPlus } from "react-icons/fa"; // Importing folder with plus icon

const spaces = [
  { id: 1, name: "Space 1", description: "Description for Space 1" },
  { id: 2, name: "Space 2", description: "Description for Space 2" },
  { id: 3, name: "Space 3", description: "Description for Space 3" },
  // Add more spaces as needed
];

export default function AllSpacesPage() {
//   const router = useRouter(); // Initialize useRouter
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input when folder icon is clicked
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/zip") {
      // Handle ZIP file upload (you can implement actual upload functionality here)
      console.log("Uploaded file:", file.name);
    } else {
      console.log("Please upload a ZIP file.");
    }
  };

  // Navigate to a new page when the Load button is clicked
  const handleLoadClick = (id: number) => {
    router.push(`/spaces/${id}/load`); // Dynamically navigate to the load page for that space
  };

  const handleExportClick = (id: number) => {
    // You can implement export functionality here
    console.log(`Exporting space ${id}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>All Spaces</h1>
        <FaFolderPlus
          style={styles.folderIcon}
          onClick={handleIconClick}
          title="Upload ZIP file"
        />
        <input
          type="file"
          ref={fileInputRef}
          style={styles.hiddenInput}
          accept=".zip"
          onChange={handleFileChange}
        />
      </div>

      <ul style={styles.list}>
        {spaces.map((space) => (
          <li key={space.id} style={styles.listItem}>
            <h2 style={styles.spaceName}>{space.name}</h2>
            <p style={styles.spaceDescription}>{space.description}</p>

            {/* Buttons for Export and Load */}
            <div style={styles.buttonGroup}>
              <button
                style={styles.exportButton}
                onClick={() => handleExportClick(space.id)}
              >
                Export
              </button>
              <button
                style={styles.loadButton}
                onClick={() => handleLoadClick(space.id)}
              >
                Load
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
  },
  folderIcon: {
    fontSize: "24px",
    cursor: "pointer",
    color: "black",
  },
  hiddenInput: {
    display: "none",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "40px",
    margin: "10px 0",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer", // Make cursor a pointer on hover
    transition: "background-color 0.2s ease",
  },
  spaceName: {
    margin: 0,
    color: "#0070f3",
  },
  spaceDescription: {
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  exportButton: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  loadButton: {
    backgroundColor: "#d3d3d3",
    color: "#000",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
