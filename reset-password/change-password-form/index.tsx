import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ButtonPrimary, FormInput } from "../..";
import { submitChangePasswordForm } from "./utils";
import { CHANGE_PASSWORD } from "./constants";
import { BUTTON_SIZE_MEDIUM } from "~assets/constants";
import { PASSWORD_VALIDATION_OPTIONS } from "../../constants";
import { FormValues, Props } from "./types";
import styles from "./index.module.scss";

export const ChangePasswordForm = ({ submitHandler }: Props) => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<FormValues>({
    mode: CHANGE_PASSWORD.FORM_VALIDATION_MODE,
    defaultValues: CHANGE_PASSWORD.DEFAULT_VALUES,
  });

  const { verificationCode } = useParams();

  const onSubmit = (data: FormValues) => {
    submitChangePasswordForm(data, verificationCode, setError, submitHandler);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.header}>
        <h4 className={styles.title}>{CHANGE_PASSWORD.TITLE}</h4>
        <p className={styles.subTitle}>{CHANGE_PASSWORD.SUBTITLE}</p>
      </section>
      <form
        id={CHANGE_PASSWORD.FORM_ID}
        className={styles.formOuter}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          tag={CHANGE_PASSWORD.TAGS.PASSWORD}
          placeholder={CHANGE_PASSWORD.PLACEHOLDERS.PASSWORD}
          type={CHANGE_PASSWORD.INPUT_TYPES.PASSWORD}
          register={register}
          options={PASSWORD_VALIDATION_OPTIONS.RULES}
          errors={errors}
        />
        <FormInput
          tag={CHANGE_PASSWORD.TAGS.PASSWORD_CONFIRMATION}
          placeholder={CHANGE_PASSWORD.PLACEHOLDERS.PASSWORD_CONFIRMATION}
          type={CHANGE_PASSWORD.INPUT_TYPES.PASSWORD}
          register={register}
          options={PASSWORD_VALIDATION_OPTIONS.RULES}
          errors={errors}
        />
        <section className={styles.buttonOuter}>
          <ButtonPrimary
            size={BUTTON_SIZE_MEDIUM}
            text={CHANGE_PASSWORD.BUTTON_PRIMARY}
          />
        </section>
      </form>
    </div>
  );
};
