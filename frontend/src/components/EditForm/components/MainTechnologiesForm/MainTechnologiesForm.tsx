import React from "react";
import { MainTechnologiesFormProps } from "./MainTechnologiesFormProps";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import useDispatchWithDebounce from "utils/hooks/useDispatchWithDebounce";
import { PDFAnchors } from "utils/PDFAnchors";
import { SelectField } from "../SelectField/SelectField";
import { EditableProfileFields, EditableProfileFieldsArray } from "types";
import styles from "./MainTechnologiesForm.module.scss";
import useRemoveOrAddFromField from "utils/hooks/useRemoveOrAddFromField";

export const MainTechnologiesForm: React.FC<MainTechnologiesFormProps> = ({ showSkillLevel }) => {
  const { dispatchWithDebounce } = useDispatchWithDebounce();
  const { control, getValues } = useFormContext<EditableProfileFields>();
  const mainTechnologies = useFieldArray<EditableProfileFields, EditableProfileFieldsArray>({
    name: "mainTechnologies",
    control,
  });
  const { removeField, addField } = useRemoveOrAddFromField();

  return (
    <>
      {mainTechnologies.fields.map((field, index) => (
        <div className={styles.mainTechnologies} key={field.id}>
          <SelectField name={`mainTechnologies.${index}.name`} control={control} getValues={getValues} index={index} />

          {showSkillLevel && (
            <Controller
              control={control}
              name={`mainTechnologies.${index}.level`}
              render={({ field: { onChange, ...rest } }) => (
                <div>
                  Level:{" "}
                  <select
                    {...rest}
                    onChange={(event) => {
                      onChange(event);
                      dispatchWithDebounce(PDFAnchors.MAIN_TECHNOLOGIES);
                    }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              )}
            />
          )}
          <button
            type="button"
            className="btn btn-small btn-red"
            onClick={() => {
              removeField(mainTechnologies, index);
            }}
          >
            Remove technology
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addField(mainTechnologies, { name: "", level: 1 })} className="btn btn-small btn-green">
        Add technology
      </button>
    </>
  );
};
