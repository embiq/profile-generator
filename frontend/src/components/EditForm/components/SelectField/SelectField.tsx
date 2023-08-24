import React, { useState } from "react";
import { SelectFieldProps } from "./SelectFieldProps";
import styles from "./SelectField.module.scss";
import { useController } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import useSearchTechnologies from "../../../../utils/hooks/useSearchTechnology";
import { PDFAnchors } from "utils/PDFAnchors";
import useDispatchWithDebounce from "utils/hooks/useDispatchWithDebounce";

export const SelectField: React.FC<SelectFieldProps> = ({ control, name, getValues, index }) => {
  const { searchTechnologies, data, isLoading } = useSearchTechnologies();
  const { dispatchWithDebounce } = useDispatchWithDebounce();
  const {
    field: { onChange, value, ...rest },
  } = useController({
    name: name,
    control,
  });
  const [inputValue, setInputValue] = useState(value);

  return (
    <CreatableSelect
      {...rest}
      className={styles.techSelect}
      placeholder="Enter technology name..."
      inputValue={inputValue}
      value={value}
      isClearable={false}
      options={!isLoading ? data : undefined}
      isLoading={isLoading}
      blurInputOnSelect
      controlShouldRenderValue={true}
      onChange={(newValue) => {
        onChange(newValue?.value);
        dispatchWithDebounce(PDFAnchors.MAIN_TECHNOLOGIES);
      }}
      onMenuClose={() => setInputValue(() => getValues().mainTechnologies[index].name)}
      onInputChange={(value) => {
        setInputValue(value);
        searchTechnologies(value);
      }}
      closeMenuOnSelect={false}
    />
  );
};
