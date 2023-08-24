import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { PositionAndNameProps } from "./PositionAndNameProps";

import { PDFStyles } from "./PositionAndNamePDFStyles";
import { PDFAnchors } from "utils/PDFAnchors";

export const PositionAndName: React.FC<PositionAndNameProps> = ({ name, positions }) => {
  return (
    <View id={PDFAnchors.POSITION_AND_NAME}>
      <Text style={PDFStyles.position}>{positions}</Text>
      <Text style={PDFStyles.name}>{name}</Text>
    </View>
  );
};
