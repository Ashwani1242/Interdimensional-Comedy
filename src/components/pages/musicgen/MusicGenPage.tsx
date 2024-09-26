import { useState } from 'react';
import axios from 'axios';
import PrimaryButton from '../../utils/PrimaryButton';

function MusicGenPage() {
    const [prompt, setPrompt] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [lyrics, setLyrics] = useState<string>('');
    const [instrumental, setInstrumental] = useState<boolean>(false);
    const [musicUrl, setMusicUrl] = useState<string>('');
    const [isGeneratingMusic, setIsGeneratingMusic] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLyricsEnabled, setIsLyricsEnabled] = useState<boolean>(false);
    const [generatedLyrics, setGeneratedLyrics] = useState<string>('');

    const handleGenerateMusic = async () => {
        if (!prompt.trim() || !title.trim()) {
            setError('Please ensure prompt and title are provided.');
            return;
        }

        const finalPrompt = `Create a fun, joyful, and playful kid's poem like or cartoon like song suitable for children below 10 years old. for: ${prompt}.`;

        setError('');
        setIsGeneratingMusic(true);

        const apiUrl = 'https://interdimensional-comedy-backend.onrender.com/music/generate';

        const requestData: any = {
            is_auto: 1,
            prompt: finalPrompt,
            title,
            isInstrumental: instrumental,
        };

        try {
            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Response data:', response.data);

            const musicData = response.data.music;
            if (musicData.status === 200) {
                const firstMusicItem = musicData.data[0];
                setMusicUrl(firstMusicItem.audio_file); 
                setGeneratedLyrics(firstMusicItem.lyric); 
            } else {
                setError("Free Limit Reached, " + musicData.message);
            }

        } catch (error: any) {
            console.error('Error generating music:', error.response ? error.response.data : error.message);
            setError('Failed to generate music. Please try again.');
        } finally {
            setIsGeneratingMusic(false);
        }
    };

    // console.log(isGeneratingMusic)

    return (
        <div className="flex flex-col justify-center items-center xl:h-screen w-screen pt-24 md:px-40">
            <div className='flex flex-col xl:flex-row items-center h-fit xl:h-full w-full pb-16'>
                <div className="flex-1 flex flex-col justify-normal xl:h-full items-center space-y-4 px-8 md:px-16 py-8">
                    <div className='text-2xl md:text-4xl uppercase font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent pb-8'>
                        Generate Your Music
                    </div>

                    <div className='w-full h-[100px] min-h-[100px] relative p-[1px] bg-gradient-to-br from-red-400 via-indigo-400 to-purple-400 rounded-sm'>
                        {error && <p className="text-red-500 absolute -top-8">{error}</p>}
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter your prompt"
                            className="outline-none p-2 h-full w-full resize-none rounded-sm"
                            required
                        />
                    </div>

                    <div className='flex flex-col sm:flex-row sm:items-center gap-4 w-full'>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter song title"
                            className="border p-2 w-full sm:w-fit"
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={instrumental}
                                onChange={() => setInstrumental(!instrumental)}
                                className="mr-2"
                            />
                            <label>Instrumental</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isLyricsEnabled}
                                onChange={() => setIsLyricsEnabled(!isLyricsEnabled)}
                                className="mr-2"
                            />
                            <label>Add Custom Lyrics</label>
                        </div>
                    </div>

                    {isLyricsEnabled && (
                        <div className='w-full h-[200px] min-h-[150px] relative p-[1px] bg-gradient-to-br from-red-400 via-indigo-400 to-purple-400 rounded-sm mt-4'>
                            <textarea
                                value={lyrics}
                                onChange={(e) => setLyrics(e.target.value)}
                                placeholder="Enter your lyrics"
                                className="outline-none p-2 h-full w-full resize-none rounded-sm"
                            />
                        </div>
                    )}

                    <button
                        onClick={handleGenerateMusic}
                        className="w-full px-1"
                        disabled={isGeneratingMusic}>
                        <PrimaryButton label={isGeneratingMusic ? 'Generating Music...' : 'Generate Music'} />
                    </button>

                    <div className='h-fit w-full py-4'>
                        <div className='w-full h-[2px] bg-white/50'></div>
                    </div>

                    <div className="p-4 w-full bg-gradient-to-br max-h-full overflow-auto from-neutral-950 via-gray-950 to-indigo-950 rounded-sm mt-4">
                        <h3 className="font-semibold text-lg mb-2">Generated Lyrics</h3>
                        <p className="whitespace-pre-wrap text-gray-400">{generatedLyrics ? generatedLyrics : "Nothing to show here yet"}</p>
                    </div>

                </div>
                <div className="xl:flex-1 flex flex-col w-3/4 justify-center items-center h-96 xl:h-full bg-neutral-800 rounded-xl">
                    {musicUrl ? (
                        <div className="p-4 w-full h-[300px] bg-neutral-800 text-gray-400 flex flex-col justify-around items-start overflow-hidden">
                            <p>Music generated successfully! </p>
                            <audio controls src={musicUrl} className="w-full" />
                            <a href={musicUrl} download className="bg-green-500 text-white p-2 rounded">
                                Download Video
                            </a>
                        </div>
                    ) : "Your Music Here"}
                </div>
            </div>
        </div>
    );
}

export default MusicGenPage;
