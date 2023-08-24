import React from "react";

import { ProjectProps } from "./ProjectProps";
import { View, Text } from "@react-pdf/renderer";
import { ProjectDurationTime } from "./components/ProjectDurationTime/ProjectDurationTime";
import { PDFStyles } from "./ProjectPDFStyles";

export const Project: React.FC<ProjectProps> = ({ experienceItem }) => {
  const tasks = experienceItem.tasks.split("\n");
  const toolsAndTechnologies = experienceItem.toolsAndTechnologies;

  return (
    <View wrap={false}>
      <View>
        <Text style={PDFStyles.name}>{experienceItem.name}</Text>
      </View>
      {experienceItem.description && <Text style={PDFStyles.description}>{experienceItem.description}</Text>}
      <View style={PDFStyles.content}>
        {!!experienceItem.duration && Number(experienceItem.duration) !== 0 && (
          <View style={PDFStyles.keyAndValue}>
            <Text style={PDFStyles.key}>Period of time</Text>
            <ProjectDurationTime numberOfMonths={Number(experienceItem.duration)} />
          </View>
        )}
        {!!experienceItem.marketBranch && (
          <View style={PDFStyles.keyAndValue} key={experienceItem.marketBranch}>
            <Text style={PDFStyles.key}>Branch</Text>
            <Text>{experienceItem.marketBranch}</Text>
          </View>
        )}
        {!!experienceItem.tasks && (
          <View style={PDFStyles.keyAndValue}>
            <Text style={PDFStyles.key}>Tasks</Text>
            <View>
              {tasks.map((task, index) => (
                <View style={PDFStyles.tasks} key={task + index}>
                  <Text style={PDFStyles.bullet}>&#8226;</Text>
                  <Text>{task}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {!!experienceItem.toolsAndTechnologies && (
          <View style={PDFStyles.keyAndValue}>
            <Text style={PDFStyles.key}>Tools and technologies</Text>
            <View style={PDFStyles.toolsAndTechnologies}>
              {toolsAndTechnologies.map((item, index) => (
                <Text key={item.name + index}>{index === toolsAndTechnologies.length - 1 ? `${item.name}.` : `${item.name}, `}</Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
