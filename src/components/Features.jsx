import { useRef, useState } from "react"

const BentoTilt = ({ children, className = ''}) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef();

    const handleMouseMove = (e) => {
        if(!itemRef.current) return;

        const { left, top, width, height } =itemRef.current
    .getBoundingClientRect();
        
        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle('');
    };

    return (
        <div className={className} 
        ref={itemRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave} 
        style={{transform: transformStyle}}
        >
            {children}
        </div>
    )
}

const BentoCard = ({src, title, description}) => {
    return(
        <div className="relative size-full">
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover 
                object-center"
            />
            <div className="relative z-10 flex size-full flex-col
            justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs 
                    md:text-base">{description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

const Features = () => {
    return (
        <section className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    {/* <p className="font-circular-web text-5xl text-blue-50">
                        Into the game</p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                    Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience
          on your world.
                </p> */}
                </div>
            
            <BentoTilt className="border-white/20 relative mb-7 h-96 w-full overflow-hidden
            rounded-md md:h-[65vh]">
                <BentoCard 
                    src="videos/openning-1.mp4"
                    title={<>prologue</>}
                    description="Pirates fight to find One Piece left behind by Pirate King G. Roger and Luffy a young boy who is passionate about pirates, 
                    sets out on a journey to become the Pirate King!!"
                />
            </BentoTilt>
                <div className="grid h-[135vh] grid-cols-2 grid-rows-3 
            gap-7">
                <BentoTilt className="relative border-white/20 col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out
                 row-span-1 md:col-span-1 
            md:row-span-2">
                    <BentoCard 
                        src="videos/luffy.mp4"
                        title={<>Monkey D. Luffy</>}
                        description="He dreams of becoming the Pirate King by finding the legendary treasure, One Piece. After eating the Gum-Gum Fruit, his body became rubbery."
                    />
                </BentoTilt>

                <BentoTilt className="relative border-white/20 col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out
                 row-span-1 ms-32
                md:col-span-1 md:ms-0">
                    <BentoCard 
                        src="videos/zoro.mp4"
                        title={<>Roronoa Zoro</>}
                        description = "the swordsman of the Straw Hat Pirates in One Piece. He uses a unique three-sword style and aims to become the world’s greatest swordsman"
                    />
                </BentoTilt>
                <BentoTilt className="relative border-white/20 col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out
                 me-14 md:col-span-1 md:me-0">
                    <BentoCard 
                        src="videos/sanji.mp4"
                        title={<>Vinsmoke sanji</>}
                        description="the cook of the Straw Hat Pirates in One Piece. He dreams of finding the All Blue, a legendary sea."
                    />
                </BentoTilt>
                <BentoTilt className="relative border-white/20 col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out
                 me-14 md:col-span-1 md:me-0">
                    <BentoCard 
                        src="videos/usopp.mp4"
                        title={<>Usopp</>}
                        description="the sniper of the Straw Hat Pirates in One Piece. He dreams of becoming a brave warrior of the sea."
                    />
                </BentoTilt>
                <BentoTilt className="relative border-white/20 col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out
                 me-14 md:col-span-1 md:me-0">
                    <BentoCard 
                        src="videos/nami.mp4"
                        title={<>Nami</>}
                        description="the navigator of the Straw Hat Pirates in One Piece. She dreams of making a complete map of the world."
                    />
                </BentoTilt>
            </div>
            </div>
        </section>
    )
}

export default Features