export const CHANGE_PASSWORD = {
  TITLE: 'Change password',
  SUBTITLE: 'Please enter your new password',
  FORM_ID: 'change-password-form',
  BUTTON_PRIMARY: 'Confirm',
  DEFAULT_VALUES: { password: '', passwordConfirmation: '' },
  FORM_VALIDATION_MODE: 'onTouched',
  VERIFICATION_ERROR: {
    message: 'Invalid verification code. Please try again.',
    shouldFocus: false,
  },
  TAGS: {
    PASSWORD: 'password',
    PASSWORD_CONFIRMATION: 'passwordConfirmation',
  },
  PLACEHOLDERS: {
    PASSWORD: 'Password',
    PASSWORD_CONFIRMATION: 'Confirm password',
  },
  INPUT_TYPES: {
    PASSWORD: 'password',
  },
} as const;
