import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Character.css";
import Character from "../img/character.png";
import Loader from "../loader/Loader";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#272727",
    },
  },
});

export default function CharacterPanel() {
  const [showLoader, setShowLoader] = useState(true);
  const [name, setName] = useState(null);
  const [itemLevel, setItemLevel] = useState(null);
  const [raidProgress, setRaidProgress] = useState(null);
  const [mythicPlusScore, setMythicPlusScore] = useState(null);

  useEffect(() => {
    const fetchRioData = async () => {
      const response = await fetch(
        "https://raider.io/api/v1/characters/profile?region=eu&realm=Silvermoon&name=Freedye&fields=gear%2Ctalents%2Cguild%2Craid_progression%2Cmythic_plus_scores_by_season%3Acurrent"
      );
      const data = await response.json();
      setName(data.name)
      setItemLevel(data.gear.item_level_equipped);
      setRaidProgress(data.raid_progression["nerubar-palace"].summary);
      setMythicPlusScore(data.mythic_plus_scores_by_season[0].scores.all);
      setShowLoader(false);
    };
    fetchRioData();
  }, []);

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
        {!showLoader ? (
          <div className="characterBox">
            <div className="characterPhoto">
              <img
                src={Character}
                className="characterRender"
                alt="character"
              />
            </div>
            <div className="characterData">
              <p>{name}</p>
              <p>{itemLevel}</p>
              <p>{raidProgress}</p>
              <p>{mythicPlusScore}</p>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Box>
    </ThemeProvider>
  );
}
