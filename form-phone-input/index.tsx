import { useState } from "react";
import classNames from "classnames";
import { useController, FieldValues } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useAppSelector } from "~hooks/use-redux";
import { selectTheme } from ".~store/theme-slice/selectors";
import { getPhoneInputStyles } from "./utils";
import { SEARCH_TEXT } from "./constants";
import { SIGNUP_METHOD } from "../../signup/signup-method/constants";
import { THEME_MODES } from "~styles/theme";
import { Props } from "./types";
import "react-phone-input-2/lib/high-res.css";
import styles from "./index.module.css";

export const FormPhoneInput = <F extends FieldValues>({
  controllerProps,
  ...inputProps
}: Props<F>) => {
  const [isFocused, setIsFocused] = useState(false);

  const { field, fieldState } = useController<F>(controllerProps);
  const theme = useAppSelector(selectTheme);

  const wrapperClass = classNames(
    styles.wrapper,
    {
      [styles.focused]: isFocused,
    },
    { [styles.invalid]: fieldState.error },
    { [styles.dark]: theme.mode === THEME_MODES.DARK }
  );

  const onFocus = () => setIsFocused(true);
  const onBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };

  return (
    <div className={wrapperClass}>
      <PhoneInput
        {...field}
        {...inputProps}
        {...getPhoneInputStyles(theme)}
        enableAreaCodes
        enableSearch
        searchPlaceholder={SEARCH_TEXT}
        disableSearchIcon
        countryCodeEditable={false}
        country={SIGNUP_METHOD.INPUT_PHONE_DEFAULT_COUNTRY}
        onFocus={onFocus}
        onBlur={onBlur}
        buttonClass={styles.button}
        dropdownClass={styles.dropdown}
        searchClass={styles.search}
      />
      <span className={styles.underline}></span>
      {fieldState.error && (
        <span className={styles.formError}>
          {fieldState.error && fieldState.error.message}
        </span>
      )}
    </div>
  );
};
