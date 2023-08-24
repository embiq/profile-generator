import React from "react";

import { View } from "@react-pdf/renderer";
import { Courses, Education, Experience, GeneralInfo, Languages, MainTechnologies, PageNumber, PositionAndName, RateAndAvailability } from "..";
import { PDFProps } from "./PDFProps";

export const PDF: React.FC<PDFProps> = ({ editableProfileFields }) => {
  return (
    <View>
      <PageNumber />
      <PositionAndName positions={editableProfileFields.jobTitles} name={editableProfileFields.name} />
      {editableProfileFields.rate !== "" || editableProfileFields.availability !== "" ? (
        <RateAndAvailability rate={editableProfileFields.rate} availability={editableProfileFields.availability} />
      ) : null}
      {!!editableProfileFields.advantages && <GeneralInfo advantages={editableProfileFields.advantages.split("\n")} />}
      <MainTechnologies
        mainSkills={editableProfileFields.mainTechnologies}
        additionalSkills={editableProfileFields.skills}
        showSkillLevel={editableProfileFields.showSkillLevel}
      />
      {!!editableProfileFields.courses && <Courses courses={editableProfileFields.courses} />}
      {editableProfileFields.education.length > 0 && <Education data={editableProfileFields.education} />}
      {editableProfileFields.languages.length > 0 && <Languages languages={editableProfileFields.languages} />}
      {editableProfileFields.experience.length > 0 && <Experience experience={editableProfileFields.experience} />}
    </View>
  );
};
