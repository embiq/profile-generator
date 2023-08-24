import { View } from "@react-pdf/renderer";
import React from "react";
import { PDFAnchors } from "utils/PDFAnchors";
import { GeneralInfo, SectionTitle } from "..";

import { CoursesProps } from "./CoursesProps";

export const Courses: React.FC<CoursesProps> = ({ courses }) => {
  return (
    <View wrap={false} id={PDFAnchors.COURSES}>
      <SectionTitle title="Courses" />
      <GeneralInfo courses={courses?.split("\n")} />
    </View>
  );
};
