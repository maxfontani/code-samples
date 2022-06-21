import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRelativePath } from "~hooks/use-relative-path/";
import { SideMenuContext } from "~omponents/side-menu/context/";
import { getSideMenuItem, getSideMenuItemFromPath } from "./utils";
import { SIDE_MENU, MENU_ITEMS } from "./constants";
import { Props, SideMenuItemType } from "./types";
import styles from "./index.module.scss";

export const SideMenu = ({ children }: Props) => {
  const { DEFAULT_MENU_ITEM } = SIDE_MENU;
  const relativePath = useRelativePath();
  const menuItemFromPath = getSideMenuItemFromPath(relativePath);

  const [activeMenuItem, setActiveMenuItem] = useState<SideMenuItemType>(
    menuItemFromPath || DEFAULT_MENU_ITEM
  );
  const navigator = useNavigate();

  return (
    <SideMenuContext.Provider
      value={{
        activeMenuItem,
        onClickHandler: (newActiveItem) => {
          setActiveMenuItem(newActiveItem);
          navigator(MENU_ITEMS[newActiveItem].PATH);
        },
      }}
    >
      <div className={styles.wrapper}>{children}</div>
    </SideMenuContext.Provider>
  );
};

SideMenu.Explore = getSideMenuItem(MENU_ITEMS.EXPLORE.TYPE);
SideMenu.Favorites = getSideMenuItem(MENU_ITEMS.FAVORITES.TYPE);
SideMenu.Playlists = getSideMenuItem(MENU_ITEMS.PLAYLISTS.TYPE);
SideMenu.Dashboard = getSideMenuItem(MENU_ITEMS.DASHBOARD.TYPE);
SideMenu.Tracklist = getSideMenuItem(MENU_ITEMS.TRACKLIST.TYPE);
SideMenu.AdminPanel = getSideMenuItem(MENU_ITEMS.ADMIN_PANEL.TYPE);
