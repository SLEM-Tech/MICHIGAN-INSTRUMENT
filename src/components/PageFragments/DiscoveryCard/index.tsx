import Link from '@node_modules/next/link';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface DiscoveryCardProps {
    className?: string;
    description: string;
    brand: string;
    imgClass: string;
    imgPath: StaticImageData | string;
}

export const DiscoveryCard = ({ brand, description, className, imgClass, imgPath }: DiscoveryCardProps) => {
    return (
        <div className={`flex w-full justify-center rounded ${className}`}>
            <div className={`relative flex flex-col justify-end h-[500px] bg-neutral-800 p-12 w-full bg-cover bg-center rounded ${imgClass}`}>
                <div className='relative z-10 flex flex-col items-start text-center text-white gap-4'>
                    <p className='relative text-[13px] uppercase text-white font-semibold rounded-md bg-black p-2'>{description}</p>
                    <p className='relative text-2xl tracking-wide-6 sm:tracking-wide-24 uppercase text-primary font-bold'>{brand}</p>
                    <div className='relative'>
                        <Link href="/category" 
                        className= {`mt-12 uppercase py-[14px] px-[36px] bg-primary text-white rounded-md hover:bg-transparent hover:text-primary border 
                        hover:border-primary transition-all`}>
                            Shop Now
                        </Link>
                    </div>
                </div>
                <Image
                    src={imgPath}
                    fill
                    quality={100}
                    alt='Autoplate logo'
                    style={{ objectFit: 'cover', zIndex: 9, borderRadius: '4px' }}
                />
            </div>
        </div>
    );
};

export default DiscoveryCard;