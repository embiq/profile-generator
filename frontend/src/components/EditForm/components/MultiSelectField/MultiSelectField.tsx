import React from "react";
import { MultiSelectFieldProps } from "./MultiSelectFieldProps";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import useSearchTechnologies from "../../../../utils/hooks/useSearchTechnology";
import { Technology } from "../../../../types";

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({ control, name, onFormChange }) => {
  const { searchTechnologies, data, isLoading } = useSearchTechnologies();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...rest } }) => (
        <CreatableSelect
          {...rest}
          isMulti={true}
          defaultValue={value.map((el: Technology) => ({ value: el.name, label: el.name }))}
          options={!isLoading ? data : undefined}
          onChange={(input) => {
            onChange(input.map((el) => ({ name: el.label })));
            onFormChange();
          }}
          onInputChange={(value) => {
            searchTechnologies(value);
          }}
          blurInputOnSelect
          controlShouldRenderValue={true}
          closeMenuOnSelect={false}
        />
      )}
    />
  );
};
