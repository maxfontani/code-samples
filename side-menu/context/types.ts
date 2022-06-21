import React from 'react';
import { SideMenuItemType } from '../types';

export type Props = {
  children: React.ReactNode;
  value: SideMenuContextValue;
};

export type SideMenuContextValue = {
  activeMenuItem: SideMenuItemType;
  onClickHandler: ((newActiveItem: SideMenuItemType) => void) | null;
};
