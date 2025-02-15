import { Montserrat, Nunito, Open_Sans } from "next/font/google";

export const montserrat = Montserrat( {
    subsets: [ "latin" ],
    display: "swap",
    weight: [ "400", "500", "600", "700" ],
} );
export const nunito = Nunito( {
    subsets: [ "latin" ],
    display: "swap",
    weight: [ "300", "400", "500", "600", "700" ],
} );
export const openSans = Open_Sans( {
    subsets: [ "latin" ],
    display: "swap",
    weight: [ "300", "400", "600", "700" ],
} );
