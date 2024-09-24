import { webData } from "../../../data/db";
import CardCarousel from "../../utils/CardCarousel";

interface props {
  labelOne?: string,
  labelTwo?: string,
}

function GallerySection({ labelOne = "Comedy Shows", labelTwo = "Kid's Music" }: props) {
  return (
    <>
      <CardCarousel
        width={620}
        title={labelOne}
        slides={webData.videoGallery}
      />
      <CardCarousel
        title={labelTwo}
        slides={webData.soundGallery}
      />
    </>
  );
}

export default GallerySection;
