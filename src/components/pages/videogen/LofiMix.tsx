import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../config';

const LofiMix: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateMedia = async () => {
        setLoading(true);
        setError(null);
        setVideoUrl(null);

        try {
            const response = await axios.post(`${BASE_URL}/api/lofi-mix/generate-media`, { prompt });
            setVideoUrl(response.data.videoUrl);
        } catch (err) {
            setError('Failed to generate media.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen/ bg-/-100 p-4 relative">
            <div className='absolute w-full h-full flex justify-center items-center text-3xl bg-black/70'> Coming Soon.. </div>
            <h1 className="text-3xl font-bold text-gray-100 mb-6">Lofi Mix Generator</h1>

            <div className="w-full max-w-md">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a prompt for media generation"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                />
                <button
                    onClick={handleGenerateMedia}
                    disabled={loading}
                    className={`w-full mt-4 p-3 bg-blue-500 text-white rounded-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                >
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {videoUrl && (
                <div className="mt-6 w-full max-w-lg">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Your Generated Lofi Mix:</h3>
                    <video src={videoUrl} controls className="w-full rounded-lg shadow-md" />
                </div>
            )}
        </div>
    );
};

export default LofiMix;
