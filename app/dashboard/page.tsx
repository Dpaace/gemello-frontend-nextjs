
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
    const [loadingFiles, setLoadingFiles] = useState<{ [key: string]: boolean }>({});
    const [loadedFiles, setLoadedFiles] = useState<{ [key: string]: boolean }>({});
    const [loadedFileURLs, setLoadedFileURLs] = useState<{ [key: string]: string | null }>({});
    const router = useRouter();


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
        setLoadingFiles((prev) => ({ ...prev, [fileName]: true }));
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
                setLoadedFileURLs((prev) => ({ ...prev, [fileName]: `FileExtracts/${fileName}/Assetbundle` }));
                setLoadedFiles((prev) => ({ ...prev, [fileName]: true }));
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
                    setLoadedFileURLs((prev) => ({ ...prev, [fileName]: `FileExtracts/${fileName}/Assetbundle` }));
                    setLoadedFiles((prev) => ({ ...prev, [fileName]: true }));
                } else {
                    alert(data.error);
                }
            }
        } catch (error) {
            alert('An error occurred while loading the file.');
            console.error(error);
        } finally {
            setLoadingFiles((prev) => ({ ...prev, [fileName]: false }));
        }
    };

    const handleStop = (fileName: string) => {
        // Unmount the Unity instance for the specific gemello
        setLoadedFiles((prev) => ({ ...prev, [fileName]: false }));
        setLoadedFileURLs((prev) => ({ ...prev, [fileName]: null }));
        window.location.reload();
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
                // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col  gap-4">
                    {userData.gemellos.map((gemello) => (
                        <div key={gemello.id} className="flex justify-between items-center bg-gray-50 w-[400px] shadow-lg rounded-lg p-4">
                            <h2 className="font-bold text-xl mb-2">{gemello.title}</h2>
                            <p><strong>ID:</strong> {gemello.id}</p>
                            {/* <p><strong>UUID:</strong> {gemello.uuid}</p> */}
                            {gemello.assetbundle && gemello.assetbundle.length > 0 && (
                                <ul>
                                    {gemello.assetbundle.map((asset) => (
                                        <li key={asset.id}>
                                            {/* URL:
                                            <a href={`http://localhost:1337${asset.url}`} target="_blank" className="text-blue-500 underline">
                                                {asset.url}
                                            </a> */}
                                            <button
                                                onClick={() => handleLoad(`http://localhost:1337${asset.url}`, `${gemello.uuid}`)}
                                                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg relative"
                                                disabled={loadingFiles[gemello.uuid]}
                                            >
                                                {loadingFiles[gemello.uuid] ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    loadedFiles[gemello.uuid] ? 'Reload' : 'Load'
                                                )}
                                            </button>
                                            {loadedFiles[gemello.uuid] && loadedFileURLs[gemello.uuid] && (
                                                <button
                                                    onClick={() => handleStop(`${gemello.uuid}`)}
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
            {Object.values(loadedFiles).some((isLoaded) => isLoaded) && Object.values(loadedFileURLs).some((fileURL) => fileURL) && (
                (() => {
                    const loadedKey = Object.keys(loadedFileURLs).find(key => loadedFiles[key]);
                    if (loadedKey && loadedFileURLs[loadedKey]) {
                        return <NewIndexPage fileURL={loadedFileURLs[loadedKey] as string} />;
                    }
                    return null;
                })()
            )}

            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                Logout
            </button>
        </div>
    );
}
