import React, { useState } from "react";
import Arrow from "../../icons/Arrow";

type webArray = {
    id: number,
    imageUrl: string
}

interface ImageCarouselProps {
    slides: webArray[];
    title: string,
    width?: number,
    landscape?: boolean
}

const CardCarousel: React.FC<ImageCarouselProps> = ({ slides, title, width = 360, landscape = true }) => {
    const [current, setCurrent] = useState<number>(0);

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
     

    return (
        <div
            // style={{height: landscape ? `${(width / 1.5) + (width / 1.2)}px` : `${(width * 1.5) + (width / 1.2)}px` }}
            className="relative w-full max-w-[1920px]/ h-fit  py-16 rounded-lg flex flex-col justify-normal items-center">
            <div className='flex w-full items-center justify-between py-8 px-8 lg:px-32 xl:px-80'>
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
            <div className="w-full grid-background-animated/ /border-y-[3px] border-[#212225] py-8 px-8 lg:px-32 xl:px-80">
                <div className="w-full rounded-lg">
                    <div
                        className="flex transition-transform ease-in-out duration-300 gap-x-8 w-fit h-full"
                        style={{
                            transform: `translateX(-${(width + 32) * current}px)`,
                        }}>
                        {/* <MemoizedSlides current={current} slides={slides} width={width} landscape={landscape} /> */}
                        {slides.map((s, i) => (
                            <div
                                key={s.id}
                                className={`relative flex justify-center items-center hover:scale-[1.03] transition-all duration-300 cursor-pointer ${landscape ? 'landscape-slide' : 'portrait-slide'} ${i < current ? 'brightness-[.2]' : ''}`}
                                style={{ '--slide-width': `${width}px` } as React.CSSProperties}>
                                <div
                                    style={{ backgroundImage: `url(${s.imageUrl})` }}
                                    className="w-full h-full absolute bg-no-repeat bg-center bg-cover filter brightness-[.9] rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8 bottom-4 flex justify-center gap-4 w-full">
                    {slides.map((_, i) => (
                        <div
                            onClick={() => handleDotClick(i)}
                            key={`circle-${i}`}
                            className={`w-2 h-2 rounded-full cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"
                                }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardCarousel;
