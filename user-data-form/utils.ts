import { fetchRegisterUser } from "~services/api/";
import { validatePhoneOrEmail } from "../utils";
import { checkIsPasswordConfirmed } from "../../utils";
import { USER_DATA_FORM } from "./constants";
import { RESPONSES } from "~services/api/constants";
import { SubmitUserDataForm, RegisterUser } from "./types";

export const registerUser: RegisterUser = async (data, setError) => {
  const userRegistrationResponse = await fetchRegisterUser(data);
  const { errors, success, exists } = userRegistrationResponse;

  if (success) return true;

  if (exists) {
    setError(USER_DATA_FORM.TAGS.EMAIL, {
      message: RESPONSES.USER_ALREADY_EXISTS,
    });
    setError(USER_DATA_FORM.TAGS.PHONE, {
      message: RESPONSES.USER_ALREADY_EXISTS,
    });
  }

  if (errors) {
    errors.forEach((error) => {
      setError(error.param, { message: error.msg }, { shouldFocus: false });
    });
  }

  return false;
};

export const submitUserDataForm: SubmitUserDataForm = async (
  data,
  formMethod,
  setError,
  setApiError,
  submitHandler
) => {
  try {
    setApiError(null);

    const isPasswordConfirmed = checkIsPasswordConfirmed(
      data.password,
      data.passwordConfirmation,
      setError
    );
    const isPhoneOrEmailValid = await validatePhoneOrEmail(
      data[formMethod],
      formMethod,
      formMethod,
      setError
    );

    if (!isPasswordConfirmed || !isPhoneOrEmailValid) return;

    const isUserRegistered = await registerUser(data, setError);

    if (!isUserRegistered) return;

    submitHandler(data, formMethod);
  } catch {
    setApiError(USER_DATA_FORM.API_ERROR_MESSAGE);
  }
};
