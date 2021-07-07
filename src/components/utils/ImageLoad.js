import React, { useState, useEffect } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import HelpIcon from "@material-ui/icons/Help";

const PRELOADEDIMAGES = [];

const ImageLoad = React.memo(
  ({ src, alt = "", isLocal = true, ...otherProps }) => {
    const [loading, setLoading] = useState(true);
    const [currentSrc, setCurrentSrc] = useState();
    const [error, setError] = useState(false);

    src = isLocal ? process.env.PUBLIC_URL + "/" + src : src;

    useEffect(() => {
      if (PRELOADEDIMAGES.indexOf(src) !== -1) {
        setCurrentSrc(src);
        setLoading(false);
        setError(false);
      } else {
        // start loading original image
        const imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () => {
          // When image is loaded replace the src and set loading to false
          PRELOADEDIMAGES.push(src);
          setLoading(false);
          setCurrentSrc(src);
          setError(false);
        };
        imageToLoad.onerror = (err) => {
          // console.log("err", err);
          setLoading(false);
          setError(true);
        };
      }
    }, [src]);

    return loading ? (
      <Skeleton variant="text" />
    ) : error ? (
      <HelpIcon />
    ) : (
      <img src={currentSrc} alt={alt} {...otherProps} />
    );
  }
);

export default ImageLoad;
