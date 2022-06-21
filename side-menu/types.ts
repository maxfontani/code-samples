import React from "react";
import { SvgProps } from "~assets/images/types";
import { SideMenuContextValue } from "./context/types";

export type Props = {
  children: React.ReactNode;
};

export type SideMenuConstants = {
  DEFAULT_MENU_ITEM: SideMenuItemType;
  DEFAULT_CONTEXT: SideMenuContextValue;
  BUTTON_TYPE: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export type MenuItems = {
  [K in SideMenuItemType]: { TYPE: K; TITLE: string; PATH: string };
};

export type SideMenuItemType =
  | "EXPLORE"
  | "TRACKLIST"
  | "FAVORITES"
  | "PLAYLISTS"
  | "DASHBOARD"
  | "ADMIN_PANEL";

export type SideMenuItemIconProps = {
  iconColor: string;
  svgProps?: SvgProps;
};
