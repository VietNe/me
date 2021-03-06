import { useState, useEffect } from "react";
import throttle from "lodash/throttle";

const getDeviceConfig = (width, customScreenSizeCondition) => {
  if (width < 768) {
    return "sm";
  } else if (width >= 768 && width < 1024) {
    return "md";
  } else if (width >= 1024) {
    return "lg";
  } else if (customScreenSizeCondition) {
    const customScreenSize = customScreenSizeCondition(width);
    if (customScreenSize) {
      return customScreenSize;
    }
  }

  return "xlg";
};

const useBreakpoint = (customScreenSizeCondition = null) => {
  const [brkPnt, setBrkPnt] = useState(() =>
    getDeviceConfig(window.innerWidth, customScreenSizeCondition)
  );

  useEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth, customScreenSizeCondition));
    }, 200);
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, [customScreenSizeCondition]);

  return brkPnt;
};

export const screenSize = getDeviceConfig(window.innerWidth);
export default useBreakpoint;
