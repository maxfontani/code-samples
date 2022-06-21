import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ButtonPrimary,
  ButtonSecondary,
  FormInput,
  FormPhoneInput,
} from "../..";
import { fetchResetPasswordCode } from "~services/api";
import { getPhoneWithPlus, toggleMethod } from "~assets/utils/helpers";
import { RESET_PASSWORD } from "./constants";
import {
  EMAIL_VALIDATION_OPTIONS,
  PHONE_VALIDATION_OPTIONS,
} from "../../constants";
import { BUTTON_SIZE_MEDIUM } from "~assets/constants";
import { FormValues, Props } from "./types";
import { Method } from "~pages/landing/types";
import "react-phone-input-2/lib/style.css";
import styles from "./index.module.css";

export const ResetPasswordMethod = ({ submitHandler }: Props) => {
  const { DEFAULT_METHOD, DEFAULT_VALUES, TAGS, METHODS, API_ERROR_MESSAGE } =
    RESET_PASSWORD;

  const [resetMethod, setResetMethod] = useState<Method>(DEFAULT_METHOD);

  const {
    control,
    register,
    reset: resetInput,
    trigger,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: RESET_PASSWORD.FORM_VALIDATION_MODE,
    defaultValues: DEFAULT_VALUES,
  });

  const onMethodChange = () => {
    resetInput();
    trigger();
    setResetMethod(toggleMethod(resetMethod));
  };

  const onSubmit: SubmitHandler<FormValues> = async ({ resetData }) => {
    try {
      const userData =
        resetMethod === "phone" ? getPhoneWithPlus(resetData) : resetData;
      const response = await fetchResetPasswordCode(userData);
      const { verificationCode, error } = response;

      if (error) {
        setError(TAGS.RESET_DATA, { message: error });
        return;
      }
      if (!verificationCode) {
        setError(TAGS.RESET_DATA, { message: API_ERROR_MESSAGE });
        return;
      }

      submitHandler(resetData, resetMethod, verificationCode);
    } catch {
      setError(
        TAGS.RESET_DATA,
        { message: RESET_PASSWORD.API_ERROR_MESSAGE },
        { shouldFocus: true }
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.title}>
        <h3>{RESET_PASSWORD.TITLE}</h3>
        <p className={styles.subTitle}>
          {resetMethod === METHODS.EMAIL
            ? RESET_PASSWORD.TEXT_EMAIL
            : RESET_PASSWORD.TEXT_PHONE}
        </p>
      </section>
      <form
        id={RESET_PASSWORD.FORM_ID}
        className={styles.formOuter}
        onSubmit={handleSubmit(onSubmit)}
      >
        {resetMethod === METHODS.PHONE && (
          <FormPhoneInput
            controllerProps={{
              name: TAGS.RESET_DATA,
              control: control,
              rules: PHONE_VALIDATION_OPTIONS.RULES,
            }}
            enableAreaCodes
            countryCodeEditable={false}
            placeholder={RESET_PASSWORD.INPUT_PHONE_PLACEHOLDER}
            country={RESET_PASSWORD.INPUT_PHONE_DEFAULT_COUNTRY}
          />
        )}
        {resetMethod === METHODS.EMAIL && (
          <FormInput
            tag={TAGS.RESET_DATA}
            placeholder={RESET_PASSWORD.INPUT_EMAIL_PLACEHOLDER}
            register={register}
            options={EMAIL_VALIDATION_OPTIONS}
            errors={errors}
          />
        )}
        <section className={styles.buttonsOuter}>
          <ButtonPrimary
            size={BUTTON_SIZE_MEDIUM}
            text={RESET_PASSWORD.BUTTON_PRIMARY}
          />
          <ButtonSecondary
            size={BUTTON_SIZE_MEDIUM}
            text={
              RESET_PASSWORD.BUTTON_SECONDARY_TEXT + toggleMethod(resetMethod)
            }
            clickHandler={onMethodChange}
          />
        </section>
      </form>
    </div>
  );
};
