import React from "react";
import { View, Text } from "@react-pdf/renderer";

import { EducationProps } from "./EducationProps";
import { SectionTitle } from "..";
import dayjs from "dayjs";
import { PDFStyles } from "./EducationPDFStyles";
import { PDFAnchors } from "utils/PDFAnchors";

export const Education: React.FC<EducationProps> = ({ data }) => {
  return (
    <View style={PDFStyles.container} wrap={false} id={PDFAnchors.EDUCATION}>
      <SectionTitle title="Education" />
      {data.map((item, index) => (
        <View style={PDFStyles.educationItem} key={item.name + index}>
          <View style={PDFStyles.date}>
            <Text>{dayjs(item.endDate).format("YYYY")}</Text>
          </View>
          <View style={PDFStyles.content}>
            <Text style={PDFStyles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
