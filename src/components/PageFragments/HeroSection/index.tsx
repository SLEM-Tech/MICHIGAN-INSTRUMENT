"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "@public/images/hero-section/hero-img1.png";;
import React, { useEffect, useRef, useState } from "react";

import { HeroSlide } from "../HeroSlide";

export const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const carouselRef = useRef<Carousel | null>(null);

    const changeSlide = () => {
        setCurrentSlide((prevSlide) => {
            const nextIndex = (prevSlide + 1) % 6; // Cycle through slides
            carouselRef.current?.moveTo(nextIndex);
            return nextIndex;
        });
    };

    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            changeSlide();
        }, 15000);
    };

    useEffect(() => {
        resetInterval();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <Carousel
            ref={carouselRef}
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={false}
            selectedItem={currentSlide}
            onChange={(index) => {
                setCurrentSlide(index);
                resetInterval();
            }}
            interval={15000}
        >
            <HeroSlide featureMessage="50% off new plumbing items"  imgPath={img1}/>
            <HeroSlide featureMessage="50% off new plumbing items"  imgPath={img1}/>
        </Carousel>
    );
};
