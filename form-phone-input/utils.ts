import { ThemeObject } from '../../../Styles/types';

export const getPhoneInputStyles = (theme: ThemeObject) =>
  ({
    containerStyle: {
      border: 'none',
      width: '100%',
      height: '35px',
    },
    buttonStyle: {
      border: 'none',
      backgroundColor: theme.colors.transparent,
    },
    inputStyle: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      lineHeight: '140%',
      color: theme.colors.baseTextColor,
      backgroundColor: theme.colors.transparent,
      border: 'none',
      borderRadius: '0',
      borderBottom: `1px solid ${theme.colors.inputsStrokeColor}`,
      width: '100%',
    },
    dropdownStyle: {
      color: theme.colors.baseTextColor,
      backgroundColor: theme.colors.dropDownBackgroundColor,
      boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.12)',
      borderRadius: '10px',
      padding: '0 10px 10px 10px',
    },
    searchStyle: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '160%',
      color: theme.colors.inputsStrokeColor,
      backgroundColor: theme.colors.dropDownBackgroundColor,
      border: 'none',
      boxSizing: 'border-box',
      borderRadius: '0',
      borderBottom: `1px solid ${theme.colors.inputsStrokeColor}`,
      margin: '0',
      marginBottom: '0px',
      paddingLeft: '40px',
      width: '90%',
      height: '35px',
    },
  } as const);
