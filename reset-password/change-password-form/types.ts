import { UseFormSetError } from 'react-hook-form';

export type FormValues = {
  password: string;
  passwordConfirmation: string;
};

export type SubmitHandler = () => void;

export type Props = {
  submitHandler: SubmitHandler;
};

export type SubmitChangePasswordForm = (
  data: FormValues,
  verificationCode: string | undefined,
  setError: UseFormSetError<FormValues>,
  submitHandler: SubmitHandler
) => void;
