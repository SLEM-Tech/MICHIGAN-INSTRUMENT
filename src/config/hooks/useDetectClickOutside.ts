'use client'
import { RefObject, useEffect } from 'react';

export const useDetectClickOutside = (
    ref: RefObject<HTMLElement>,
    onClickOutside: () => void,
) => {
    useEffect( () => {
        const handleClickOutside = ( event: MouseEvent ) => {
            if ( ref.current && !ref.current.contains( event.target as Node ) ) {
                onClickOutside();
            }
        };

        document.addEventListener( 'mousedown', handleClickOutside );
    
        return () => {
            document.removeEventListener( 'mousedown', handleClickOutside );
        };
    }, [ ref, onClickOutside ] );
};