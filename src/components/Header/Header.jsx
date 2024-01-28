import reactLogo from "@/assets/react.svg";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";

function Header() {
  return (
    <Grid
      container
      alignItems={"center"}
      sx={{
        width: "100vw",
        minHeight: "50px",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        p: 2,
      }}
    >
      <Grid xs="auto" item container direction={"column"}>
        <Box
          sx={{
            fontSize: "h5.fontSize",
          }}
        >
          Aeons End Helper
        </Box>
        <Box sx={{}}>by Nicklas - v24-1.0</Box>
      </Grid>
      <Grid container item xs>
        &nbsp;
      </Grid>
    </Grid>
  );
}

export default Header;
