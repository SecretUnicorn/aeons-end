import { Button, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const pxToRem = (px, oneRemPx = 17) => `${px / oneRemPx}rem`;

const FlexBox = styled(Box)({
  display: "flex",
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: "center",
  alignItems: "center",
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: "100%",
  height: "100%",
});

const BetterSwitch = styled(Switch)(({ theme }) => {
  const borderWidth = 2;
  const baseWidth = 56;
  const baseHeight = 30;
  const baseSize = 18;
  const width = pxToRem(baseWidth);
  const height = pxToRem(baseHeight);
  const size = pxToRem(baseSize);
  const gap = (baseHeight - baseSize) / 2;
  return {
    root: {
      width,
      height,
      padding: 0,
      overflow: "unset",
      marginRight: theme.spacing(1),
    },
    switchBase: {
      padding: pxToRem(gap),
      justifyContent: "unset",
      "&$checked": {
        color: "#fff",
        transform: `translateX(calc(${width} - ${size} - ${pxToRem(2 * gap)}))`,
        "& + $track": {
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
          border: "none",
        },
        "& $thumb": {
          backgroundColor: "#fff",
        },
      },
    },
    track: {
      borderRadius: 40,
      border: `solid ${theme.palette.grey[600]}`,
      borderWidth,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
      boxSizing: "border-box",
    },
    thumb: {
      boxShadow: "none",
      backgroundColor: theme.palette.grey[600],
      width: size,
      height: size,
    },
    checked: {},
  };
});

const ColorButton = styled(Button)({
  root: {
    color: "white",
    textTransform: "none",
    marginLeft: "0.5em",
    "&:disabled": {
      color: "#999999",
    },
    borderColor: "rgb(60,60,60)",
    "&:hover": {
      borderColor: "rgb(60,60,60)",
    },
  },
});

export {
  FlexBox,
  CenteredFlexBox,
  FullSizeCenteredFlexBox,
  BetterSwitch,
  ColorButton,
};
