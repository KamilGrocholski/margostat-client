import { useEffect, useState } from 'react'

type WindowDimentions = {
    width: number | undefined;
    height: number | undefined;
}

export const useWindowDimentions = (): WindowDimentions => {
    const [windowDimentions, setWindowDimentions] = useState<WindowDimentions>({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        function handleResize(): void {
            setWindowDimentions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return (): void => window.removeEventListener('resize', handleResize)
    }, []) // Empty array ensures that effect is only run on mount

    return windowDimentions;
}
