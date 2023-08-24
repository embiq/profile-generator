import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetProfileQuery } from "../../services/api";
import { editableProfileFieldsInitialState } from "../../store/editableProfileFieldsInitialState";
import { EditableProfileFields } from "../../types";
import { arrayToStringParser } from "../arrayToStringParser";
import { experienceParser } from "../experienceParser";

const useLoadProfileSubmit = () => {
  const { getValues, register, handleSubmit } = useForm<{ id: number }>();
  const [editableProfileFields, setEditableProfileFields] = useState<EditableProfileFields | null>(null);
  const editFormRef = useRef();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: profileData, isFetching: profileDataIsFetching } = useGetProfileQuery(selectedId!, { skip: !selectedId });
  useEffect(() => {
    if (profileData) {
      toast.success("Profile loaded");
      setEditableProfileFields({
        ...editableProfileFieldsInitialState,
        jobTitles: arrayToStringParser(profileData.jobTitles, " & "),
        name: profileData.name,
        advantages: arrayToStringParser(profileData.advantages, "\n"),
        mainTechnologies: profileData.technologies,
        skills: arrayToStringParser(profileData.skills, ", "),
        courses: arrayToStringParser(profileData.courses, "\n"),
        education: profileData.educations,
        languages: profileData.languages,
        experience: experienceParser(profileData.experience),
      });
    }
  }, [profileData]);

  const onSubmit = (data: { id: number }) => {
    if (selectedId !== data.id) {
      setEditableProfileFields(null);
      setSelectedId(data.id);
    }
  };

  const handleNewFormClick = () => {
    const ref: MutableRefObject<any> = editFormRef;
    if (ref.current) {
      ref.current.resetForm();
    } else {
      setEditableProfileFields(editableProfileFieldsInitialState);
    }
  };

  return {
    onSubmit,
    profileData,
    profileDataIsFetching,
    editableProfileFields,
    setEditableProfileFields,
    editFormRef,
    handleNewFormClick,
    handleSubmit,
    register,
    getValues,
  };
};

export default useLoadProfileSubmit;
