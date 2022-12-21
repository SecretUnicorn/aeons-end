import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  NotFound,
  HomePage,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC<React.PropsWithChildren<unknown>>;
  icon?: FC<React.PropsWithChildren<SvgIconProps>>;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
