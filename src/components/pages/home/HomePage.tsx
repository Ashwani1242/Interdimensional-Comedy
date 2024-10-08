// import Footer from "../../Footer";
// import Navbar from "../../Navbar";
import Sidebar from "../../Sidebar";
import ComedyShowPage from "../videogen/ComedyShowPage";
// import GallerySection from "./GallerySection";
// import HeroSection from "./HeroSection";
// import Introduction from "./Introduction";
// import PricingSection from "./PricingSection";

function HomePage() {
  return (
    <>
      <div className="flex w-screen">
        <Sidebar />
        <ComedyShowPage />
      </div>
      {/* <Navbar /> */}
      {/* <HeroSection />
      <Introduction />
      <GallerySection />
      <PricingSection /> */}
      {/* <Footer /> */}
    </>
  )
}

export default HomePage
