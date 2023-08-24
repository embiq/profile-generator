import { EditableProfileFields } from "./../../types";
export interface EditFormProps {
  onFormChange: (data: EditableProfileFields) => void;
  editableProfileFields: EditableProfileFields;
  id: number;
}
