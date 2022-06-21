import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonPrimary, FormInput } from "../..";
import { LeftPhoneArrow } from "~assets/";
import { submitUserDataForm } from "./utils";
import { getPhoneWithPlus, toggleMethod } from "~assets/utils/Helpers";
import { USER_DATA_FORM } from "./constants";
import { LANDING_PAGE } from "~pages/landing/constants";
import { SIGNUP_METHOD } from "../signup-method/constants";
import { BUTTON_SIZE_MEDIUM } from "~assets/constants";
import {
  PHONE_VALIDATION_OPTIONS,
  NAME_VALIDATION_OPTIONS,
  EMAIL_VALIDATION_OPTIONS,
  PASSWORD_VALIDATION_OPTIONS,
} from "../../constants";
import { FormValues, Props } from "./types";
import "react-phone-input-2/lib/style.css";
import styles from "./index.module.scss";

export const UserDataForm = ({ submitHandler, userInfo }: Props) => {
  const { TAGS, PLACEHOLDERS, LEFT_PHONE_ARROW_STYLE } = USER_DATA_FORM;

  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: USER_DATA_FORM.FORM_VALIDATION_MODE,
    defaultValues: USER_DATA_FORM.getDefaultValues(userInfo),
  });

  const { userData, userMethod } = userInfo;
  const formMethod = toggleMethod(userMethod);
  const subtitle =
    userMethod === LANDING_PAGE.METHODS.EMAIL
      ? userData
      : getPhoneWithPlus(userData);

  const onSubmit = async (data: FormValues) =>
    submitUserDataForm(data, formMethod, setError, setApiError, submitHandler);

  return (
    <div className={styles.wrapper}>
      <section className={styles.title}>
        <h3>{USER_DATA_FORM.TITLE}</h3>
      </section>
      <section className={styles.subtitle}>
        <LeftPhoneArrow {...LEFT_PHONE_ARROW_STYLE} />
        &emsp;
        <span>{subtitle}</span>
      </section>
      <section className={styles.form}>
        <form
          id={USER_DATA_FORM.FORM_ID}
          className={styles.formOuter}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formInputs}>
            <div className={styles.formInputsRow}>
              <FormInput
                tag={TAGS.FIRST_NAME}
                placeholder={PLACEHOLDERS.FIRST_NAME}
                register={register}
                options={NAME_VALIDATION_OPTIONS.RULES}
                errors={errors}
              />
              <FormInput
                tag={TAGS.LAST_NAME}
                placeholder={PLACEHOLDERS.LAST_NAME}
                register={register}
                options={NAME_VALIDATION_OPTIONS.RULES}
                errors={errors}
              />
            </div>
            <div className={styles.formInputsRow}>
              <FormInput
                tag={TAGS.USERNAME}
                placeholder={PLACEHOLDERS.USERNAME}
                register={register}
                options={NAME_VALIDATION_OPTIONS.RULES}
                errors={errors}
              />
              {formMethod === SIGNUP_METHOD.METHODS.PHONE ? (
                <FormInput
                  tag={TAGS.PHONE}
                  placeholder={PLACEHOLDERS.PHONE}
                  register={register}
                  options={PHONE_VALIDATION_OPTIONS.RULES}
                  errors={errors}
                />
              ) : (
                <FormInput
                  tag={TAGS.EMAIL}
                  placeholder={PLACEHOLDERS.EMAIL}
                  register={register}
                  options={EMAIL_VALIDATION_OPTIONS}
                  errors={errors}
                />
              )}
            </div>
            <div className={styles.formInputsRow}>
              <FormInput
                tag={TAGS.PASSWORD}
                placeholder={PLACEHOLDERS.PASSWORD}
                type={USER_DATA_FORM.INPUT_TYPES.PASSWORD}
                register={register}
                options={PASSWORD_VALIDATION_OPTIONS.RULES}
                errors={errors}
              />
              <FormInput
                tag={TAGS.CONFIRMATION}
                placeholder={PLACEHOLDERS.CONFIRMATION}
                type={USER_DATA_FORM.INPUT_TYPES.PASSWORD}
                register={register}
                options={PASSWORD_VALIDATION_OPTIONS.RULES}
                errors={errors}
              />
            </div>
          </div>
          <section className={styles.buttonsOuter}>
            <ButtonPrimary
              size={BUTTON_SIZE_MEDIUM}
              text={USER_DATA_FORM.BUTTON_PRIMARY}
            />
          </section>
        </form>
        {apiError && <span className={styles.errorMessage}>{apiError}</span>}
      </section>
    </div>
  );
};
