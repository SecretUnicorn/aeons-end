import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Themes } from './types';

const sharedTheme = {
  palette: {
    primary: {
      main: '#406a86',
    },
    secondary: {
      main: '#fac6a0',
    },
  },
  typography: {
    fontFamily: [
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: 14,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          fontSize: 14,
        },
        option: {
          fontSize: 14,
        },
        inputRoot: {
          fontSize: 14,
        },
        root: {
          fontSize: 14,
        },
        fontSize: 14,
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        labelPlacementStart: {
          marginLeft: '2px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 14,
          backgroundColor: 'rgba(64, 106, 134, 0.95)',
          boxShadow: '2px 2px 5px rgba(0,0,0,0.7)',
          border: '1px solid rgba(255,255,255,0.2)',
        },
        arrow: {
          color: 'rgba(64, 106, 134, 0.95)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        textTransform: 'none',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&$error': {
            background: 'rgba(255,0,0,0.01)',
          },
        },
        multiline: {
          borderRadius: '0px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingRight: '0px',
          '& button': {
            marginLeft: '0.5em',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        footer: {
          minHeight: '35px !important',
        },
        root: {
          borderRadius: 0,
        },
        colCellWrapper: {
          backgroundColor: '#406a86',
          color: 'white',
          padding: 0,
        },
        row: {
          '&:nth-child(2n+1)': {
            backgroundColor: '#e8e8e8',
          },
          '&:nth-child(2n)': {
            backgroundColor: '#f5f5f5',
          },
        },
        cellRight: {
          textAlign: 'left !important',
        },
        colCellRight: {
          textAlign: 'left',
          '& .MuiDataGrid-colCell-draggable': {
            direction: 'rtl',
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        actions: {
          '& .MuiIconButton-root': {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
        toolbar: {
          minHeight: '35px !important',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderSpacing: 'none',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          maxHeight: '35px !important',
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
} as ThemeOptions; // the reason for this casting is deepmerge return type
// TODO (Suren): replace mui-utils-deepmerge with lodash or ramda deepmerge

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
    },
  }),

  dark: deepmerge(sharedTheme, {
    palette: {
      mode: 'dark',
      background: {
        default: '#111',
        paper: '#171717',
      },
      primary: {
        main: '#333',
      },
    },
  }),
};

export default themes;
