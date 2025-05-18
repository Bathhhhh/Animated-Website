import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 2;
    const nextVideosRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const getLoopedIndex = (index) => {
        return ((index - 1 + totalVideos) % totalVideos) + 1;
    };

    const upcomingVideoIndex = getLoopedIndex(currentIndex + 1);

    const handleMiniVdClick = () => {
        setHasClicked(true);

        setCurrentIndex(upcomingVideoIndex);
    }

    useGSAP( ()=>{
        if(hasClicked){
            gsap.set('#next-video', {visibility: 'visible'});

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 0.5,
                ease: 'power1.inOut',
                onStart: () => nextVideosRef.current.play(),
            });

            gsap.from('#current-video',{
                transformOrigin: 'center center',
                scale: 0,
                duration: 1,
                ease: 'power1.inOut',
            });
    }
    },{dependencies: [currentIndex], revertOnUpdate: true})

    useGSAP( () => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
            borderRadius: '0% 0% 40% 10%'
        });
        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0% 0% 0% 0%',
            ease: 'power0.inOut',
            scrollTrigger:{
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom bottom',
                scrub: true,
            }
        })
    })

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">

            {isLoading && (
                <div>
                    <div className="three-body"></div>
                </div>
            )}
            <div id="video-frame"
                className="relative z-10 h-dvh w-screen 
            overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center absolute
                    z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVdClick}
                            className="origin-center scale-50 opacity-0 transition-all 
                       duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                ref={nextVideosRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 
                              object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    <video
                        ref={nextVideosRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 
                        size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />

                    <video
                        src={getVideoSrc(getLoopedIndex(currentIndex))}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover 
                        object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    Series
                </h1>

                <div className="absolute top-0 left-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font uppercase font-zentry font-bold text-5xl sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem] text-blue-100">
                            one piece</h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                           The Best <br />Anime series of all time</p>

                        <Button
                            id="watch-trailer"
                            title="Watch Trailer"
                            containerClass="bg-yellow-300 flex justify-center items-center gap-1"
                            onClick={() => window.open("https://youtu.be/okSWhWr52u8?si=_FCKHC1XgyrVIWbS", "_blank")}
                             
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero