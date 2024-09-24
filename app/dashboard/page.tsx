// 'use client';

// import { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';
// import NewIndexPage from "../ui/gemello/newindex";
// import LoadingSpinner from "@/app/ui/components/LoadingSpinner"; // Adjust the path as necessary

// interface AssetBundle {
//     id: number;
//     name: string;
//     url: string;
// }

// interface Gemello {
//     id: number;
//     title: string;
//     createdAt: string;
//     updatedAt: string;
//     publishedAt: string;
//     uuid: string;
//     assetbundle: AssetBundle[];
// }

// interface UserData {
//     id: number;
//     username: string;
//     email: string;
//     provider: string;
//     confirmed: boolean;
//     blocked: boolean;
//     createdAt: string;
//     updatedAt: string;
//     firstname: string;
//     lastname: string;
//     gemellos: Gemello[];
// }

// export default function Page() {
//     const [userData, setUserData] = useState<UserData | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [loadingFile, setLoadingFile] = useState<string | null>(null); // Track loading file by ID
//     const router = useRouter();

//     // Fetch user data from the API
//     const fetchUserData = async () => {
//         const token = localStorage.getItem('token');

//         if (!token) {
//             router.push('/');
//             return;
//         }

//         try {
//             const reqOptions = {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             };

//             const req = await fetch('http://localhost:1337/api/users/me?populate[gemellos][populate]=assetbundle', reqOptions);
//             const res: UserData = await req.json(); 

//             if ((res as any).error) {
//                 setError((res as any).error.message);
//                 router.push('/');
//                 return;
//             }

//             setUserData(res);
//         } catch (error) {
//             setError('Failed to fetch user data. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         router.push('/');
//     };

//     const handleExtract = async (zipUrl: string, fileName: string) => {
//         setLoadingFile(fileName); // Set loading file
//         try {
//             const response = await fetch('/api/extract-zip', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ zipUrl, fileName }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert(data.message);
//             } else {
//                 alert(data.error);
//             }
//         } catch (error) {
//             alert('An error occurred while extracting the zip file.');
//             console.error(error);
//         } finally {
//             setLoadingFile(null); // Reset loading file
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>; 
//     }

//     if (error) {
//         return <div className="text-red-500">{error}</div>;
//     }

//     return (
//         <div className="flex flex-col items-center">
//             <h1 className="font-bold text-3xl mb-4">Dashboard Home Page</h1>
//             {userData && (
//                 <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-8">
//                     <p><strong>Username:</strong> {userData.username}</p>
//                     <p><strong>Email:</strong> {userData.email}</p>
//                     <p><strong>First Name:</strong> {userData.firstname}</p>
//                     <p><strong>Last Name:</strong> {userData.lastname}</p>
//                 </div>
//             )}
//             {userData?.gemellos && userData.gemellos.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {userData.gemellos.map((gemello) => (
//                         <div key={gemello.id} className="bg-white shadow-md rounded-lg p-4">
//                             <h2 className="font-bold text-xl mb-2">{gemello.title}</h2>
//                             <p><strong>ID:</strong> {gemello.id}</p>
//                             <p><strong>UUID:</strong> {gemello.uuid}</p>
//                             {gemello.assetbundle && gemello.assetbundle.length > 0 && (
//                                 <ul>
//                                     {gemello.assetbundle.map((asset) => (
//                                         <li key={asset.id}>
//                                             URL:
//                                             <a href={`http://localhost:1337${asset.url}`} target="_blank" className="text-blue-500 underline">
//                                                 {asset.url}
//                                             </a>
//                                             <button
//                                                 onClick={() => handleExtract(`http://localhost:1337${asset.url}`, `${gemello.uuid}`)}
//                                                 className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg relative"
//                                                 disabled={loadingFile === `${gemello.uuid}`} // Disable while loading
//                                             >
//                                                 {loadingFile === `${gemello.uuid}` ? (
//                                                     <LoadingSpinner /> // Circular loader component
//                                                 ) : (
//                                                     'Extract'
//                                                 )}
//                                             </button>
//                                             <br />
//                                             <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg">Load</button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {/* <NewIndexPage fileURL="FileExtracts/v7q70emqbxyrn79r/Assetbundle" /> */}
//             <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
//                 Logout
//             </button>
//         </div>
//     );
// }

// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================

// 'use client';

// import { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';
// import NewIndexPage from "../ui/gemello/newindex";
// import LoadingSpinner from "@/app/ui/components/LoadingSpinner"; // Adjust the path as necessary

