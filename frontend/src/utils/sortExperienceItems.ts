import { EditableProfileFields } from "../types";

export const sortExperienceItems = (data: EditableProfileFields) => {
  let sorted = [...data.experience];
  sorted.sort((a, b) => {
    return a.displayPriority - b.displayPriority;
  });
  const returnData = { ...data };
  returnData.experience = sorted;
  return returnData;
};
