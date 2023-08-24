import React from "react";
import { Text } from "@react-pdf/renderer";
import { PDFStyles } from "./PageNumberPDFStyles";

export const PageNumber: React.FC = () => {
  return <Text style={PDFStyles.pageNumbers} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />;
};
