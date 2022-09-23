import React, { useRef } from "react";

export const ImageCard = ({ url, title }) => {
  const image = useRef(null);
  const handleFullScreen = () => {
    if (!image.current) return;
    // console.log(image.current);
    const element = image.current;
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  };

  const toggleFullScreen = () => {
    if (!image.current) return;
    const element = image.current;
    if (handleFullScreen()) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  };
  return (
    <div className="flex justify-center items-center">
      <img
        src={url}
        alt={title}
        className="w-52 h-64 object-contain"
        onDoubleClick={toggleFullScreen}
        ref={image}
      />
    </div>
  );
};
