import { webData } from "../../../data/db";
import CardCarousel from "../../utils/CardCarousel";

interface props {
  labelOne?: string,
  labelTwo?: string,
}

function GallerySection({ labelOne = "Comedy Shows", labelTwo = "Kid's Music" }: props) {

  const videoCarouselWidth = window.innerWidth >= 680 ? 620 : window.innerWidth >= 512 ? 440 : 300;
  const musicCarouselWidth = window.innerWidth >= 512 ? 360 : 280;

  return (
    <>
      <CardCarousel
        width={videoCarouselWidth}
        title={labelOne}
        slides={webData.videoGallery}
      />
      <CardCarousel
        landscape = {false}
        width={musicCarouselWidth}
        title={labelTwo}
        slides={webData.soundGallery}
      />
    </>
  );
}

export default GallerySection;
