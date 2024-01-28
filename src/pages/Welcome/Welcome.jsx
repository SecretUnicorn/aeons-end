import { Meta } from "@/components";
import { FullSizeCenteredFlexBox } from "@/components/styled";
import { playersAtom } from "@/store/order";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

import { Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import PlayerCard from "./PlayerCard";

function Welcome() {
  const [players, setPlayer] = useRecoilState(playersAtom);

  return (
    <>
      <Meta title={"Welcome"} />
      <Grid container>
        {players.map((player, idx) => (
          <PlayerCard
            key={`player-${idx}`}
            player={player}
            onChange={(key_or_fn, value) => {
              if (typeof value !== "undefined") {
                setPlayer((np) => [
                  ...np.slice(0, idx),
                  {
                    ...player,
                    [key_or_fn]: value,
                  },
                  ...np.slice(idx + 1),
                ]);
              } else {
                setPlayer((np) => [
                  ...np.slice(0, idx),
                  {
                    ...player,
                    ...key_or_fn(player),
                  },
                  ...np.slice(idx + 1),
                ]);
              }
            }}
          />
        ))}
        {Array(4 - players.length)
          .fill(0)
          .map((_, i) => (
            <PlayerCard
              key={`player-missing-${i}`}
              player={null}
              onAdd={() => {
                setPlayer((np) => [
                  ...np,
                  {
                    name: `Player ${np.length + 1}`,
                    health: 10,
                    energy: 0,
                  },
                ]);
              }}
            />
          ))}
        <Grid item xs={12}>
          <Box>Test</Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Welcome;
