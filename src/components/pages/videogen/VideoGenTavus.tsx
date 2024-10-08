import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PrimaryButton from '../../utils/PrimaryButton';

function VideoGenTavus() {
    const [prompt, setPrompt] = useState<string>('');
    const [theme, setTheme] = useState<string>('fantasy');
    const [tone, setTone] = useState<string>('sarcastic');
    const [ageGroup, setAgeGroup] = useState<string>('kids (5 - 12)');
    const [duration, setDuration] = useState<string>('50');
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
    const [generatedScript, setGeneratedScript] = useState<string>('Your script will be shown here');
    const [error, setError] = useState<string>('');
    const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [isFetchingVideo, setIsFetchingVideo] = useState<boolean>(false);
    // const [isVideoGenerating, setIsVideoGenerating] = useState<boolean>(false);

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    useEffect(() => {
        if (generatedPrompt) {
            console.log(generatedPrompt);
        }
    }, [generatedPrompt]);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }

        setError('');

        const result = `You are a professional storyteller. Write a creative, engaging, and concise comedy story of about ${duration} words. The story should be told in a natural, flowing style, without any formatting elements, such as hashtags, character names, stage directions, or script cues. The text should read like a story written for an audience, not a script or screenplay. Keep the tone light and ${tone}, suitable for specific audience as ${ageGroup}, the theme of the story will be ${theme} and make sure the narrative is entertaining from start to finish. The topic of the story will be: ${prompt}`;

        setGeneratedPrompt(result);

        try {
            setIsGeneratingScript(true);
            const response = await model.generateContent(result);
            const script = response.response.text();
            setGeneratedScript(script);

            await generateVideo(script);
        } catch (error) {
            console.error('Error generating script:', error);
            setError('Failed to generate script. Please try again.');
        } finally {
            setIsGeneratingScript(false);
        }
    };

    const generateVideo = async (script: string) => {
        setIsGeneratingVideo(true);
        setIsGeneratingScript(false);

        const options = {
            method: 'POST',
            url: 'https://tavusapi.com/v2/videos',
            headers: {
                'x-api-key': import.meta.env.VITE_TAVUS_API_KEY,
                'Content-Type': 'application/json',
            },
            data: {
                replica_id: 'r79e1c033f', 
                script: script,
                video_name: 'Comedy Show',
                background_url: '', 
            },
        };

        try {
            const response = await axios.request(options);
            const videoId = response.data.video_id;

            if (!videoId) {
                console.error('Invalid video ID received:', videoId);
                setError('Failed to retrieve video ID.');
                return;
            }

            console.log('Video ID:', videoId);
            fetchVideo(videoId);
        } catch (error) {
            console.error('Error generating video:', error);
            setError('Failed to generate video. Please try again.');
        } finally {
            setIsGeneratingVideo(false);
        }
    };

    const fetchVideo = async (videoId: string) => {
        setIsFetchingVideo(true);
        // setIsVideoGenerating(true);
        const MAX_ATTEMPTS = 100;
        const POLLING_INTERVAL = 5000;
        let attempts = 0;

        const checkVideoStatus = async () => {
            if (attempts >= MAX_ATTEMPTS) {
                setError('Failed to fetch video. Please try again later.');
                setIsFetchingVideo(false);
                // setIsVideoGenerating(false);
                return;
            }

            attempts++;
            const options = {
                method: 'GET',
                url: `https://tavusapi.com/v2/videos/${videoId}`,
                headers: {
                    'x-api-key': import.meta.env.VITE_TAVUS_API_KEY,
                },
            };

            try {
                const response = await axios.request(options);
                const resultUrl = response.data.download_url;
                const status = response.data.status;

                console.log('GET Response:', response.data);

                if (status !== 'ready') {
                    console.log(`Video is ${status}, waiting...`);
                    setTimeout(checkVideoStatus, POLLING_INTERVAL);
                } else if (status === 'ready' && resultUrl) {
                    setVideoUrl(resultUrl);
                    setIsFetchingVideo(false);
                    // setIsVideoGenerating(false);
                } else {
                    console.log('Unexpected status:', status);
                    setError('Failed to retrieve video URL.');
                    setIsFetchingVideo(false);
                    // setIsVideoGenerating(false);
                }
            } catch (error) {
                console.error('Error fetching video:', error);
                setError('Failed to fetch video. Please try again.');
                setIsFetchingVideo(false);
                // setIsVideoGenerating(false);
            }
        };

        checkVideoStatus();
    };

    return (
        <div className="flex flex-col justify-center items-center/ xl:h-screen w-screen/ pt-24/ md:px-20">
            <div className='flex flex-col xl:flex-row items-center h-fit xl:h-full w-full pb-16'>
                <div className="flex-1 flex flex-col justify-normal xl:h-full items-center space-y-4 px-12 md:px-16 py-8">
                    <div className='text-2xl md:text-4xl uppercase font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent pb-8'>
                        Generate Your Comedy Show
                    </div>
                    
                    <div className='w-full h-[200px] md:h-[100px] md:focus-within:h-[160px] duration-500 relative p-[1px] bg-gradient-to-br from-red-400 from-30% via-indigo-400 to-purple-400 rounded-sm'>
                        {error && <p className="text-red-500 absolute -top-8">{error}</p>}
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter your prompt"
                            className="border/ outline-none p-2 h-full w-full resize-none rounded-sm"
                            required />
                    </div>

                    <div className='flex flex-col md:grid grid-cols-2 gap-4 w-full'>
                        {/* <div className='w-full h-fit focus-within:h-[160px] duration-500 relative p-[1px] bg-gradient-to-br from-red-400 to-indigo-400 rounded-sm'> */}
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="border p-2">
                            <option value="fantasy">Fantasy</option>
                            <option value="science fiction">Science Fiction</option>
                            <option value="fairy tale">Fairy Tale</option>
                            <option value="slice of life">Slice Of Life</option>
                        </select>
                        {/* </div> */}

                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="border p-2">
                            <option value="sarcastic">Sarcastic</option>
                            <option value="hilarious">Hilarious</option>
                            <option value="silly">Silly</option>
                            <option value="dark comedy">Dark Comedy</option>
                        </select>

                        <select
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value)}
                            className="border p-2">
                            <option value="kids (5 - 12)">Kids (5 - 12)</option>
                            <option value="teens (13 - 18)">Teens (13 - 18)</option>
                            <option value="adults (18 - 35)">Adults (18 - 35)</option>
                        </select>

                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="border p-2">
                            <option value="50">30 Seconds</option>
                            <option value="100">1 Minute</option>
                            <option value="150">1 Minute 30 Seconds</option>
                            <option value="200">2 Minutes</option>
                        </select>
                    </div>

                    <div className='h-fit w-full py-2'>
                        <div className='w-full h-[2px] bg-white/30'></div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        className="w-full px-1"
                        disabled={isGeneratingScript || isGeneratingVideo}>
                        <PrimaryButton label={isGeneratingScript ? 'Generating Script...' : isGeneratingVideo ? 'Generating Video...' : 'Generate'} />
                    </button>

                    <div className='h-fit w-full py-4'>
                        <div className='w-full h-[2px] bg-white/50'></div>
                    </div>

                    <div className="p-4 xl:flex-1 border mt-4 w-full h-[200px] xl:h-full overflow-y-auto bg-black/50 text-gray-400 overflow-hidden">{generatedScript}</div>
                </div>
                {/* <div className='py-40 h-full'> <div className='h-full w-[2px] bg-neutral-500' /> </div> */}
                <div className="xl:flex-1 flex flex-col w-3/4 justify-center items-center h-96 xl:h-full bg-neutral-800 rounded-xl">
                    {videoUrl ? "" : "Your Video Here"}
                    {isFetchingVideo ? (
                        <p className="text-blue-500">Loading video...</p>
                    ) : (
                        videoUrl && (
                            <div className="p-4 border/ mt-4/ gap-y-2">
                                <p>Video generated successfully!</p>
                                <video controls src={videoUrl} className="w-full max-h-[480px] mt-2 mb-4" />
                                <a href={videoUrl} download className="bg-green-500 text-white p-2 rounded">
                                    Download Video
                                </a>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoGenTavus;