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
