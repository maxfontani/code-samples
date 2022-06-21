import { fetchChangePassword } from "~services/api/";
import { checkIsPasswordConfirmed } from "~utils";
import { CHANGE_PASSWORD } from "./constants";
import { SubmitChangePasswordForm, FormValues } from "./types";

export const submitChangePasswordForm: SubmitChangePasswordForm = async (
  data,
  verificationCode,
  setError,
  submitHandler
) => {
  const { password, passwordConfirmation } = data;
  const isPasswordConfirmed = checkIsPasswordConfirmed<FormValues>(
    password,
    passwordConfirmation,
    setError
  );

  if (!isPasswordConfirmed) return;
  if (!verificationCode) {
    setError(
      CHANGE_PASSWORD.TAGS.PASSWORD_CONFIRMATION,
      CHANGE_PASSWORD.VERIFICATION_ERROR
    );
    return;
  }

  const response = await fetchChangePassword(
    password,
    passwordConfirmation,
    verificationCode
  );

  const { error } = response;

  if (error) {
    setError(CHANGE_PASSWORD.TAGS.PASSWORD_CONFIRMATION, { message: error });
    return;
  }

  submitHandler();
};
