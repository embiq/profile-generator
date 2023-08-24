import React from "react";
import { Project, SectionTitle } from "..";

import { ExperienceProps } from "./ExperienceProps";
import { View } from "@react-pdf/renderer";
import { PDFStyles } from "./ExperiencePDFStyles";

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <View style={PDFStyles.container}>
      <View wrap={false} id={experience[0].projectId}>
        <SectionTitle title="Experience" />
        <Project experienceItem={experience[0]} key={experience[0].name} />
      </View>
      {experience.length > 1 &&
        experience.map((experienceItem, index) => {
          return (
            index > 0 && (
              <View key={experienceItem.name + index} id={experienceItem.projectId}>
                <Project experienceItem={experienceItem} key={experienceItem.name} />
              </View>
            )
          );
        })}
    </View>
  );
};
