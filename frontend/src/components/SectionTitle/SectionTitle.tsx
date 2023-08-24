import React from "react";

import { SectionTitleProps } from "./SectionTitleProps";
import { View, Text } from "@react-pdf/renderer";
import { PDFStyles } from "./SectionTitlePDFStyles";

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, anchor = "" }) => {
  return (
    <View style={PDFStyles.title} id={anchor}>
      <Text>{title}</Text>
    </View>
  );
};
