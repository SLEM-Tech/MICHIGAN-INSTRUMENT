export const scrollToTop = () => {
    window.scrollTo( { top: 0, behavior: "smooth" } );
};
  
export const generateRandomSixNumberCode = () => {
    return parseInt( Math.floor( 100000 + Math.random() * 900000 ).toString() );
}

export const createExpiryTime = ( hours = 0, minutes = 0, seconds = 0 ) => {
    const currentTime = new Date();
    const expiryTime = new Date( currentTime.getTime() +
      ( hours * 60 * 60 * 1000 ) +
      ( minutes * 60 * 1000 ) +
      ( seconds * 1000 )
    );
    return expiryTime.getTime();
}

export const convertToDbDate = ( timestamp:number ) => {
    const date = new Date( timestamp );
    return date.toISOString().slice( 0, 19 ).replace( 'T', ' ' );
};


export const validatePaginationParams = ( value: number, defaultValue: number ): number => {
    if ( Number.isInteger( value ) && value >= 0 ) {
        return value;
    }
    return defaultValue; // fallback to a default value if invalid
}
