import { useEffect } from "react";
import { useCreateProfileMutation, useUpdateProfileMutation } from "../../services/api";
import { CreateProfile, EditableProfileFields } from "../../types";
import { expPars } from "../experienceParser";
import { stringToArrayParser } from "../stringToArrayParser";
import { toast } from "react-toastify";

const useEditFormSubmit = () => {
  const [createProfile, { isSuccess: isCreateProfileSuccess, isError: isCreateProfileError, error: createProfileError }] = useCreateProfileMutation();
  const [updateProfile, { isSuccess: isUpdateProfileSuccess, isError: isUpdateProfileError, error: updateProfileError }] = useUpdateProfileMutation();

  useEffect(() => {
    if (isCreateProfileSuccess) {
      toast.success("Profile created");
    } else if (isCreateProfileError) {
      toast.error(createProfileError?.message || "Something went wrong");
    }
  }, [isCreateProfileSuccess, isCreateProfileError, createProfileError]);

  useEffect(() => {
    if (isUpdateProfileSuccess) {
      toast.success("Profile updated");
    } else if (isUpdateProfileError) {
      toast.error(updateProfileError?.message || "Something went wrong");
    }
  }, [isUpdateProfileSuccess, isUpdateProfileError, updateProfileError]);

  const onSubmit = (data: EditableProfileFields, id?: number) => {
    const profile: CreateProfile = {
      advantages: data.advantages.split("\n"),
      courses: stringToArrayParser(data.courses, "\n", "name"),
      jobTitles: stringToArrayParser(data.jobTitles, " & ", "title"),
      languages: data.languages,
      name: data.name,
      skills: stringToArrayParser(data.skills, ", ", "name"),
      technologies: data.mainTechnologies,
      experience: expPars(data.experience),
      educations: data.education,
    };

    if (typeof id !== "undefined") {
      updateProfile({ data: profile, id });
    } else {
      createProfile(profile);
    }
  };

  return { onSubmit };
};

export default useEditFormSubmit;
