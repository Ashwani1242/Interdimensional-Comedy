import { useState } from "react";
import Navbar from "../../Navbar";
import VideoGenDID from "./VideoGenDID";
import VideoGenRunway from "./VideoGenRunway";
import VideoGenTavus from "./VideoGenTavus";
import ReelGen from "./ReelGen";

function ComedyShowPage() {
    const [activeTab, setActiveTab] = useState<string>('DID'); 

    const renderComponent = () => {
        switch (activeTab) {
            case 'DID':
                return <VideoGenDID />;
            case 'Tavus':
                return <VideoGenTavus />;
            case 'Runway':
                return <VideoGenRunway />;
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />

            <div className="">
                {/* {renderComponent()} */}
                <ReelGen />
            </div>

            <div className="flex justify-center mb-20">
                <button
                    className={`px-4 py-2 ${activeTab === 'DID' ? 'bg-gradient-to-br from-red-500 to-indigo-500 text-white' : 'bg-neutral-800'} mx-2 rounded-sm`}
                    onClick={() => setActiveTab('DID')}>
                    D-ID API
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'Tavus' ? 'bg-gradient-to-br from-red-500 to-indigo-500 text-white' : 'bg-neutral-800'} mx-2 rounded-sm`}
                    onClick={() => setActiveTab('Tavus')}>
                    Tavus API
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'Runway' ? 'bg-gradient-to-br from-red-500 to-indigo-500 text-white' : 'bg-neutral-800'} mx-2 rounded-sm`}
                    onClick={() => setActiveTab('Runway')}>
                    Runway API
                </button>
            </div>
        </>
    );
}

export default ComedyShowPage;
