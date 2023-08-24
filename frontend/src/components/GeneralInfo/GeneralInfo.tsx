import React from "react";
import { View, Text, Svg, Circle } from "@react-pdf/renderer";

import { GeneralInfoProps } from "./GeneralInfoProps";
import { variables } from "../../assets/styles/variables";
import { PDFStyles } from "./GeneralInfoPDFStyles";

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ advantages, courses }) => {
  return (
    <View style={PDFStyles.generalInfo}>
      {advantages
        ? advantages.map((item, index) => (
            <View style={PDFStyles.item} key={item + index}>
              {/* @ts-ignore */}
              <Svg width="10" height="10" viewBox="0 0 10 10">
                <Circle cx="5" cy="5" r="2" fill={variables.blue} />
              </Svg>
              <View style={PDFStyles.content}>
                <Text>{item}</Text>
              </View>
            </View>
          ))
        : courses?.map((item, index) => (
            <View style={PDFStyles.item} key={item + index}>
              {/* @ts-ignore */}
              <Svg width="10" height="10" viewBox="0 0 10 10">
                <Circle cx="5" cy="5" r="2" fill={variables.blue} />
              </Svg>
              <View style={PDFStyles.content}>
                <Text>{item}</Text>
              </View>
            </View>
          ))}
    </View>
  );
};
