import AppLayout from "@src/components/AppLayout";
import WebStatisticSection from "@src/components/PageFragments/WebStatisticSection";
import SortedProducts from "./(Home)/_components/SortedProducts";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import { HeroSection } from "@src/components/PageFragments/HeroSection";
import { ShareYourSetup } from "@src/components/PageFragments/ShareYourSetup/ShareYourSetup";
import { TopCategorySection } from "@src/components/PageFragments/TopCategory";
import Discovery from "@src/components/PageFragments/DiscoverySection";
import DiscoverySection from "@src/components/PageFragments/DiscoverySection";
import FeaturedSection from "@src/components/PageFragments/FeaturedSection";
import TestimonialSection from "@src/components/PageFragments/TestimonialSection";

const { description, title } = SEODATA.home;
export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Michigan Instrument Ltd",
    template: "",
  },
  description: description,
  icons: SEODATA.defaultOGImage,
  openGraph: {
    images: [
      {
        url: SEODATA.defaultOGImage,
      },
    ],
  },
};

const page = () => {
  return (
    <AppLayout>
      <main className="flex flex-col gap-5">
        <div>
          <HeroSection />
        </div>
        <div>
          <DiscoverySection />
        </div>
        <div className="my-8">
          <WebStatisticSection />
        </div>
        <div>
          <FeaturedSection />
        </div>
        <div>
          <TestimonialSection />
        </div>
      </main>
    </AppLayout>
  );
};

export default page;
