import Footer from "../../Footer";
import Navbar from "../../Navbar";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import Introduction from "./Introduction";
import PricingSection from "./PricingSection";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Introduction />
      <GallerySection />
      <PricingSection />
      <Footer />
    </>
  )
}

export default HomePage
