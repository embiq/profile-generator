import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import useDispatchWithDebounce from "utils/hooks/useDispatchWithDebounce";
import { EditableProfileFields, EditableProfileFieldsArray } from "types";
import styles from "./EducationForm.module.scss";
import useRemoveOrAddFromField from "utils/hooks/useRemoveOrAddFromField";
import { InputField } from "../InputField/InputField";
import { PDFAnchors } from "utils/PDFAnchors";

export const EducationForm: React.FC = () => {
  const { dispatchWithDebounce } = useDispatchWithDebounce();
  const dispatchEducationAnchor = () => {
    dispatchWithDebounce(PDFAnchors.EDUCATION);
  };

  const { control, register } = useFormContext<EditableProfileFields>();
  const education = useFieldArray<EditableProfileFields, EditableProfileFieldsArray>({
    name: "education",
    control,
  });

  const { removeField, addField } = useRemoveOrAddFromField();

  return (
    <>
      {education.fields.map((field, index) => (
        <div key={field.id} className={styles.education}>
          <InputField
            name={`education.${index}.endDate`}
            register={register}
            required
            placeholder="Enter end date..."
            onChange={dispatchEducationAnchor}
          />
          <InputField name={`education.${index}.name`} register={register} required placeholder="Enter name..." onChange={dispatchEducationAnchor} />
          <InputField
            name={`education.${index}.description`}
            register={register}
            placeholder="Enter description..."
            onChange={dispatchEducationAnchor}
          />
          <button
            type="button"
            className="btn btn-small btn-red"
            onClick={() => {
              removeField(education, index);
            }}
          >
            Remove education item
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          addField(education, { endDate: "", name: "", description: "" });
        }}
        className="btn btn-small btn-green"
      >
        Add education item
      </button>
    </>
  );
};
