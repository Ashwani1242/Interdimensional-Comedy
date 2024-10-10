import React, { useState, ChangeEvent } from 'react';
import Loader from '../../../icons/Loader';
import { BASE_URL } from '../../../../config';
import PrimaryButton from '../../utils/PrimaryButton';

const ReelGen: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>('');
  // const [audio, setAudio] = useState<string>(''); // State to hold audio file path
  const [video, setVideo] = useState<string>(''); // State to hold video file path
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const [isVideoGenerated, setIsVideoGenerated] = useState<boolean>(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageName(file.name)
      setSelectedImage(imageUrl);
    }
    setImage(file);
    setError(null); // Reset error on new file upload
  };

  const handleGenerate = async () => {
    if (!image) {
      alert('Please upload an image before submitting.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch(`${BASE_URL}/api/reel-gen/generate-summary`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data)

        setSummary(data.summary || 'No summary generated.');
        // setAudio(data.audio);  // Mark audio as generated
        setVideo(data.video); // Set video file path
        setIsVideoGenerated(true); // Mark video as generated
      } else {
        console.error('Error from server:', response.status);
        setError('Failed to generate summary, audio, or video');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      setError('An error occurred while generating the summary, audio, or video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 gap-x-8 flex w-full">
      <div className="max-w-md p-4 flex flex-col w-full bg-white/ /text-black shadow-md rounded-lg">
        <h2 className="text-2xl font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4"> Tired of everyone talking good about you? Tell VibeVision AI to roast you instead! </h2>
        <div className="space-y-4">

          <div className="max-w-md mx-auto mt-8 rounded-lg overflow-hidden/ md:max-w-xl">
            <div className="md:flex">
              <div className="w-full">
                <div
                  className="relative p-12 rounded-lg bg-neutral-800 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  {selectedImage ? (
                    <div className='relative flex flex-col w-full h-full justify-center items-center'>
                      <div className='absolute w-full h-full flex gap-x-8 justify-center items-center'>
                        <div
                          style={{ backgroundImage: `url(${selectedImage})` }}
                          className='h-40 w-32 -rotate-12 rounded-xl border-2 brightness-75 bg-cover bg-center bg-no-repeat'>
                        </div>
                        <span className='text-wrap z-10 text-black/ text-white font-semibold px-4 py-2 rounded-xl bg-neutral-300/'> {imageName} </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col w-full justify-center items-center">
                      <img
                        alt="Image"
                        className="mb-3 text-black"
                        src="https://img.icons8.com/dusk/64/image-file.png"
                      />
                      <span className="block text-gray-500 font-semibold">
                        Drag &amp; drop an Image to generate a Roast
                      </span>
                      <span className="block text-gray-400 font-normal mt-1">
                        or click to upload an Image
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="h-full w-full opacity-0 cursor-pointer absolute"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full px-1"
            disabled={loading}>
            <PrimaryButton label={loading ? 'Processing...' : 'Generate Roast'} />
          </button>

          {summary && (
            <div className="mt-6 p-4 bg-neutral-800 text-white rounded-md">
              <h3 className="font-bold mb-2">Text:</h3>
              <p>{summary}</p>
            </div>
          )}

        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 w-full items-center shadow-md rounded-lg">
        {loading && (
          <div className="flex flex-col justify-between text-sm/ mt-2">
            <div className={`${isVideoGenerated ? 'text-green-500' : 'text-gray-400'} flex flex-col gap-y-4 font-semibold items-center m-4 p-2 bg-gra/y-200 rounded-xl`}>
              <Loader isLoading={!isVideoGenerated} />
              <span className='animate-pulse'>Your video is in Queue...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 max-w-md w-full bg-red-800/40 border-red-900 border-2 text-red-300 rounded-md">
            <h3 className="font-bold mb-2">Error:</h3>
            <p>{error} This is an Error</p>
          </div>
        )}

        {video && (
          <div className="mt-6 p-4 w-full bg-neutral-800 rounded-md">
            <h3 className="font-bold mb-2">Video:</h3>
            <video controls width="100%" className='max-w-md'>
              <source src={`${BASE_URL}/${video}`} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
        )}
        
        {/* {audio && (
          <div className="mt-6 p-4 w-full bg-neutral-800 rounded-md">
            <h3 className="font-bold mb-2">Audio:</h3>
            <audio controls>
              <source src={`${BASE_URL}/${audio}`} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ReelGen;
