import { FieldArray, UseFieldArrayReturn } from "react-hook-form";
import { EditableProfileFields, EditableProfileFieldsArray } from "types";

const useRemoveOrAddFromField = () => {
  const removeField = <T extends EditableProfileFieldsArray>(
    arrayField: UseFieldArrayReturn<EditableProfileFields, keyof Pick<EditableProfileFields, T>>,
    id: number
  ) => {
    arrayField.remove(id);
  };

  const addField = <T extends EditableProfileFieldsArray>(
    arrayField: UseFieldArrayReturn<EditableProfileFields, keyof Pick<EditableProfileFields, T>>,
    defaultValues: FieldArray<EditableProfileFields, T> | FieldArray<EditableProfileFields, T>[]
  ) => {
    arrayField.append(defaultValues);
  };

  return { removeField, addField };
};

export default useRemoveOrAddFromField;
