import { SideMenuItem } from "./side-menu-item/";
import {
  AdminPanel,
  Dashboard,
  Explore,
  Favorites,
  Playlists,
  Tracklist,
} from "./Icons";
import { MENU_ITEMS } from "./constants";
import { SideMenuItemType } from "./types";

export const getMenuItemIcon = (
  itemType: SideMenuItemType,
  iconColor: string
) => {
  switch (itemType) {
    case MENU_ITEMS.EXPLORE.TYPE: {
      return <Explore iconColor={iconColor} />;
    }
    case MENU_ITEMS.PLAYLISTS.TYPE: {
      return <Playlists iconColor={iconColor} />;
    }
    case MENU_ITEMS.DASHBOARD.TYPE: {
      return <Dashboard iconColor={iconColor} />;
    }
    case MENU_ITEMS.FAVORITES.TYPE: {
      return <Favorites iconColor={iconColor} />;
    }
    case MENU_ITEMS.TRACKLIST.TYPE: {
      return <Tracklist iconColor={iconColor} />;
    }
    case MENU_ITEMS.ADMIN_PANEL.TYPE: {
      return <AdminPanel iconColor={iconColor} />;
    }
    default: {
      return <Explore iconColor={iconColor} />;
    }
  }
};

export const getSideMenuItem = (itemType: SideMenuItemType) => {
  const menuItem = () => <SideMenuItem itemType={itemType} />;
  menuItem.displayName = itemType + "MenuItem";

  return menuItem;
};

export const getSideMenuItemFromPath = (path: string) => {
  const item = Object.values(MENU_ITEMS).filter(
    (value) => value.PATH === path
  )[0];

  return item?.TYPE;
};
