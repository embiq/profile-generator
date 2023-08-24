import { EditableProfileFields } from "../../../../types";

export interface SelectFieldProps {
  control: any;
  name: string;
  getValues: () => EditableProfileFields;
  index: number;
}
