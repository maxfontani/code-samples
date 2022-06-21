import { Method } from '../../../Pages/Landing/types';

export type Props = {
  submitHandler: (
    resetData: FormValues['resetData'],
    method: Method,
    verificationCode: string
  ) => void;
};

export type FormValues = {
  resetData: string;
};
