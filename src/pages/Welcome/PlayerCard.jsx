import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const PlayerCard = ({ player, onChange, onAdd }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(player?.name ?? "");

  return (
    <Grid
      container
      item
      xs={6}
      sx={{
        minHeight: "22.5vh",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          border: "3px solid",
          borderRadius: "10px",
          borderColor: "primary.main",
          py: 1,
          px: 2,
          ":hover, :active":
            player !== null
              ? {}
              : {
                  cursor: "pointer",
                  bgcolor: "primary.light",
                },
        }}
      >
        {player !== null ? (
          <Grid
            container
            item
            xs={12}
            sx={{
              height: "100%",
            }}
          >
            {editMode ? (
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  fontSize: "h5.fontSize",
                  color: "primary.dark",
                }}
              >
                <TextField
                  value={name}
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                />{" "}
                <IconButton
                  onClick={() => {
                    setEditMode(false);
                    onChange("name", name);
                  }}
                  sx={{
                    ml: 1,
                  }}
                >
                  <SaveIcon />
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  fontSize: "h5.fontSize",
                  color: "primary.dark",
                }}
                onClick={() => setEditMode(true)}
              >
                {player.name} <EditIcon />
              </Box>
            )}
            <Grid container item xs={12}>
              <Grid
                container
                item
                xs={6}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item>
                  <IconButton
                    onClick={() =>
                      onChange((p) => ({
                        ...p,
                        energy: Math.max(p.energy - 1, 0),
                      }))
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <WaterDropIcon
                      sx={{
                        fontSize: "75px",
                        color: "blue",
                      }}
                    ></WaterDropIcon>
                    <Box
                      sx={{
                        fontSize: "h6.fontSize",
                        color: "white",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform:
                          "translate(calc(-50% - 0.5px), calc(-50% - 3.5px))",
                      }}
                    >
                      {player.energy}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => {
                      onChange((p) => ({
                        ...p,
                        energy: Math.min(p.energy + 1, 10),
                      }));
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={6}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item>
                  <IconButton
                    onClick={() =>
                      onChange((p) => ({
                        ...p,
                        health: Math.max(p.health - 1, 0),
                      }))
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <FavoriteIcon
                      sx={{
                        fontSize: "75px",
                        color: "red",
                      }}
                    ></FavoriteIcon>
                    <Box
                      sx={{
                        fontSize: "h6.fontSize",
                        color: "white",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform:
                          "translate(calc(-50% - 0.5px), calc(-50% - 3.5px))",
                      }}
                    >
                      {player.health}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => {
                      onChange((p) => ({
                        ...p,
                        health: Math.min(p.health + 1, 10),
                      }));
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              height: "100%",
            }}
            onClick={onAdd}
          >
            <IconButton>
              <AddCircleIcon
                sx={{
                  fontSize: "50px",
                }}
              />
            </IconButton>
          </Grid>
        )}
      </Box>
    </Grid>
  );
};

export default PlayerCard;
