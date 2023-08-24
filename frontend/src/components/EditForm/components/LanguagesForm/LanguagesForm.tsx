import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import useDispatchWithDebounce from "utils/hooks/useDispatchWithDebounce";
import { EditableProfileFields, EditableProfileFieldsArray } from "types";
import styles from "./LanguagesForm.module.scss";
import useRemoveOrAddFromField from "utils/hooks/useRemoveOrAddFromField";
import { InputField } from "../InputField/InputField";
import { PDFAnchors } from "utils/PDFAnchors";

export const LanguagesForm: React.FC = () => {
  const { dispatchWithDebounce } = useDispatchWithDebounce();
  const dispatchLanguagesAnchor = () => {
    dispatchWithDebounce(PDFAnchors.LANGUAGES);
  };

  const { control, register } = useFormContext<EditableProfileFields>();
  const languages = useFieldArray<EditableProfileFields, EditableProfileFieldsArray>({
    name: "languages",
    control,
  });

  const { removeField, addField } = useRemoveOrAddFromField();

  return (
    <>
      {languages.fields.map((field, index) => (
        <div key={field.id} className={styles.languages}>
          <InputField
            name={`languages.${index}.name`}
            register={register}
            required
            placeholder="Enter language..."
            onChange={dispatchLanguagesAnchor}
          />
          <InputField
            name={`languages.${index}.level`}
            register={register}
            required
            placeholder="Enter language level..."
            onChange={dispatchLanguagesAnchor}
          />
          <button type="button" className="btn btn-small btn-red" onClick={() => removeField(languages, index)}>
            Remove language
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addField(languages, { name: "", level: "" })} className="btn btn-small btn-green">
        Add language
      </button>
    </>
  );
};
