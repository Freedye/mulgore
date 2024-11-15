import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Character.css";
import Character from "../img/character.png";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#272727",
    },
  },
});

const CharacterPanel = ({ data }) => {

  if(data.length === 0) {
    return <ThemeProvider theme={darkTheme}></ThemeProvider>
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        className="characterBody"
        sx={{
          width: 1000,
          height: 500,
          borderRadius: 1,
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
      <div className="characterBox">
        <div className="characterPhoto">
          <b>{data.name}</b>
          <img
            src={Character}
            className="characterRender"
            alt="character"
          />
        </div>
        <div className="characterData">
          <p><b>Item level:</b> {data.gear.item_level_equipped}</p>
          <p><b>Raid progress:</b> {data.raid_progression['nerubar-palace'].summary}</p>
          <p><b>Mythic+ score:</b> {data.mythic_plus_scores_by_season[0].scores.all}</p>
          <p><b><a href={"https://www.wowhead.com/talent-calc/blizzard/" + data.talentLoadout.loadout_text} target="_blank" rel="noreferrer">Current talents</a></b></p>
          <p>Loading most popular talents...</p>
        </div>
      </div>
      </Box>
    </ThemeProvider>
  );
}

export default CharacterPanel;