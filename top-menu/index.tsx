import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useRelativePath } from "~hooks/use-relative-path/";
import { TopMenuItem } from "./top-menu-item/";
import { getMenuItemPaths } from "../admin-panel/utils";
import { Props } from "./types";
import styles from "./top-menu.module.css";

export const TopMenu = ({
  menuItems,
  selectItemHandler,
  stylesMenu,
  stylesMenuItem,
  defaultItemIndex = 0,
}: Props) => {
  const [activeItem, setActiveItem] = useState<string>(
    menuItems[defaultItemIndex]
  );
  const relativePath = useRelativePath();
  const navigator = useNavigate();
  const paths = getMenuItemPaths(menuItems);

  const menuClass = classNames(styles.wrapper, stylesMenu);

  useEffect(() => {
    const menuItemIndex = paths.indexOf(relativePath);

    if (~menuItemIndex) {
      setActiveItem(menuItems[menuItemIndex]);
    } else {
      navigator(paths[defaultItemIndex]);
    }
  }, []);

  return (
    <div className={menuClass}>
      {menuItems.map((title, index) => (
        <TopMenuItem
          key={title}
          title={title}
          path={paths[index]}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          selectItemHandler={selectItemHandler}
          stylesMenuItem={stylesMenuItem}
        />
      ))}
    </div>
  );
};
