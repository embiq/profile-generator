import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import useDispatchWithDebounce from "utils/hooks/useDispatchWithDebounce";
import { PDFAnchors } from "utils/PDFAnchors";
import { EditableProfileFields, profileTypes } from "types";

export const ProfileTypeSelect: React.FC = () => {
  const { control } = useFormContext<EditableProfileFields>();
  const { dispatchWithDebounce } = useDispatchWithDebounce();
  return (
    <Controller
      control={control}
      name="profileType"
      render={({ field: { onChange, ...rest } }) => (
        <select
          {...rest}
          onChange={(event) => {
            onChange(event);
            dispatchWithDebounce(PDFAnchors.POSITION_AND_NAME);
          }}
        >
          {profileTypes.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    />
  );
};
