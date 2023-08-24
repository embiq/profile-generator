import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import useDispatchWithDebounce from "utils/hooks/useDispatchWithDebounce";
import { EditableProfileFields } from "types";
import styles from "./ExperienceForm.module.scss";
import useRemoveOrAddFromField from "utils/hooks/useRemoveOrAddFromField";
import { InputField } from "../InputField/InputField";
import { MultiSelectField } from "../MultiSelectField/MultiSelectField";
import uniqid from "uniqid";

export const ExperienceForm: React.FC = () => {
  const { dispatchWithDebounce } = useDispatchWithDebounce();

  const { control, register } = useFormContext<EditableProfileFields>();
  const experience = useFieldArray<EditableProfileFields, "experience">({
    name: "experience",
    control,
  });

  const { removeField, addField } = useRemoveOrAddFromField();
  const addExperienceItem = () =>
    addField(experience, {
      duration: 0,
      name: "",
      description: "",
      tasks: "",
      toolsAndTechnologies: [],
      displayPriority: 0,
      projectId: uniqid(),
    });

  return (
    <>
      {experience.fields.map((field, index) => (
        <div key={field.id} className={styles.experience}>
          <div className={styles.flex}>
            <InputField
              label="Name"
              name={`experience.${index}.name`}
              register={register}
              required
              boxClassName={styles.inputBox}
              className={styles.inputLabel}
              inputClassName={styles.nameField}
              onChange={() => dispatchWithDebounce(field.projectId)}
            />
            <InputField
              label="Display priority"
              name={`experience.${index}.displayPriority`}
              register={register}
              type="number"
              boxClassName={styles.inputBox}
              className={styles.inputLabel}
              inputClassName={styles.displayPriorityField}
              onChange={() => dispatchWithDebounce(field.projectId)}
            />
          </div>
          <InputField
            label="Description"
            name={`experience.${index}.description`}
            register={register}
            className={styles.inputLabel}
            textarea
            onChange={() => dispatchWithDebounce(field.projectId)}
          />
          <InputField
            label="Duration"
            name={`experience.${index}.duration`}
            register={register}
            type="number"
            className={styles.inputLabel}
            onChange={() => dispatchWithDebounce(field.projectId)}
          />
          <InputField
            label="Branch"
            name={`experience.${index}.marketBranch`}
            register={register}
            className={styles.inputLabel}
            onChange={() => {
              dispatchWithDebounce(field.projectId);
            }}
          />
          <InputField
            label="Tasks"
            name={`experience.${index}.tasks`}
            register={register}
            className={styles.inputLabel}
            textarea
            onChange={() => dispatchWithDebounce(field.projectId)}
          />
          <p className={styles.inputLabel}>Technologies:</p>
          <MultiSelectField
            name={`experience.${index}.toolsAndTechnologies`}
            control={control}
            onFormChange={() => dispatchWithDebounce(field.projectId)}
          />
          <button type="button" className="btn btn-small btn-red" onClick={() => removeField(experience, index)}>
            Remove project
          </button>
        </div>
      ))}
      <button type="button" onClick={addExperienceItem} className="btn btn-small btn-green">
        Add experience item
      </button>
    </>
  );
};
