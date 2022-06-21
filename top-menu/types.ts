import React from 'react';
import { SvgProps } from '../../Pages/Landing/Icons/type';
import { TopMenuItems } from '../AdminPanel/types';

export type Props = {
  menuItems: TopMenuItems;
  selectItemHandler?: (menuItem: string) => void;
  defaultItemIndex?: number;
  stylesMenu?: string;
  stylesMenuItem?: string;
};

export type TopMenuItemIconProps = {
  svgProps: SvgProps;
};

export type TopMenuConstants = {
  BUTTON_TYPE: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};
