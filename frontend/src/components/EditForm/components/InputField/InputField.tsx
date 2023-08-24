import React, { ChangeEvent } from "react";
import { InputFieldProps } from "./InputFieldProps";
import styles from "./InputField.module.scss";
import { Tooltip } from "../Tooltip/Tooltip";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  required = false,
  type = "text",
  textarea = false,
  className = styles.sectionTitle,
  placeholder = "",
  inputClassName = "",
  boxClassName = "",
  tooltipData,
  onChange: onInputChange,
}) => {
  const { onChange, ...restValues } = register(name, { required: required });

  const onChangeFunction = (event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
    onInputChange?.();
    onChange(event);
  };

  return (
    <div className={boxClassName}>
      {label && (
        <div className={className}>
          {label}
          {tooltipData && <Tooltip id={name} content={tooltipData} />}
        </div>
      )}
      {textarea ? (
        <textarea {...restValues} required={required} placeholder={placeholder} onChange={onChangeFunction} />
      ) : (
        <input className={inputClassName} {...restValues} required={required} type={type} placeholder={placeholder} onChange={onChangeFunction} />
      )}
    </div>
  );
};