// interface AssetBundle {
//     id: number;
//     name: string;
//     url: string;
// }

// interface Gemello {
//     id: number;
//     title: string;
//     createdAt: string;
//     updatedAt: string;
//     publishedAt: string;
//     uuid: string;
//     assetbundle: AssetBundle[];
// }

// interface UserData {
//     id: number;
//     username: string;
//     email: string;
//     provider: string;
//     confirmed: boolean;
//     blocked: boolean;
//     createdAt: string;
//     updatedAt: string;
//     firstname: string;
//     lastname: string;
//     gemellos: Gemello[];
// }

// export default function Page() {
//     const [userData, setUserData] = useState<UserData | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [loadingFile, setLoadingFile] = useState<string | null>(null); // Track loading file by ID
//     const [fileURL, setFileURL] = useState<string | null>(null); // To dynamically load Unity instance
//     const router = useRouter();

//     // Fetch user data from the API
//     const fetchUserData = async () => {
//         const token = localStorage.getItem('token');

//         if (!token) {
//             router.push('/');
//             return;
//         }

//         try {
//             const reqOptions = {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             };

//             const req = await fetch('http://localhost:1337/api/users/me?populate[gemellos][populate]=assetbundle', reqOptions);
//             const res: UserData = await req.json();

//             if ((res as any).error) {
//                 setError((res as any).error.message);
//                 router.push('/');
//                 return;
//             }

//             setUserData(res);
//         } catch (error) {
//             setError('Failed to fetch user data. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         router.push('/');
//     };

//     const handleLoad = async (zipUrl: string, fileName: string) => {
//         setLoadingFile(fileName); // Set loading file
//         try {
//             // Check if the folder is already extracted
//             // const checkResponse = await fetch(`/api/check-folder?folderName=${fileName}`); 
//             const checkResponse = await fetch(`/api/check-folder`, {
//                 method: 'POST', // Update to POST or any other method your API expects
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ folderName: fileName }), // Send folderName in the body
//             });

//             const { folderExists } = await checkResponse.json();

//             if (!folderExists) {
//                 // If folder doesn't exist, extract the zip file
//                 const extractResponse = await fetch('/api/extract-zip', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ zipUrl, fileName }),
//                 });

//                 const data = await extractResponse.json();

//                 if (!extractResponse.ok) {
//                     alert(data.error);
//                     return;
//                 }

//                 alert('File extracted successfully.');
//             }

//             // After extraction or if folder already exists, load the Unity instance
//             setFileURL(`FileExtracts/${fileName}/Assetbundle`);
//         } catch (error) {
//             alert('An error occurred while loading the file.');
//             console.error(error);
//         } finally {
//             setLoadingFile(null); // Reset loading file
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div className="text-red-500">{error}</div>;
//     }

//     return (
//         <div className="flex flex-col items-center">
//             <h1 className="font-bold text-3xl mb-4">Dashboard Home Page</h1>
//             {userData && (
//                 <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-8">
//                     <p><strong>Username:</strong> {userData.username}</p>
//                     <p><strong>Email:</strong> {userData.email}</p>
//                     <p><strong>First Name:</strong> {userData.firstname}</p>
//                     <p><strong>Last Name:</strong> {userData.lastname}</p>
//                 </div>
//             )}
//             {userData?.gemellos && userData.gemellos.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {userData.gemellos.map((gemello) => (
//                         <div key={gemello.id} className="bg-white shadow-md rounded-lg p-4">
//                             <h2 className="font-bold text-xl mb-2">{gemello.title}</h2>
//                             <p><strong>ID:</strong> {gemello.id}</p>
//                             <p><strong>UUID:</strong> {gemello.uuid}</p>
//                             {gemello.assetbundle && gemello.assetbundle.length > 0 && (
//                                 <ul>
//                                     {gemello.assetbundle.map((asset) => (
//                                         <li key={asset.id}>
//                                             URL:
//                                             <a href={`http://localhost:1337${asset.url}`} target="_blank" className="text-blue-500 underline">
//                                                 {asset.url}
//                                             </a>
//                                             <button
//                                                 onClick={() => handleLoad(`http://localhost:1337${asset.url}`, `${gemello.uuid}`)}
//                                                 className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg relative"
//                                                 disabled={loadingFile === `${gemello.uuid}`} // Disable while loading
//                                             >
//                                                 {loadingFile === `${gemello.uuid}` ? (
//                                                     <LoadingSpinner /> // Circular loader component
//                                                 ) : (
//                                                     'Load'
//                                                 )}
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {/* Dynamically load the NewIndexPage with the extracted file URL */}
//             {fileURL && <NewIndexPage fileURL={fileURL} />}
//             <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
//                 Logout
//             </button>
//         </div>
//     );
// }


