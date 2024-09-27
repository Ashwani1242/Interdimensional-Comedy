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
    const [current, setCurrent] = useState<number>(1);

    const previousSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    return (
        <div
            // style={{height: landscape ? `${(width / 1.5) + (width / 1.2)}px` : `${(width * 1.5) + (width / 1.2)}px` }}
            className="relative w-full max-w-[1920px] h-fit lg:px-32 xl:px-96 px-8 py-16 rounded-lg flex flex-col justify-normal items-center">
            <div className='flex w-full items-center justify-between py-8'>
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
            <div className="w-full rounded-lg">
                <div
                    className="flex transition-transform ease-in-out duration-1000 gap-x-8 w-fit h-full"
                    style={{
                        transform: `translateX(-${(width + 32) * current}px)`,
                    }}>
                    {slides.map((s) => (
                        <div
                            key={s.id}
                            style={{
                                width: `${width}px`,
                                height: landscape ? `${width / 1.5}px` : `${width * 1.5}px`,
                            }}
                            className={`relative flex justify-center items-center hover:scale-[1.03] transition-all duration-500 cursor-pointer`}>
                            <div
                                style={{ backgroundImage: `url(${s.imageUrl})` }}
                                className="w-full h-full absolute bg-no-repeat bg-center bg-cover filter brightness-[.9] rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="absolute bottom-4 flex justify-center gap-4 w-full">
                {slides.map((_, i) => (
                    <div
                        onClick={() => setCurrent(i)}
                        key={`circle-${i}`}
                        className={`w-4 h-[1px] rounded-full cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"
                            }`}
                    ></div>
                ))}
            </div> */}
        </div>
    );
};

export default CardCarousel;
