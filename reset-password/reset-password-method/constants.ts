import { ValidationMode } from 'react-hook-form';

export const RESET_PASSWORD = {
  TITLE: 'Reset password',
  TEXT_PHONE: 'Please enter your phone number to receive a verification code',
  TEXT_EMAIL: 'Please enter your e-mail to receive a verification code',
  BUTTON_PRIMARY: 'Continue',
  BUTTON_SECONDARY_TEXT: 'Reset via ',
  INPUT_EMAIL_PLACEHOLDER: 'Email',
  INPUT_PHONE_PLACEHOLDER: '',
  INPUT_PHONE_DEFAULT_COUNTRY: 'ua',
  METHODS: { PHONE: 'phone', EMAIL: 'email' } as const,
  DEFAULT_METHOD: 'phone' as const,
  TAGS: {
    RESET_DATA: 'resetData',
  } as const,
  FORM_ID: 'reset-method-form',
  FORM_VALIDATION_MODE: 'onTouched' as keyof ValidationMode,
  DEFAULT_VALUES: {
    resetData: '',
  } as const,
  API_ERROR_MESSAGE:
    'Connection error. Please check your network or try again later.',
};
