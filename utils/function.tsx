import logo from "@public/images/header/Logo.png";
import Picture from "@src/components/picture/Picture";
import Link from "next/link";

interface LogoImageProps {
	className?: string;
}

export const LogoImage = ({ className }: LogoImageProps) => {
	return (
		<Link href='/'>
			<Picture
				src={logo}
				alt='logo'
				priority
				loading='lazy'
				className={`max-h-[130px] duration-300 hover:scale-125 transition-[.3] hover:animate-pulse ${className}`}
			/>
		</Link>
	);
};


