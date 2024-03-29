import { deepmerge } from "@mui/utils";

const sharedTheme = {
  palette: {
    primary: {
      main: "#406a86",
      light: "#a3d7df",
    },
    secondary: {
      main: "#fac6a0",
    },
    disabled: {
      main: "#adadad",
    },
    greyIcon: {
      light: "#696969",
      main: "#575757",
      dark: "#3d3d3d",
    },
  },
  typography: {
    fontFamily: [
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    body1: {
      fontSize: 14,
    },
    button: {
      textTransform: "none",
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
          marginLeft: "2px",
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
          backgroundColor: "rgba(64, 106, 134, 0.95)",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.2)",
        },
        arrow: {
          color: "rgba(64, 106, 134, 0.95)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        textTransform: "none",
      },
      variants: [
        {
          props: { variant: "mwl" },
          style: {
            textTransform: "none",
            color: "white",
            backgroundColor: "hsl(0, 0%, 18%)",
            justifyContent: "flex-start",
            fontWeight: "normal",
            borderRadius: "0.4em",
            marginBottom: "4px",
            lineHeight: 1.3,
            "&:hover": {
              color: "white",
              backgroundColor: "#484848",
            },
            "&:disabled": {
              backgroundColor: "lightgray",
              color: "black",
            },
            "& .MuiButton-startIcon": {
              width: "0.875em",
              marginRight: "1em",
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&$error": {
            background: "rgba(255,0,0,0.01)",
          },
        },
        multiline: {
          borderRadius: "0px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingRight: "0px",
          "& button": {
            marginLeft: "0.5em",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#575757",
        },
        h6: {
          fontWeight: "bold",
          marginTop: "1em",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        footer: {
          minHeight: "35px !important",
        },
        root: {
          borderRadius: 0,
        },
        colCellWrapper: {
          backgroundColor: "#406a86",
          color: "white",
          padding: 0,
        },
        row: {
          "&:nth-of-type(2n+1)": {
            backgroundColor: "#e8e8e8",
          },
          "&:nth-of-type(2n)": {
            backgroundColor: "#f5f5f5",
          },
        },
        cellRight: {
          textAlign: "left !important",
        },
        colCellRight: {
          textAlign: "left",
          "& .MuiDataGrid-colCell-draggable": {
            direction: "rtl",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        actions: {
          "& .MuiIconButton-root": {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
        toolbar: {
          minHeight: "35px !important",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderSpacing: "none",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          maxHeight: "35px !important",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
};

const themes = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: "light",
    },
  }),

  dark: deepmerge(sharedTheme, {
    palette: {
      mode: "dark",
      background: {
        default: "#111",
        paper: "#171717",
      },
      primary: {
        main: "#333",
      },
    },
  }),
};

export default themes;
