'use client';

import { useEffect, useRef, useState } from 'react';

const NewIndexPage = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const fullscreenButtonRef = useRef<HTMLDivElement | null>(null);
    const warningBannerRef = useRef<HTMLDivElement | null>(null);
    const [assetBundleFiles, setAssetBundleFiles] = useState<string[]>([]);


    useEffect(() => {
        // Unity configuration object with dynamic paths
        const config = {
            dataUrl: '/Gemello/Build/WebGLBuild.data',
            frameworkUrl: '/Gemello/Build/WebGLBuild.framework.js',
            codeUrl: '/Gemello/Build/WebGLBuild.wasm',
            streamingAssetsUrl: '/Gemello/StreamingAssets',
            companyName: 'SmartScape',
            productName: 'Gemello',
            productVersion: '0.1',
        };

        console.log('Unity config:', config); // Log the Unity config for debugging

        // Show loading bar
        if (progressBarRef.current) {
            progressBarRef.current.style.display = 'block';
        }

        // Load Unity loader script dynamically
        const loaderUrl = '/Gemello/Build/WebGLBuild.loader.js';

        console.log('Loading Unity loader script from:', loaderUrl); // Log loader URL

        const script = document.createElement('script');
        script.src = loaderUrl;

        script.onload = () => {
            console.log('Unity loader script loaded successfully.');
            // Initialize Unity instance
            // @ts-ignore
            createUnityInstance(canvasRef.current, config, (progress: number) => {
                if (progressBarRef.current) {
                    progressBarRef.current.style.width = `${100 * progress}%`;
                }
            })
                .then((unityInstance: any) => {
                    // Hide loading bar
                    if (progressBarRef.current) {
                        progressBarRef.current.style.display = 'none';
                    }

                    // Set fullscreen button behavior
                    if (fullscreenButtonRef.current) {
                        fullscreenButtonRef.current.onclick = () => {
                            unityInstance.SetFullscreen(1);
                        };
                    }

                    // Create the contentsBaseURL from asset bundle files
                    // const contentsBaseURL = assetBundleFiles.join(',');
                    const contentsBaseURL =  "http://localhost:4100/files/Assetbundle/Assetbundle";

                    console.log('Sending files to Unity with base URL:', contentsBaseURL);

                    // Pass the contentsBaseURL to Unity
                    unityInstance.SendMessage('Loader', 'StartGetData', contentsBaseURL);

                })
                .catch((message: string) => {
                    alert(message);
                });
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [assetBundleFiles]);

    return (
        <div id="unity-container" className="unity-desktop">
            <canvas
                ref={canvasRef}
                id="unity-canvas"
                className="w-[1000px] h-[600px] z-20"
            ></canvas>
            <div
                id="unity-loading-bar"
                ref={progressBarRef}
                className="flex items-center justify-center bg-gray-200"
            >
                <div id="gemello-logo"></div>
                <div id="unity-progress-bar-empty" className="relative w-full">
                    <div
                        id="unity-progress-bar-full"
                        className="absolute bg-blue-500 h-full"
                    ></div>
                </div>
            </div>
            <div id="unity-warning" ref={warningBannerRef}></div>
            <div id="unity-footer" className="flex items-center justify-between">
                <div id="unity-webgl-logo"></div>
                <div
                    id="unity-fullscreen-button"
                    ref={fullscreenButtonRef}
                    className="cursor-pointer"
                ></div>
                <div id="unity-build-title">Gemello Local New</div>
            </div>
        </div>
    );
};

export default NewIndexPage;