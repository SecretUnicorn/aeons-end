import { FullSizeCenteredFlexBox } from "@/components/styled";

import { Typography } from "@mui/material";

function Welcome() {
  return (
    <>
      <FullSizeCenteredFlexBox>
        <Typography>
          Hello World {`${import.meta.env.VITE_API_BASE}`}
        </Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Welcome;
