import React from "react";
import { View, Text } from "@react-pdf/renderer";

import { MainTechnologiesProps } from "./MainTechnologiesProps";
import { MainTechnology, SectionTitle } from "..";
import { PDFStyles } from "./MainTechnologiesPDFStyles";
import { PDFAnchors } from "utils/PDFAnchors";

export const MainTechnologies: React.FC<MainTechnologiesProps> = ({ mainSkills, additionalSkills, showSkillLevel, viewBreak = false }) => {
  return (
    <View style={PDFStyles.mainTechnologies} break={viewBreak}>
      <SectionTitle title="Main technologies" anchor={PDFAnchors.MAIN_TECHNOLOGIES} />
      <View style={[PDFStyles.skills, !showSkillLevel ? PDFStyles.skillsWithoutLevel : {}]}>
        <View style={!showSkillLevel ? PDFStyles.skillsMainWithoutLevel : PDFStyles.skillsMain}>
          {mainSkills.map((item, index) => (
            <MainTechnology name={item.name} level={item.level} key={`${item.name}-${index}`} showSkillLevel={showSkillLevel} />
          ))}
        </View>
        <View style={PDFStyles.skillsAdditional} wrap={false}>
          {!!additionalSkills && (
            <>
              <Text style={PDFStyles.additionalSkillTitle}>Additional skills</Text>
              <View style={PDFStyles.content}>
                <Text>{additionalSkills}</Text>
              </View>
            </>
          )}
          {showSkillLevel && <MainTechnology isLegend showSkillLevel={showSkillLevel} />}
        </View>
      </View>
    </View>
  );
};
