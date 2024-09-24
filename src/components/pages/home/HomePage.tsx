import Footer from "../../Footer";
import Navbar from "../../Navbar";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";

function HomePage() {
  return (
    <>
      <Navbar color="#0f0f11" />
      <HeroSection />
      <GallerySection />
      <PricingSection />
      <Footer />
    </>
  )
}

export default HomePage
