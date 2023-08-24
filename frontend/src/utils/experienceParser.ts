import { EditableExperienceField, ExperienceItem } from "../types";
import { arrayToStringParser } from "./arrayToStringParser";
import { stringToArrayParser } from "./stringToArrayParser";
import uniqid from "uniqid";

export const experienceParser = (experience: ExperienceItem[]) => {
  let experienceArray: EditableExperienceField[] = [];

  experience.forEach((expItem: ExperienceItem) => {
    let expItemForForm: EditableExperienceField = {
      duration: expItem.duration,
      name: expItem.project.name,
      description: expItem.project.description,
      tasks: arrayToStringParser(expItem.tasks, "\n"),
      marketBranch: expItem.project.marketBranch,
      toolsAndTechnologies: expItem.technologies,
      displayPriority: expItem.displayPriority,
      projectId: uniqid(),
    };
    experienceArray.push(expItemForForm);
  });

  return experienceArray;
};

export const expPars = (experience: EditableExperienceField[]) => {
  let expArray: ExperienceItem[] = [];
  experience.forEach((expItem) => {
    expArray.push({
      duration: Number(expItem.duration),
      tasks: stringToArrayParser(expItem.tasks, "\n", "description"),
      technologies: expItem.toolsAndTechnologies,
      project: { name: expItem.name, description: expItem.description, specialistNumber: 1 },
      displayPriority: Number(expItem.displayPriority),
    });
  });
  return expArray;
};
