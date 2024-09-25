import React, { useEffect, useRef, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import Arrow from "../../icons/Arrow";

type webArray = {
    id: number,
    imageUrl: string,
    titleOne: string,
    titleTwo: string,
    subTitleOne: string,
    subTitleTwo: string,
}

interface ImageCarouselProps {
    slides: webArray[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ slides }) => {
    const [current, setCurrent] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const previousSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    const startAutoScroll = () => {
        intervalRef.current = setInterval(() => {
            setCurrent((prevCurrent) => (prevCurrent === slides.length - 1 ? 0 : prevCurrent + 1));
        }, 10000);
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        startAutoScroll();

        return () => stopAutoScroll();
    }, []);

    return (
        <div className="relative w-full max-w-[1800px] md:h-[700px] h-[500px] rounded-lg flex flex-col justify-around items-center">
            <div className="w-full max-w-[1800px] h-[94%] overflow-hidden rounded-lg">
                <div
                    className="flex transition-transform ease-in-out duration-1000 gap-x-16/ h-full"
                    style={{
                        transform: `translateX(calc(-${current * 100}vw - 64px))`,
                        width: `calc(${slides.length * 100}vw + 0px)`,
                    }}>
                    {slides.map((s) => (
                        <div
                            key={s.id}
                            className="w-full h-[92%] relative flex justify-center items-center">
                            <div
                                style={{ backgroundImage: `url(${s.imageUrl})` }}
                                className="w-full h-full absolute bg-no-repeat bg-center bg-cover filter brightness-[.4] rounded-lg" />
                            <div className="absolute text-center md:text-left pl-16 py-16 z-50 w-3/4 h-full md:h-fit flex flex-col justify-around items-start gap-y-4 md:gap-y-8">
                                <div className="flex flex-col gap-y-4 md:gap-y-8">
                                    <span className="xl:text-7xl lg:text-5xl text-2xl font-bold"> {s.titleOne} <br /> {s.titleTwo} </span>
                                    <span className="xl:text-3xl lg:text-xl"> {s.subTitleOne} <br /> {s.subTitleTwo} </span>
                                </div>
                                <div className="flex gap-x-4 md:gap-x-8 w-full text-sm md:text-xl items-center justify-center md:justify-start" >
                                    <PrimaryButton label="Try for free!" customClass="text-nowrap" />
                                    <div className="hover:animate-pulse hover:brightness-90 duration-500 font-semibold py-2 px-4 cursor-pointer text-white hover:text-indigo-100 transition-all hover:-translate-y-[2px]">
                                        Explore
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="absolute top-0 left-1 h-full flex items-center text-white px-4 text-3xl" onClick={previousSlide}>
                <Arrow size="40px" customClass="w-6 md:w-8" />
            </button>
            <button className="absolute top-0 right-1 h-full flex items-center text-white px-4 text-3xl" onClick={nextSlide}>
                <Arrow size="40px" customClass="rotate-180 w-6 md:w-8" />
            </button>

            <div className="absolute/ bottom-6 flex justify-center gap-4 w-full">
                {slides.map((_, i) => (
                    <div
                        onClick={() => setCurrent(i)}
                        key={`circle-${i}`}
                        className={`w-2 h-2 rounded-full cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
