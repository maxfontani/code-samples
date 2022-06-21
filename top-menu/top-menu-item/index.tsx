import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAppSelector } from "~hooks/use-redux";
import { selectTheme } from "~store/theme-slice/selectors";
import { THEME_MODES } from "~styles/theme";
import { Props } from "./types";
import styles from "./top-menu-item.module.css";

export const TopMenuItem = ({
  title,
  path,
  activeItem,
  setActiveItem,
  selectItemHandler,
  stylesMenuItem,
}: Props) => {
  const theme = useAppSelector(selectTheme);
  const navigator = useNavigate();

  const isItemActive = activeItem === title;

  const menuItemClass = classNames(
    styles.menuItem,
    { [styles.menuItemDark]: theme.mode === THEME_MODES.DARK },
    { [styles.menuItemLight]: theme.mode === THEME_MODES.LIGHT },
    { [styles.menuItemActive]: isItemActive },
    stylesMenuItem
  );

  const onClick = () => {
    setActiveItem(title);
    navigator(path);
    selectItemHandler && selectItemHandler(title);
  };

  return (
    <div className={styles.wrapper}>
      <button className={menuItemClass} onClick={onClick}>
        {title}
      </button>
      {isItemActive && <div className={styles.underline} />}
    </div>
  );
};
