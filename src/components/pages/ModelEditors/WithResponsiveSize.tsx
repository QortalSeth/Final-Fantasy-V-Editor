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
    return (
      <>
        <style>{`span, label{font-Size:${windowWidth / 50}px; }`}</style>
        <WrappedComponent {...props} windowWidth={windowWidth} windowHeight={windowHeight} />
      </>
    );
  };
  return ResponsiveComponent;
};
export default WithResponsiveSize;
