import { SideMenuConstants, MenuItems } from './types';

export const SIDE_MENU: SideMenuConstants = {
  DEFAULT_MENU_ITEM: 'EXPLORE',
  DEFAULT_CONTEXT: {
    activeMenuItem: 'EXPLORE',
    onClickHandler: null,
  },
  BUTTON_TYPE: 'button',
};

export const MENU_ITEMS: MenuItems = {
  EXPLORE: {
    TYPE: 'EXPLORE',
    TITLE: 'Explore',
    PATH: 'explore',
  },
  TRACKLIST: {
    TYPE: 'TRACKLIST',
    TITLE: 'My tracklist',
    PATH: 'tracklist',
  },
  FAVORITES: {
    TYPE: 'FAVORITES',
    TITLE: 'Favorites',
    PATH: 'favorites',
  },
  PLAYLISTS: {
    TYPE: 'PLAYLISTS',
    TITLE: 'Playlists',
    PATH: 'playlists',
  },
  DASHBOARD: {
    TYPE: 'DASHBOARD',
    TITLE: 'Dashboard',
    PATH: 'dashboard',
  },
  ADMIN_PANEL: {
    TYPE: 'ADMIN_PANEL',
    TITLE: 'Admin panel',
    PATH: 'admin_panel',
  },
};
