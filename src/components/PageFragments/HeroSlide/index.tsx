
import Image, { StaticImageData } from 'next/image'
import React from 'react'

import { montserrat } from '@src/config'
import Link from 'next/link'

interface HeroSlideProps {
    featureMessage: string,
    brand: string,
    imgClass:string
    hasButton: boolean
    imgPath: StaticImageData
}

export const  HeroSlide = ( { featureMessage, brand, hasButton, imgClass, imgPath }: HeroSlideProps ) => {
    return (
        <section className='h-[calc(100vh-80px)] lg:h-[calc(100vh-130px)] bg-slate-950 '>
            <div className={`${imgClass} relative h-full bg-cover bg-center `} >
                <div className='container-v2 relative z-10 m-auto py-8 sm:py-20 md:py-24 lg:py-[100px] h-full w-full flex flex-col items-center justify-end text-white'>
                    {featureMessage && <p className={`text-[13px] tracking-wide-12 p-2 font-semibold rounded-md bg-black ${montserrat.className}`}>{featureMessage}</p>}
                    {brand && <h2 className={`mt-6 uppercase text-2xl tracking-wide-24 text-primary font-bold ${montserrat.className}`}>{brand}</h2>}
                    {hasButton && <Link href="/category" 
                    className= {`mt-12 uppercase py-[14px] px-[36px] bg-primary text-white rounded-md hover:bg-transparent hover:text-primary border 
                    hover:border-primary transition-all`}>
                        Shop Now
                    </Link>}
                </div>
                <Image
                    src={imgPath}
                    fill
                    sizes='100vw'
                    quality={100}
                    alt="Autoplate logo"
                    style={{ objectFit:'cover', zIndex: 9 }}
                />
            </div>
        </section>
    )
}
