import type { SnackbarProps } from 'notistack';

type Notifications = {
  options: SnackbarProps;
  maxSnack: number;
};

type EditorText = {
  data: string;
  label: string;
  description: string;
};
export type { Notifications, EditorText };
