// https://medium.com/@jc_perez_ch/dynamic-react-portals-with-hooks-ddeb127fa516
import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ id, children }) => {
  console.log("portal id ---", document.getElementById(id), children);
  const el = useRef(
    document.getElementById(id) || document.createElement("div")
  );
  const [dynamic] = useState(!el.current.parentElement);
  useEffect(() => {
    if (dynamic) {
      el.current.id = id;
      document.body.appendChild(el.current);
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    };
  }, [id]);
  console.log("el-current", el.current);
  return createPortal(children, el.current);
};

export default memo(Portal);
