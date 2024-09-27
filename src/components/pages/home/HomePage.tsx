import Footer from "../../Footer";
import Navbar from "../../Navbar";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GallerySection />
      <PricingSection />
      <Footer />
    </>
  )
}

export default HomePage
