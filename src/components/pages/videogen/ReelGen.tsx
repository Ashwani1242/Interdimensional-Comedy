import React, { useState, ChangeEvent, FormEvent } from 'react';
import Loader from '../../../icons/Loader';

const ReelGen: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>('');
  const [audio, setAudio] = useState<string>(''); // State to hold audio file path
  const [video, setVideo] = useState<string>(''); // State to hold video file path
  const [error, setError] = useState<string | null>(null);

  // Progress tracking states
  const [isSummaryGenerated, setIsSummaryGenerated] = useState<boolean>(false);
  const [isAudioGenerated, setIsAudioGenerated] = useState<boolean>(false);
  const [isVideoGenerated, setIsVideoGenerated] = useState<boolean>(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    setError(null); // Reset error on new file upload
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image before submitting.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8000/api/reel-gen/generate-summary', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        // Update summary and set progress
        setSummary(data.summary || 'No summary generated.');
        setIsSummaryGenerated(true); // Mark summary as generated
        setAudio(data.audio); // Set audio file path
        setIsAudioGenerated(true); // Mark audio as generated
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
    <div className="max-w-md mx-auto p-6 mt-28 bg-white text-black shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Generate AI Image Summary and Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? 'Processing...' : 'Generate Summary & Video'}
        </button>
      </form>

      {/* <div className="mt-6 flex cols gap-4">
        <div className="text-center">
          <p className="font-bold">Summary</p>
          {isSummaryGenerated ? (
            <span className="text-green-500 text-2xl">✔</span>
          ) : (
            <span className="text-gray-500 text-2xl">⏳</span>
          )}
        </div>
        <div className="text-center">
          <p className="font-bold">Audio</p>
          {isAudioGenerated ? (
            <span className="text-green-500 text-2xl">✔</span>
          ) : (
            <span className="text-gray-500 text-2xl">⏳</span>
          )}
        </div>
        <div className="text-center">
          <p className="font-bold">Video</p>
          {isVideoGenerated ? (
            <span className="text-green-500 text-2xl">✔</span>
          ) : (
            <span className="text-gray-500 text-2xl">⏳</span>
          )}
        </div>
      </div> */}

      {loading && (
        <div className="mt-6">
          {/* <div className="relative h-60 w-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 ease-in-out"
            />
          </div> */}
          <div className="flex flex-col justify-between text-sm mt-2">
            <div className={`${isSummaryGenerated ? 'text-green-500' : 'text-gray-500'} flex gap-x-4 font-semibold items-center m-4 p-2 bg-gray-200 rounded-xl`}> <Loader isLoading={!isSummaryGenerated} /> Summary</div>
            <div className={`${isAudioGenerated ? 'text-green-500' : 'text-gray-500'} flex gap-x-4 font-semibold items-center m-4 p-2 bg-gray-200 rounded-xl`}> <Loader isLoading={!isAudioGenerated} /> Audio</div>
            <div className={`${isVideoGenerated ? 'text-green-500' : 'text-gray-500'} flex gap-x-4 font-semibold items-center m-4 p-2 bg-gray-200 rounded-xl`}> <Loader isLoading={!isVideoGenerated} /> Video</div>
          </div>
        </div>
      )}

      {loading && <p className="mt-4 text-center">Generating summary, audio, and video, please wait...</p>}
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
          <h3 className="font-bold mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      )}
      {summary && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold mb-2">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
      {audio && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold mb-2">Audio:</h3>
          <audio controls>
            <source src={`http://localhost:8000/${audio}`} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {video && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="font-bold mb-2">Video:</h3>
          <video controls width="100%">
            <source src={`http://localhost:8000/${video}`} type="video/mp4"/>
            Your browser does not support the video element.
          </video>
        </div>
      )}
    </div>
  );
};

export default ReelGen;
