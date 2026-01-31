import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@styles/globals.css";
import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-slideshow-image/dist/styles.css";
import { Montserrat } from "next/font/google";
import AppProvider from "@src/components/config/AppProvider";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	style: ["normal"], // Include "italic" if you need it
});

const { description, title } = SEODATA.default;
export const metadata: Metadata = {
  title: {
    absolute: "Michigan Instrument Ltd",
    default: "Michigan Instrument Ltd",
    template: "",
  },
  description: description,
  icons: {
    icon: "/favicon.png", // or "/favicon.ico"
  },
  openGraph: {
    images: [
      {
        url: SEODATA.defaultOGImage,
      },
    ],
  },
	other: {
  "application/ld+json": JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Michigan Instranment",
    "creator": {
      "@type": "Organization",
      "name": "SLEM Technologies",
      "url": "https://slemtech.com",
      "founder": {
        "@type": "Person",
        "name": "Anselm Fowel",
        "url": "https://anselmfowel.com",
        "jobTitle": "CEO & CTO"
      },
      "role": "Paid Consultant"
    }
  })
	}
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${montserrat.className} bg-white w-full min-h-screen`}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
