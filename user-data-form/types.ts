import { UseFormSetError, Path } from "react-hook-form";
import { UserInfo, Method } from "~pages/landing/types";

export type FormValues = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
};

export type SubmitHandler = (data: FormValues, method: Method) => void;

export type Props = {
  submitHandler: SubmitHandler;
  userInfo: UserInfo;
};

export type RegisterUser = (
  userData: FormValues,
  setError: UseFormSetError<FormValues>
) => Promise<boolean>;

export type CheckIsPasswordConfirmed = (
  password: string,
  confirmation: string,
  errorHandler: () => void
) => boolean;

export type ValidatePhoneOrEmail = <F>(
  userData: string,
  formMethod: Method,
  errorField: Path<F>,
  setError: UseFormSetError<F>
) => Promise<string | false>;

export type SubmitUserDataForm = (
  data: FormValues,
  formMethod: Method,
  setError: UseFormSetError<FormValues>,
  setApiError: React.Dispatch<React.SetStateAction<string | null>>,
  submitHandler: SubmitHandler
) => void;
