'use client';
import audiCardPath from '@public/images/discovery-section/audi-card.png';
import bmwCardPath from '@public/images/discovery-section/bmw-card.png';
import hondaCardPath from '@public/images/discovery-section/honda-card.png';
import mercedesCardPath from '@public/images/discovery-section/mercedes-card.png';
import nissanCardPath from '@public/images/discovery-section/nissan-card.png';
import toyotaCardPath from '@public/images/discovery-section/toyota-card.png';
import volkswagenCardPath from '@public/images/discovery-section/volkswagen-card.png';
import volvoCardPath from '@public/images/discovery-section/volvo-card.png';
import React, { useState } from 'react';

import { DiscoveryCard } from '../DiscoveryCard';
import { useCategories } from "@src/components/lib/woocommerce";

interface DiscoverySectionProps {
    className?: string;
}

export const DiscoverySection = ({ className }: DiscoverySectionProps) => {
    const [displayMore, setDisplayMore] = useState(false);

    const { data: categories, isLoading } = useCategories("");
    const Categories = categories || [];

    // If categories are still loading or empty, show a loading state
    if (isLoading || Categories.length === 0) {
        return <div className="text-center py-10">Loading brands...</div>;
    }

    return (
        <section className={`bg-discovery-gradient relative overflow-hidden pt-20 pb-12 ${className}`}>
            <h2 className={`relative container-v2 text-neutral-800 font-medium uppercase text-[20px] lg:text-[24px] tracking-wide-20 text-center z-10`}>
                Discover Leading<br className='sm:hidden'/> Auto Brands
            </h2>
            <div className='relative z-10 container-v2 mt-12 grid m-auto gap-4 sm:gap-6 md:gap-8 md:mt-20 md:grid-cols-2 lg:grid-cols-12'>

                {Categories.slice(0, 8).map((category:any, index:number) => {
                    const defaultImages = [mercedesCardPath, audiCardPath, volkswagenCardPath, bmwCardPath, volvoCardPath, toyotaCardPath, nissanCardPath, hondaCardPath];
                    return (
                        <DiscoveryCard
                            key={index}
                            className={`${index >= 4 ? 'hidden md:flex' : ''} lg:col-span-4`}
                            imgPath={category?.image?.src || defaultImages[index]}
                            brand={category?.name || 'Brand'}
                            description={['Elegant Performance', 'Art of Progress', 'Precision Engineering', 'Driving Pleasure', 'Unmatched Safety', 'Trusted Performance', 'Dynamic Innovation', 'Engineering Excellence'][index]}
                            imgClass={`bg-[url(${category?.image?.src || defaultImages[index]})]`}
                        />
                    );
                })}

                {/* Mobile Show More Button */}
                <div className={`relative transition-height-visibility-css overflow-hidden ${displayMore ? 'h-auto' : 'h-0'}`}>
                    <div className='h-auto grid gap-4 sm:gap-6 m-auto'>
                        {Categories.slice(4, 8).map((category:any, index:number) => {
                            const defaultImages = [volvoCardPath, toyotaCardPath, nissanCardPath, hondaCardPath];
                            return (
                                <DiscoveryCard
                                    key={index + 4}
                                    className='flex'
                                    imgPath={category?.image?.src || defaultImages[index]}
                                    brand={category?.name || 'Brand'}
                                    description={['Unmatched Safety', 'Trusted Performance', 'Dynamic Innovation', 'Engineering Excellence'][index]}
                                    imgClass={`bg-[url(${category?.image?.src || defaultImages[index]})]`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            
            {/* Toggle Button */}
            <button className='m-auto md:hidden block mt-6 relative z-10' onClick={() => setDisplayMore(!displayMore)}>
                {displayMore ? 'Show Less' : 'Show More'}
            </button>
        </section>
    );
};
