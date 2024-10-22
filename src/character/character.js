import React, { useState } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./character.css";
import character from "../img/character.png";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#272727",
    },
  },
});

export default function CharacterPanel() {
  const [data, setRaiderIOData] = useState(null);
  const [blizzardData, setBlizzardData] = useState(null);

  function getRaiderIOData() {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://raider.io/api/v1/characters/profile?region=eu&realm=Silvermoon&name=Freedye&fields=gear%2Ctalents%2Cguild%2Craid_progression%2Cmythic_plus_scores_by_season%3Acurrent"
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        setRaiderIOData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }

  function getBlizzardData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "blizzard link");
    xhr.onload = function () {
      if (xhr.status === 200) {
        setBlizzardData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
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
        {getRaiderIOData()}

        {data ? (
          <div className="characterBox">
            <div className="characterPhoto">
              <img
                src={character}
                className="characterRender"
                alt="character"
              />
            </div>
            <div className="characterData">
              <p>{data.name}</p>
              <p>{data.gear.item_level_equipped}</p>
              <p>{data.raid_progression["nerubar-palace"].summary}</p>
              <p>{data.mythic_plus_scores_by_season[0].scores.all}</p>
            </div>
          </div>
        ) : (
          <p>loading</p>
        )}
      </Box>
    </ThemeProvider>
  );
}
