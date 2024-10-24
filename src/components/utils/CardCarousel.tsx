import React, { useState } from "react";
import Arrow from "../../icons/Arrow";

type webArray = {
    id: number,
    videoUrl?: string
    imageUrl?: string
    isVideo?: boolean
}

interface ImageCarouselProps {
    slides: webArray[];
    title: string;
    width?: number;
    landscape?: boolean;
    customClass?: string
}

const CardCarousel: React.FC<ImageCarouselProps> = ({ slides, title, width = 360, landscape = true, customClass = '' }) => {
    const [current, setCurrent] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCurrentVideo, setIsCurrentVideo] = useState<boolean>(false);
    const [currentMedia, setCurrentMedia] = useState<string | null>(null);

    const debounce = (func: () => void, wait: number) => {
        let timeout: NodeJS.Timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    };

    const previousSlide = debounce(() => {
        setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
    }, 300);

    const nextSlide = debounce(() => {
        setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 300);

    const handleDotClick = (index: number) => {
        if (index !== current) {
            setCurrent(index);
        }
    };

    const openModal = (mediaUrl: string, isVideo : boolean) => {
        setCurrentMedia(mediaUrl);
        setIsCurrentVideo(isVideo)
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setIsCurrentVideo(false)
        setCurrentMedia(null);
    };

    return (
        <div className={`relative w-full max-w-[1920px]/ overflow-hidden h-fit pt-4 rounded-lg flex flex-col justify-normal items-center ${customClass}`}>
            <div className='flex w-full items-center justify-between py-8/ px-8 lg:px-32/ xl:px-80/'>
                <span className='text-xl md:text-3xl'>{title}</span>
                <div className='flex'>
                    <button onClick={previousSlide} className="flex items-center text-white px-2 text-3xl">
                        <Arrow customClass="w-6 md:w-8" />
                    </button>
                    <button onClick={nextSlide} className="flex items-center text-white px-2 text-3xl">
                        <Arrow customClass="rotate-180 w-6 md:w-8" />
                    </button>
                </div>
            </div>

            <div className="w-full grid-background-animated/ /border-y-[3px] border-[#212225] py-8 px-8 lg:px-32/ xl:px-80/">
                <div className="w-full rounded-lg">
                    <div
                        className="flex transition-transform ease-in-out duration-300 gap-x-8 w-fit h-full"
                        style={{
                            transform: `translateX(-${(width + 32) * current}px)`,
                        }}
                    >
                        {slides.map((slide, i) => (
                            <div
                                key={slide.id}
                                className={`relative flex justify-center items-center hover:scale-[1.03] transition-all duration-300 cursor-pointer ${landscape ? 'landscape-slide' : 'portrait-slide'} ${i < current ? 'brightness-[.2]' : ''}`}
                                style={{ '--slide-width': `${width}px` } as React.CSSProperties}
                                onClick={() => slide.isVideo ? openModal(slide.videoUrl || '', true) : openModal(slide.imageUrl || '', false)}
                            >
                                <div
                                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                                    className={`w-full h-full absolute bg-no-repeat bg-center bg-cover filter brightness-[.9] rounded-lg ${slide.isVideo ? 'video-thumbnail' : ''}`}
                                >
                                    {slide.isVideo && (
                                        <div className="absolute inset-0 bg-blue-800/ rounded-lg bg-opacity-50 flex justify-center items-center">
                                            <button className="text-white text-4xl">▶</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 bottom-4 flex justify-center gap-4 w-full">
                    {slides.map((_, i) => (
                        <div
                            onClick={() => handleDotClick(i)}
                            key={`circle-${i}`}
                            className={`w-2 h-2 rounded-full cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"}`}
                        ></div>
                    ))}
                </div>
            </div>

            {isModalOpen && currentMedia && (
                <div className="fixed z-[2000] w-full max-w-[420px] max-h-[480px] p-8 md:p-0 md:right-8 bottom-4 bg-black bg-opacity-75 flex justify-end items-end">
                    <div className="relative bg-neutral-900 p-2 rounded-lg flex flex-col justify-end items-end w-full">
                        <button className="absolute z-10 top-2 right-2 text-white hover:scale-110 duration-300 hover:bg-black/50 px-2 py-1 rounded-full mb-10" onClick={closeModal}>✖</button>
                        {isCurrentVideo ?
                            <video src={currentMedia} controls className="w-full h-full rounded-lg"></video> :
                            <img src={currentMedia} className="w-full h-full bg-cover" />
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardCarousel;
