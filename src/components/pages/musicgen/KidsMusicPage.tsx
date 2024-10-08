// import Navbar from "../../Navbar"
import { useState } from "react";
import MusicGenPage from "./MusicGenPage"

const tabList = ['Music', 'Kid\'s Music', 'Lo-Fi Mix']

function KidsMusicPage() {
  const [activeTab, setActiveTab] = useState(tabList[0]);

  const renderComponent = () => {
    switch (activeTab) {
      case tabList[0]:
        return <> {tabList[0]} </>;
      case tabList[1]:
        return <MusicGenPage />;
      case tabList[2]:
        return <> {tabList[1]} </>;
      // case tabList[3]:
      //   return <> { tabList[3] } </>;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-y-scroll w-full">
      {/* <Navbar /> */}
      {/* <MusicGenPage /> */}
      <div className="flex flex-col w-full">
        <div className="text-7xl pl-8 py-16" > {activeTab} </div>
        <div className="flex w-full justify-start mb-20 sticky top-0 py-4 bg-primary">
          {tabList.map((tab) => (
            <button
              className={`px-4 py-2 ${activeTab === tab ? 'border-white' : 'border-transparent hover:border-white/50'} transition-all duration-300 border-b-4 mx-2 rounded-sm`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <div className="">
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

export default KidsMusicPage
