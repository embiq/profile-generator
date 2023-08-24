import { usePDF } from "@react-pdf/renderer";
import { useEffect } from "react";
import { useAppSelector } from "../store/store";

export const PDFViewer = ({ title, style, className, children, innerRef, showToolbar = true, ...props }: any) => {
  const [instance, updateInstance] = usePDF({ document: children });
  const anchor = useAppSelector((state) => state.anchor.value);

  useEffect(updateInstance, [children, updateInstance]);

  const src = instance.url ? `${instance.url}#${anchor}` : null;

  return <iframe src={src} title={title} ref={innerRef} style={style} className={className} {...props} />;
};

export default PDFViewer;
