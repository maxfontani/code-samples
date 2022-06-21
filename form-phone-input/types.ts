import { UseControllerProps, Path } from 'react-hook-form';
import { PhoneInputProps } from 'react-phone-input-2';

export type Props<F> = PhoneInputProps & {
  controllerProps: UseControllerProps<F>;
};
