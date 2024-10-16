import { webData } from "../../../data/db";
import CardCarousel from "../../utils/CardCarousel";

interface props {
  labelOne?: string,
  labelTwo?: string,
}

function GallerySection({ labelOne = "Comedy Shows", labelTwo = "Kid's Music" }: props) {

  const videoCarouselWidth = window.innerWidth >= 680 ? 360 : window.innerWidth >= 512 ? 300 : 300;
  const musicCarouselWidth = window.innerWidth >= 512 ? 200 : 200;

  return (
    <>
      <CardCarousel
        width={videoCarouselWidth}
        title={labelOne}
        slides={webData.videoGallery}
      />
      <CardCarousel
        width={videoCarouselWidth}
        title={'Music'}
        slides={webData.soundGallery}
      />
      <CardCarousel
        landscape = {false}
        width={musicCarouselWidth}
        title={'Vibes'}
        slides={webData.videoGallery}
      />
      <CardCarousel
        width={videoCarouselWidth}
        title={'LO-FI'}
        slides={webData.soundGallery}
      />
      <CardCarousel
        width={videoCarouselWidth}
        title={labelTwo}
        slides={webData.videoGallery}
      />
    </>
  );
}

export default GallerySection;
