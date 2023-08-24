import { MainTechnologyItem } from "../../types";

export interface MainTechnologiesProps {
  mainSkills: MainTechnologyItem[];
  additionalSkills: string;
  showSkillLevel: boolean;
  viewBreak?: boolean;
}
