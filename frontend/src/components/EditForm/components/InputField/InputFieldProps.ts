import { UseFormRegister } from "react-hook-form";
import { EditableProfileFields } from "../../../../types";
type Join<K, P> = K extends string | number ? (P extends string | number ? `${K}${"" extends P ? "" : "."}${P}` : never) : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

export type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

export interface InputFieldProps {
  name: Leaves<EditableProfileFields>;
  register: UseFormRegister<EditableProfileFields>;
  label?: string;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  className?: string;
  placeholder?: string;
  inputClassName?: string;
  boxClassName?: string;
  tooltipData?: JSX.Element;
  onChange?: () => void;
}
