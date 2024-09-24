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
}

const CardCarousel: React.FC<ImageCarouselProps> = ({ slides, title, width = 360 }) => {
    const [current, setCurrent] = useState<number>(0);

    const previousSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    return (
        <div className="relative w-full max-w-[1920px] h-[700px] px-96 py-16 rounded-lg flex flex-col justify-normal items-center">
            <div className='flex w-full justify-between py-8'>
                <span className='text-3xl'>{title}</span>
                <div className='flex'>
                    <button onClick={previousSlide} className="flex items-center text-white px-2 text-3xl">
                        <Arrow size="40px" />
                    </button>
                    <button onClick={nextSlide} className="flex items-center text-white px-2 text-3xl">
                        <Arrow size="40px" customClass="rotate-180" />
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
                            style={{width: `${width}px`}}
                            className="h-[480px] relative flex justify-center items-center hover:scale-[1.03] transition-all duration-500 cursor-pointer">
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
