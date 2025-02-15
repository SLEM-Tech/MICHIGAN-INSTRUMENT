"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import audiImg from "@public/images/hero-section/audi-hero.png";
import mercedesImg from "@public/images/hero-section/mercedes-hero.png";
import volkswagenImg from "@public/images/hero-section/volkswagen-hero.png";
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
            <HeroSlide featureMessage="New Mercedes" brand="Mercedes-Benz" imgPath={mercedesImg} hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/mercedes-hero.png')]"/>
            <HeroSlide featureMessage="New Audi" brand="Audi" imgPath={audiImg} hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/audi-hero.png')]"/>
            <HeroSlide featureMessage="New Volkswagen" brand="Volkswagen" imgPath={volkswagenImg} hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/volkswagen-hero.png')]"/>
            <HeroSlide featureMessage="New Mercedes" brand="Mercedes-Benz" imgPath={mercedesImg} hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/mercedes-hero.png')]"/>
            <HeroSlide featureMessage="New Audi" brand="Audi" imgPath={audiImg} hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/audi-hero.png')]"/>
            <HeroSlide featureMessage="New Volkswagen" brand="Volkswagen" imgPath={volkswagenImg} hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/volkswagen-hero.png')]"/>
        </Carousel>
    );
};