'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import NewIndexPage from "../ui/gemello/newindex";
import LoadingSpinner from "@/app/ui/components/LoadingSpinner"; // Adjust the path as necessary

interface AssetBundle {
    id: number;
    name: string;
    url: string;
}

interface Gemello {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    uuid: string;
    assetbundle: AssetBundle[];
}

interface UserData {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstname: string;
    lastname: string;
    gemellos: Gemello[];
}

export default function Page() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loadingFile, setLoadingFile] = useState<string | null>(null); // Track loading file by ID
    const [isLoaded, setIsLoaded] = useState<boolean>(false); // State to track if the Unity instance is loaded
    const [loadedFileURL, setLoadedFileURL] = useState<string | null>(null); // To store the loaded Unity instance URL
    const router = useRouter();

    // Fetch user data from the API
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/');
            return;
        }

        try {
            const reqOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const req = await fetch('http://localhost:1337/api/users/me?populate[gemellos][populate]=assetbundle', reqOptions);
            const res: UserData = await req.json(); 

            if ((res as any).error) {
                setError((res as any).error.message);
                router.push('/');
                return;
            }

            setUserData(res);
        } catch (error) {
            setError('Failed to fetch user data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    const handleLoad = async (zipUrl: string, fileName: string) => {
        setLoadingFile(fileName); // Set loading file
        try {
            // Check if the folder exists
            const checkResponse = await fetch(`/api/check-folder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ folderName: fileName }),
            });

            const checkData = await checkResponse.json();

            if (checkData.exists) {
                // If the folder exists, load the Unity instance
                setLoadedFileURL(`FileExtracts/${fileName}/Assetbundle`);
                setIsLoaded(true); // Set Unity instance as loaded
            } else {
                // If the folder does not exist, handle extraction logic
                const extractResponse = await fetch('/api/extract-zip', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ zipUrl, fileName }),
                });

                const data = await extractResponse.json();

                if (extractResponse.ok) {
                    alert(data.message);
                    setLoadedFileURL(`FileExtracts/${fileName}/Assetbundle`);
                    setIsLoaded(true); // Set Unity instance as loaded
                } else {
                    alert(data.error);
                }
            }
        } catch (error) {
            alert('An error occurred while loading the file.');
            console.error(error);
        } finally {
            setLoadingFile(null); // Reset loading file
        }
    };

    const handleStop = () => {
        // Unmount the Unity instance by setting isLoaded to false
        setIsLoaded(false);
        setLoadedFileURL(null); // Clear the loaded file URL
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl mb-4">Dashboard Home Page</h1>
            {userData && (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-8">
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>First Name:</strong> {userData.firstname}</p>
                    <p><strong>Last Name:</strong> {userData.lastname}</p>
                </div>
            )}
            {userData?.gemellos && userData.gemellos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.gemellos.map((gemello) => (
                        <div key={gemello.id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="font-bold text-xl mb-2">{gemello.title}</h2>
                            <p><strong>ID:</strong> {gemello.id}</p>
                            <p><strong>UUID:</strong> {gemello.uuid}</p>
                            {gemello.assetbundle && gemello.assetbundle.length > 0 && (
                                <ul>
                                    {gemello.assetbundle.map((asset) => (
                                        <li key={asset.id}>
                                            URL:
                                            <a href={`http://localhost:1337${asset.url}`} target="_blank" className="text-blue-500 underline">
                                                {asset.url}
                                            </a>
                                            <button
                                                onClick={() => handleLoad(`http://localhost:1337${asset.url}`, `${gemello.uuid}`)}
                                                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg relative"
                                                disabled={loadingFile === `${gemello.uuid}`} // Disable while loading
                                            >
                                                {loadingFile === `${gemello.uuid}` ? (
                                                    <LoadingSpinner /> // Circular loader component
                                                ) : (
                                                    isLoaded ? 'Reload' : 'Load'
                                                )}
                                            </button>
                                            {isLoaded && loadedFileURL && (
                                                <button
                                                    onClick={handleStop}
                                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Stop
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {isLoaded && loadedFileURL && (
                <NewIndexPage fileURL={loadedFileURL} />
            )}
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                Logout
            </button>
        </div>
    );
}


