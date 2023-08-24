import React from "react";

import { ProjectDurationTimeProps } from "./ProjectDurationTimeProps";
import { Text } from "@react-pdf/renderer";
import { calculateDurationTime } from "../../../../utils/calculateDurationTime";

export const ProjectDurationTime: React.FC<ProjectDurationTimeProps> = ({ numberOfMonths }) => {
  return <Text>{calculateDurationTime(numberOfMonths)}</Text>;
};
