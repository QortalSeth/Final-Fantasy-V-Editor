import React, { ComponentType, useEffect, useState } from 'react';

export const WithResponsiveSize = <T,>(WrappedComponent: ComponentType<T>) => {
  const ResponsiveComponent = (props: T) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    useEffect(() => {
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }, []);
    const fontExSmall = 8 + windowWidth / 150;
    const fontSmall = 10 + windowWidth / 120;
    const fontSmallDbl = 10 + windowWidth / 60;
    const fontMedium = 12 + windowWidth / 100;
    const fontLarge = 14 + windowWidth / 80;
    const fontExLarge = 16 + windowWidth / 60;
    const fontMax = 20 + windowWidth / 40;
    return (
      <>
        <style>
          {`
          span, label, tab, textarea, input[type=text]{font-Size:${fontMedium}px; }
          input[type=checkbox]{transform: scale(${fontMedium / 15});}
          .fontExSmall{font-Size:${fontExSmall}px;}
            .fontSmall, .css-1h9z7r5-MuiButtonBase-root-MuiTab-root{font-Size:${fontSmall}px;}
            .fontMedium{font-Size:${fontMedium}px;}
         
          .fontLarge{font-Size:${fontLarge}px;} 
        .fontExLarge{font-Size:${fontExLarge}px;}
        .fontMax{font-Size:${fontMax}px;}
        `}
        </style>
        <WrappedComponent {...props} windowWidth={windowWidth} windowHeight={windowHeight} />
      </>
    );
  };
  return ResponsiveComponent;
};
export default WithResponsiveSize;
