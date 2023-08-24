import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { EditableProfileFields } from "../../types";

import styles from "./EditForm.module.scss";
import { EditFormProps } from "./EditFormProps";
import { editableProfileFieldsInitialState } from "../../store/editableProfileFieldsInitialState";
import useEditFormSubmit from "../../utils/hooks/useEditFormSubmit";
import { tooltipData } from "../../store/tooltipData";
import { ButtonWithModal, EducationForm, InputField, LanguagesForm, MainTechnologiesForm, ProfileTypeSelect, Tooltip } from "./components";
import useDispatchWithDebounce from "utils/hooks/useDispatchWithDebounce";
import { PDFAnchors } from "utils/PDFAnchors";
import { ExperienceForm } from "./components/ExperianceForm/ExperienceForm";
import useDebounce from "utils/hooks/useDebounce";

export const EditForm = forwardRef(({ onFormChange, editableProfileFields, id }: EditFormProps, ref) => {
  const methods = useForm<EditableProfileFields>({
    defaultValues: editableProfileFields,
  });
  const { register, getValues, reset, handleSubmit, formState } = methods;
  const { onSubmit } = useEditFormSubmit();
  const watch = useWatch<EditableProfileFields>({ control: methods.control, defaultValue: editableProfileFields });

  const debounceFunction = useCallback(() => {
    onFormChange(watch as any);
  }, [onFormChange, watch]);
  useDebounce(debounceFunction);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset(editableProfileFieldsInitialState);
      onFormChange(getValues());
    },
  }));

  const { dispatchWithDebounce } = useDispatchWithDebounce();

  const dispatchPositionAndNameAnchor = () => {
    dispatchWithDebounce(PDFAnchors.POSITION_AND_NAME);
  };

  const dispatchMainTechnologiesAnchor = () => {
    dispatchWithDebounce(PDFAnchors.MAIN_TECHNOLOGIES);
  };

  return (
    <div className={styles.formBox}>
      <FormProvider {...methods}>
        <form>
          <div>
            <span className={styles.sectionTitle}>Profile Type:</span>
            <ProfileTypeSelect />
            <InputField
              label="Job titles"
              name="jobTitles"
              register={register}
              required
              placeholder="Enter job titles..."
              tooltipData={tooltipData.jobTitles}
              onChange={dispatchPositionAndNameAnchor}
            />
            <InputField
              label="Name"
              name="name"
              register={register}
              required
              placeholder="Enter name..."
              tooltipData={tooltipData.name}
              onChange={dispatchPositionAndNameAnchor}
            />
            <InputField
              label="Hourly rate"
              name="rate"
              register={register}
              placeholder="Enter hourly rate..."
              tooltipData={tooltipData.hourlyRate}
              onChange={dispatchPositionAndNameAnchor}
            />
            <InputField
              label="Availability"
              name="availability"
              register={register}
              placeholder="Enter availability..."
              tooltipData={tooltipData.availability}
              onChange={dispatchPositionAndNameAnchor}
            />
            <InputField
              label="Advantages"
              name="advantages"
              register={register}
              textarea
              tooltipData={tooltipData.advantages}
              onChange={dispatchPositionAndNameAnchor}
            />
            <div className={styles.sectionTitle}>
              <div>Main technologies</div>
              <Tooltip id="mainTechnologies" content={tooltipData.mainTechnologies} />
              <div className={styles.showSkillLevel}>
                <InputField
                  label="Show skill level"
                  name="showSkillLevel"
                  type="checkbox"
                  register={register}
                  required
                  boxClassName={styles.showSkillLevel}
                  inputClassName={styles.showSkillLevelInput}
                  onChange={dispatchMainTechnologiesAnchor}
                />
              </div>
            </div>
            <MainTechnologiesForm showSkillLevel={editableProfileFields.showSkillLevel} />
            <InputField
              label="Additional skills"
              name="skills"
              register={register}
              textarea
              required
              placeholder="Enter skills..."
              tooltipData={tooltipData.additionalSkills}
              onChange={dispatchMainTechnologiesAnchor}
            />
            <InputField
              label="Courses"
              name="courses"
              register={register}
              textarea
              placeholder="Enter courses..."
              tooltipData={tooltipData.courses}
              onChange={() => {
                dispatchWithDebounce(PDFAnchors.COURSES);
              }}
            />
            <div className={styles.sectionTitle}>
              <p>Education</p>
              <Tooltip id="education" content={tooltipData.education} />
            </div>
            <EducationForm />
            <div className={styles.sectionTitle}>
              <p>Languages</p>
              <Tooltip id="languages" content={tooltipData.languages} />
            </div>
            <LanguagesForm />
            <div className={styles.sectionTitle}>
              <p>Experience</p>
              <Tooltip id="experience" content={tooltipData.experience} />
            </div>
            <ExperienceForm />
          </div>
          <ButtonWithModal
            title={!formState.isDirty ? "Change some fields" : ""}
            disabled={!formState.isDirty}
            buttonText="Create profile"
            modalQuestion="Are you sure you want to create a new profile?"
            onClick={handleSubmit((data) => onSubmit(data))}
          />
          <ButtonWithModal
            title={!formState.isDirty ? "Change some fields" : ""}
            disabled={!formState.isDirty}
            buttonText="Update profile"
            modalQuestion="Are you sure you want to update profile?"
            onClick={handleSubmit((data) => onSubmit(data, id))}
          />
        </form>
      </FormProvider>
    </div>
  );
});
